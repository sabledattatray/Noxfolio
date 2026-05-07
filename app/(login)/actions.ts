'use server';

import { z } from 'zod';
import { and, eq, sql } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import {
  User,
  users,
  organizations,
  organizationMembers,
  activityLogs,
  type NewUser,
  type NewOrganization,
  type NewOrganizationMember,
  type NewActivityLog,
  ActivityType,
  invitations
} from '@/lib/db/schema';
import { comparePasswords, hashPassword, setSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createCheckoutSession } from '@/lib/stripe/stripe';
import { getUser, getUserWithOrganization } from '@/lib/db/queries';
import {
  validatedAction,
  validatedActionWithUser
} from '@/lib/auth/middleware';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleSignInAction(credential: string, redirectPath?: string) {
  console.log('DEBUG: googleSignInAction triggered');
  console.log('DEBUG: DB URL:', process.env.POSTGRES_URL?.split('@').pop()); // Log only host/db part for safety
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return { error: 'Invalid Google token' };
    }

    const { email, name, picture } = payload;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    
    let user = existingUser[0];

    if (!user) {
      const passwordHash = await hashPassword(crypto.randomBytes(32).toString('hex'));
      const newUser: NewUser = {
        email,
        name: name || '',
        image: picture || '',
        passwordHash,
        role: 'user',
        emailVerifiedAt: new Date()
      };
      
      const [createdUser] = await db.insert(users).values(newUser).returning();
      user = createdUser;

      const newOrganization: NewOrganization = {
        name: `${name || email}'s Organization`
      };

      const [createdOrganization] = await db.insert(organizations).values(newOrganization).returning();

      const newOrganizationMember: NewOrganizationMember = {
        userId: user.id,
        organizationId: createdOrganization.id,
        role: 'owner'
      };

      await Promise.all([
        db.insert(organizationMembers).values(newOrganizationMember),
        logActivity(createdOrganization.id, user.id, ActivityType.SIGN_UP),
      ]);
    } else {
      const userWithOrg = await getUserWithOrganization(user.id);
      await logActivity(userWithOrg?.organizationId, user.id, ActivityType.SIGN_IN);
    }

    await setSession(user);
    return { success: true };
  } catch (error: any) {
    console.error('CRITICAL GOOGLE AUTH ERROR:', error);
    return { error: `Authentication failed: ${error.message || 'Unknown server error'}` };
  }
}

async function logActivity(
  organizationId: number | null | undefined,
  userId: number,
  type: ActivityType,
  ipAddress?: string
) {
  if (organizationId === null || organizationId === undefined) {
    return;
  }
  try {
    const newActivity: NewActivityLog = {
      organizationId,
      userId,
      action: type,
      ipAddress: ipAddress || ''
    };
    await db.insert(activityLogs).values(newActivity);
  } catch (error) {
    console.error('Failed to log activity:', error);
    // Don't throw here to avoid breaking the main flow
  }
}

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100)
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;

  const userWithOrganization = await db
    .select({
      user: users,
      organization: organizations
    })
    .from(users)
    .leftJoin(organizationMembers, eq(users.id, organizationMembers.userId))
    .leftJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
    .where(eq(users.email, email))
    .limit(1);

  if (userWithOrganization.length === 0) {
    return {
      error: 'Invalid email or password. Please try again.',
      email,
      password
    };
  }

  const { user: foundUser, organization: foundOrganization } = userWithOrganization[0];

  const isPasswordValid = await comparePasswords(
    password,
    foundUser.passwordHash
  );

  if (!isPasswordValid) {
    return {
      error: 'Invalid email or password. Please try again.',
      email,
      password
    };
  }

  await Promise.all([
    setSession(foundUser),
    logActivity(foundOrganization?.id, foundUser.id, ActivityType.SIGN_IN)
  ]);

  const redirectTo = formData.get('redirect') as string | null;
  if (redirectTo === 'checkout') {
    const priceId = formData.get('priceId') as string;
    return createCheckoutSession({ organization: foundOrganization, priceId });
  }

  redirect('/dashboard');
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  inviteId: z.string().optional()
});

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
  try {
    const { email, password, inviteId } = data;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return {
        error: 'Failed to create user. Please try again.',
        email,
        password
      };
    }

    const passwordHash = await hashPassword(password);

    const newUser: NewUser = {
      email,
      passwordHash,
      role: 'user'
    };

    const [createdUser] = await db.insert(users).values(newUser).returning();

    if (!createdUser) {
      return {
        error: 'Failed to create user. Please try again.',
        email,
        password
      };
    }

    let organizationId: number;
    let userRole: string;
    let createdOrganization: typeof organizations.$inferSelect | null = null;

    if (inviteId) {
      const [invitation] = await db
        .select()
        .from(invitations)
        .where(
          and(
            eq(invitations.id, parseInt(inviteId)),
            eq(invitations.email, email),
            eq(invitations.status, 'pending')
          )
        )
        .limit(1);

      if (invitation) {
        organizationId = invitation.organizationId;
        userRole = invitation.role;

        await db
          .update(invitations)
          .set({ status: 'accepted' })
          .where(eq(invitations.id, invitation.id));

        await logActivity(organizationId, createdUser.id, ActivityType.ACCEPT_INVITATION);

        [createdOrganization] = await db
          .select()
          .from(organizations)
          .where(eq(organizations.id, organizationId))
          .limit(1);
      } else {
        return { error: 'Invalid or expired invitation.', email, password };
      }
    } else {
      const newOrganization: NewOrganization = {
        name: `${email}'s Organization`
      };

      [createdOrganization] = await db.insert(organizations).values(newOrganization).returning();

      if (!createdOrganization) {
        return {
          error: 'Failed to create organization. Please try again.',
          email,
          password
        };
      }

      organizationId = createdOrganization.id;
      userRole = 'owner';

      await logActivity(organizationId, createdUser.id, ActivityType.CREATE_ORGANIZATION);
    }

    const newOrganizationMember: NewOrganizationMember = {
      userId: createdUser.id,
      organizationId: organizationId,
      role: userRole
    };

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await Promise.all([
      db.insert(organizationMembers).values(newOrganizationMember),
      logActivity(organizationId, createdUser.id, ActivityType.SIGN_UP),
      db.update(users).set({ otp, otpExpiresAt }).where(eq(users.id, createdUser.id)),
      setSession(createdUser)
    ]);

    console.log(`DEBUG: OTP for ${email}: ${otp}`);

    return { success: true, requiresOTP: true, email };
  } catch (error: any) {
    return { error: error.message };
  }
});

const verifyOTPSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6)
});

export const verifyOTP = validatedAction(verifyOTPSchema, async (data) => {
  const { email, otp } = data;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user || user.otp !== otp || (user.otpExpiresAt && user.otpExpiresAt < new Date())) {
    return { error: 'Invalid or expired OTP.' };
  }

  await db
    .update(users)
    .set({ 
      emailVerifiedAt: new Date(),
      otp: null,
      otpExpiresAt: null
    })
    .where(eq(users.id, user.id));

  return { success: true };
});

export async function signOut() {
  try {
    const user = await getUser();
    if (user) {
      const userWithOrganization = await getUserWithOrganization(user.id);
      await logActivity(userWithOrganization?.organizationId, user.id, ActivityType.SIGN_OUT);
    }
  } catch (error) {
    console.error('Error during sign out logging:', error);
  } finally {
    (await cookies()).delete('session');
    redirect('/sign-in');
  }
}

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(8).max(100),
  newPassword: z.string().min(8).max(100),
  confirmPassword: z.string().min(8).max(100)
});

export const updatePassword = validatedActionWithUser(
  updatePasswordSchema,
  async (data, _, user) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    const isPasswordValid = await comparePasswords(
      currentPassword,
      user.passwordHash
    );

    if (!isPasswordValid) {
      return {
        currentPassword,
        newPassword,
        confirmPassword,
        error: 'Current password is incorrect.'
      };
    }

    if (currentPassword === newPassword) {
      return {
        currentPassword,
        newPassword,
        confirmPassword,
        error: 'New password must be different from the current password.'
      };
    }

    if (confirmPassword !== newPassword) {
      return {
        currentPassword,
        newPassword,
        confirmPassword,
        error: 'New password and confirmation password do not match.'
      };
    }

    const newPasswordHash = await hashPassword(newPassword);
    const userWithOrganization = await getUserWithOrganization(user.id);

    await Promise.all([
      db
        .update(users)
        .set({ passwordHash: newPasswordHash })
        .where(eq(users.id, user.id)),
      logActivity(userWithOrganization?.organizationId, user.id, ActivityType.UPDATE_PASSWORD)
    ]);

    return {
      success: 'Password updated successfully.'
    };
  }
);

const deleteAccountSchema = z.object({
  password: z.string().min(8).max(100)
});

export const deleteAccount = validatedActionWithUser(
  deleteAccountSchema,
  async (data, _, user) => {
    const { password } = data;

    const isPasswordValid = await comparePasswords(password, user.passwordHash);
    if (!isPasswordValid) {
      return {
        password,
        error: 'Incorrect password. Account deletion failed.'
      };
    }

    const userWithOrganization = await getUserWithOrganization(user.id);

    await logActivity(
      userWithOrganization?.organizationId,
      user.id,
      ActivityType.DELETE_ACCOUNT
    );

    // Soft delete
    await db
      .update(users)
      .set({
        deletedAt: sql`CURRENT_TIMESTAMP`,
        email: sql`CONCAT(email, '-', id, '-deleted')` // Ensure email uniqueness
      })
      .where(eq(users.id, user.id));

    if (userWithOrganization?.organizationId) {
      await db
        .delete(organizationMembers)
        .where(
          and(
            eq(organizationMembers.userId, user.id),
            eq(organizationMembers.organizationId, userWithOrganization.organizationId)
          )
        );
    }

    (await cookies()).delete('session');
    redirect('/sign-in');
  }
);

const updateAccountSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  image: z.string().optional()
});

export const updateAccount = validatedActionWithUser(
  updateAccountSchema,
  async (data, _, user) => {
    const { name, email, image } = data;
    const userWithOrganization = await getUserWithOrganization(user.id);

    await Promise.all([
      db.update(users).set({ name, email, image }).where(eq(users.id, user.id)),
      logActivity(userWithOrganization?.organizationId, user.id, ActivityType.UPDATE_ACCOUNT)
    ]);

    return { name, success: 'Account updated successfully.' };
  }
);

const removeOrganizationMemberSchema = z.object({
  memberId: z.number()
});

export const removeOrganizationMember = validatedActionWithUser(
  removeOrganizationMemberSchema,
  async (data, _, user) => {
    const { memberId } = data;
    const userWithOrganization = await getUserWithOrganization(user.id);

    if (!userWithOrganization?.organizationId) {
      return { error: 'User is not part of an organization' };
    }

    await db
      .delete(organizationMembers)
      .where(
        and(
          eq(organizationMembers.id, memberId),
          eq(organizationMembers.organizationId, userWithOrganization.organizationId)
        )
      );

    await logActivity(
      userWithOrganization.organizationId,
      user.id,
      ActivityType.REMOVE_ORGANIZATION_MEMBER
    );

    return { success: 'Organization member removed successfully' };
  }
);

const inviteOrganizationMemberSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['member', 'owner'])
});

export const inviteOrganizationMember = validatedActionWithUser(
  inviteOrganizationMemberSchema,
  async (data, _, user) => {
    const { email, role } = data;
    const userWithOrganization = await getUserWithOrganization(user.id);

    if (!userWithOrganization?.organizationId) {
      return { error: 'User is not part of an organization' };
    }

    const existingMember = await db
      .select()
      .from(users)
      .leftJoin(organizationMembers, eq(users.id, organizationMembers.userId))
      .where(
        and(eq(users.email, email), eq(organizationMembers.organizationId, userWithOrganization.organizationId))
      )
      .limit(1);

    if (existingMember.length > 0) {
      return { error: 'User is already a member of this organization' };
    }

    // Check if there's an existing invitation
    const existingInvitation = await db
      .select()
      .from(invitations)
      .where(
        and(
          eq(invitations.email, email),
          eq(invitations.organizationId, userWithOrganization.organizationId),
          eq(invitations.status, 'pending')
        )
      )
      .limit(1);

    if (existingInvitation.length > 0) {
      return { error: 'An invitation has already been sent to this email' };
    }

    // Create a new invitation
    await db.insert(invitations).values({
      organizationId: userWithOrganization.organizationId,
      email,
      role,
      invitedBy: user.id,
      status: 'pending'
    });

    await logActivity(
      userWithOrganization.organizationId,
      user.id,
      ActivityType.INVITE_ORGANIZATION_MEMBER
    );

    // TODO: Send invitation email and include ?inviteId={id} to sign-up URL
    // await sendInvitationEmail(email, userWithOrganization.organization.name, role)

    return { success: 'Invitation sent successfully' };
  }
);

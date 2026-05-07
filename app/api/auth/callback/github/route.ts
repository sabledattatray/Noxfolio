import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import {
  users,
  organizations,
  organizationMembers,
  activityLogs,
  ActivityType,
  type NewUser,
  type NewOrganization,
  type NewOrganizationMember
} from '@/lib/db/schema';
import { hashPassword, setSession } from '@/lib/auth/session';
import { getUserWithOrganization } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/sign-in?error=NoCode', request.url));
  }

  try {
    // 1. Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return NextResponse.redirect(new URL('/sign-in?error=GitHubTokenFailed', request.url));
    }

    // 2. Fetch user details from GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const githubUser = await userResponse.json();

    // 3. Fetch user email from GitHub (sometimes email is private)
    let email = githubUser.email;
    if (!email) {
      const emailsResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const emails = await emailsResponse.json();
      const primaryEmail = emails.find((e: any) => e.primary && e.verified);
      if (primaryEmail) {
        email = primaryEmail.email;
      } else if (emails.length > 0) {
        email = emails[0].email;
      }
    }

    if (!email) {
      return NextResponse.redirect(new URL('/sign-in?error=NoEmailAccess', request.url));
    }

    const name = githubUser.name || githubUser.login;
    const picture = githubUser.avatar_url;

    // 4. Handle User in Database
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
        role: 'owner'
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

      await db.insert(organizationMembers).values(newOrganizationMember);
      
      try {
        await db.insert(activityLogs).values({
          organizationId: createdOrganization.id,
          userId: user.id,
          action: ActivityType.SIGN_UP,
          ipAddress: ''
        });
      } catch (e) {}
    } else {
      const userWithOrg = await getUserWithOrganization(user.id);
      if (userWithOrg?.organizationId) {
        try {
          await db.insert(activityLogs).values({
            organizationId: userWithOrg.organizationId,
            userId: user.id,
            action: ActivityType.SIGN_IN,
            ipAddress: ''
          });
        } catch (e) {}
      }
    }

    // 5. Generate Custom Session Cookie
    await setSession(user);

    // 6. Redirect to Dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('GitHub Auth Error:', error);
    return NextResponse.redirect(new URL('/sign-in?error=GitHubAuthError', request.url));
  }
}

'use server';

import { getOrganizationForUser } from '@/lib/db/queries';
import { db } from '@/lib/db/drizzle';
import { organizations } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function simulateUpgradeAction(formData: FormData) {
  const organization = await getOrganizationForUser();
  if (!organization) throw new Error('Not authenticated');

  const planId = formData.get('planId') as string;
  console.log(`[Billing] Upgrading organization ${organization.id} to plan: ${planId}`);

  if (!planId) throw new Error('Plan ID is required');

  await db
    .update(organizations)
    .set({
      planName: planId,
      subscriptionStatus: 'active',
      updatedAt: new Date(),
    })
    .where(eq(organizations.id, organization.id));

  console.log(`[Billing] Upgrade successful for organization ${organization.id}`);

  revalidatePath('/dashboard/billing');
  redirect('/dashboard/billing?success=plan_updated');
}

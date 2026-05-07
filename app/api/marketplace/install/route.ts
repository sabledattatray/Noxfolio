import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { organizations } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getOrganizationForUser } from '@/lib/db/queries';

export async function POST(req: Request) {
  try {
    const { appId, action } = await req.json();
    const organization = await getOrganizationForUser();

    if (!organization) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let installedApps = (organization.installedApps as string[]) || [];

    if (action === 'install') {
      if (!installedApps.includes(appId)) {
        installedApps.push(appId);
      }
    } else if (action === 'uninstall') {
      installedApps = installedApps.filter((id) => id !== appId);
    }

    await db.update(organizations)
      .set({ installedApps })
      .where(eq(organizations.id, organization.id));

    return NextResponse.json({ success: true, installedApps });
  } catch (error: any) {
    console.error('Marketplace Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

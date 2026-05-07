import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { organizations } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getOrganizationForUser } from '@/lib/db/queries';

export async function POST(req: Request) {
  try {
    const { branding } = await req.json();
    const organization = await getOrganizationForUser();

    if (!organization) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await db.update(organizations)
      .set({ branding })
      .where(eq(organizations.id, organization.id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Branding Update Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

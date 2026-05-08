import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { apiKeys, organizations } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key is required' }, { status: 400 });
    }

    // Find the API key and its organization
    const keyRecord = await db
      .select({
        organizationId: apiKeys.organizationId,
        environment: apiKeys.environment,
      })
      .from(apiKeys)
      .where(eq(apiKeys.key, apiKey))
      .limit(1);

    if (keyRecord.length === 0) {
      return NextResponse.json({ error: 'Invalid API Key' }, { status: 401 });
    }

    // Get organization details
    const org = await db
      .select({
        name: organizations.name,
        planName: organizations.planName,
        subscriptionStatus: organizations.subscriptionStatus,
      })
      .from(organizations)
      .where(eq(organizations.id, keyRecord[0].organizationId))
      .limit(1);

    if (org.length === 0) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Update last used timestamp
    await db
      .update(apiKeys)
      .set({ lastUsedAt: new Date() })
      .where(eq(apiKeys.key, apiKey));

    return NextResponse.json({
      valid: true,
      organization: org[0].name,
      plan: org[0].planName,
      status: org[0].subscriptionStatus,
      environment: keyRecord[0].environment
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { organizations } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Zapier API Key Verification Endpoint
 * Used by Zapier to validate a user's API Key during authentication.
 */
export async function GET(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Missing or invalid Authorization header' },
      { status: 401 },
    );
  }

  const apiKey = authHeader.split(' ')[1];

  // In this system, we'll assume the API key is the organization ID (for demo purposes)
  // or a specific test key. In production, this would check a dedicated api_keys table.
  try {
    const orgId = parseInt(apiKey);
    if (isNaN(orgId)) {
      // Allow a special "test" key for demo
      if (apiKey === 'nox_test_key_2026') {
        return NextResponse.json({
          status: 'success',
          organization: 'Noxfolio Demo Corp',
          environment: 'production',
        });
      }
      return NextResponse.json(
        { error: 'Invalid API Key format' },
        { status: 401 },
      );
    }

    const organization = await db.query.organizations.findFirst({
      where: eq(organizations.id, orgId),
    });

    if (!organization) {
      return NextResponse.json(
        { error: 'Organization not found or key invalid' },
        { status: 401 },
      );
    }

    return NextResponse.json({
      status: 'success',
      organization: organization.name,
      plan: organization.planName,
      verified: true,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}

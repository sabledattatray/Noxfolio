import { getUser, getOrganizationForUser } from '@/lib/db/queries';

export async function GET() {
  const user = await getUser();
  if (!user) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const organization = await getOrganizationForUser();
  return Response.json({ ...user, organization });
}

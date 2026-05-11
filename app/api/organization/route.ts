import {
  getOrganizationForUser,
  getOrganizationMembers,
} from '@/lib/db/queries';

export async function GET() {
  const organization = await getOrganizationForUser();
  if (!organization) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  const members = await getOrganizationMembers(organization.id);

  return Response.json({
    ...organization,
    organizationMembers: members,
  });
}

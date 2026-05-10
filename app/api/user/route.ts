import {
  getUser,
  getOrganizationForUser,
  getDashboardStats,
} from '@/lib/db/queries';

export async function GET() {
  const user = await getUser();
  if (!user) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const stats = await getDashboardStats();

  return Response.json({
    ...user,
    organization: stats?.organization,
    stats: {
      memberCount: stats?.memberCount || 1,
      recentActivities: stats?.recentActivities || [],
    },
  });
}

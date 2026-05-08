import { getUser } from '@/lib/db/queries';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { and, eq, isNull } from 'drizzle-orm';

export async function GET() {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie || !sessionCookie.value) {
    return Response.json({ status: 'no_cookie' });
  }

  let sessionData;
  try {
    sessionData = await verifyToken(sessionCookie.value);
  } catch (e: any) {
    return Response.json({ status: 'invalid_token', error: e.message });
  }

  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== 'number'
  ) {
    return Response.json({ status: 'malformed_token', data: sessionData });
  }

  if (new Date(sessionData.expires) < new Date()) {
    return Response.json({ status: 'expired_token' });
  }

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
    .limit(1);

  if (user.length === 0) {
    return Response.json({ status: 'user_not_found_in_db', userId: sessionData.user.id });
  }

  // Set a test cookie to see if the browser accepts it
  (await cookies()).set('test_cookie', 'works', { path: '/' });

  return Response.json({ status: 'success', user: user[0], testCookieSet: true });
}

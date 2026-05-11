import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/db/queries';

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch users' },
      { status: error.message === 'Unauthorized' ? 403 : 500 },
    );
  }
}

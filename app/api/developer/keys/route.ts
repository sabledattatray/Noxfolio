import { NextResponse } from 'next/server';
import { getApiKeys, createApiKey } from '@/lib/db/queries';

export async function GET() {
  try {
    const keys = await getApiKeys();
    return NextResponse.json(keys);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch API keys' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    const key = await createApiKey(name);
    return NextResponse.json({ key });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 });
  }
}

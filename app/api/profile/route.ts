// src/app/api/profile/route.ts
import { cookies } from 'next/headers';

export async function GET() {
  const token = cookies().get('access_token')?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch profile' }), { status: 401 });
  }

  return new Response(JSON.stringify(data));
}

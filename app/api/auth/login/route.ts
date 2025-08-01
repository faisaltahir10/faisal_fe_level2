// src/app/api/auth/login/route.ts
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Login failed' }), { status: 401 });
  }

  // Simpan token ke cookie
  cookies().set('access_token', data.access_token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return new Response(JSON.stringify({ success: true }));
}
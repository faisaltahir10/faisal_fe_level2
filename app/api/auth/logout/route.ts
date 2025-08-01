// src/app/api/auth/logout/route.ts
import { cookies } from 'next/headers';

export async function POST() {
  cookies().delete('access_token');
  return new Response(JSON.stringify({ success: true }));
}

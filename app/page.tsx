import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/dashboard/Sidebar';

export default async function HomePage() {
  const token = cookies().get('access_token')?.value;

  if (!token) {
    redirect('/signin');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  const profile = await res.json();

  return (
    <div className="flex min-h-screen">
       <Sidebar />
       {/* Main content */}
       <main className="flex-1 p-6 bg-gray-100">
         <h1 className="text-3xl font-bold mb-4">F - Dashboard</h1>
          <div className="text-black">
           <h1>Welcome, {profile.email}</h1>
         </div>
       </main>
     </div>
  );
}

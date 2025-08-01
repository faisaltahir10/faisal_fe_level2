import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import Footer from '@/components/dashboard/Footer';

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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6">
          <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome to F-Dashboard
          </h2>
          <p className="text-gray-600 mb-6">
            Glad to have you back, <span className="font-medium text-gray-800">john@mail.com</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded-xl p-5 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">📊 Overview</h3>
              <p className="text-sm text-gray-500">General status and insights.</p>
            </div>

            <div className="bg-white shadow rounded-xl p-5 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">👤 Profile</h3>
              <p className="text-sm text-gray-500">Update your user information.</p>
            </div>

            <div className="bg-white shadow rounded-xl p-5 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">📅 Activity</h3>
              <p className="text-sm text-gray-500">Check your recent activity log.</p>
            </div>
          </div>
        </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

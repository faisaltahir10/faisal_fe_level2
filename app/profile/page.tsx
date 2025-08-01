import Sidebar from '@/components/dashboard/Sidebar';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ProfilePage() {
  const token = cookies().get('access_token')?.value;

  if (!token) {
    return (
      <div className="p-6">
        <p className='text-white'>Anda belum login, silakan login terlebih dahulu: <a href="/signin" className="text-blue-600 underline">Login</a></p>
      </div>
    );
  }

  const res = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div className="p-6">
        <p>Gagal mengambil data profile. Silakan login ulang.</p>
      </div>
    );
  }

  const profile = await res.json();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>

        <div className="bg-white rounded-xl shadow p-6 max-w-xl">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-20 h-20 rounded-full border object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>
          <div className="text-sm">
            <p><span className="font-medium">Role:</span> {profile.role}</p>
            <p><span className="font-medium">User ID:</span> {profile.id}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

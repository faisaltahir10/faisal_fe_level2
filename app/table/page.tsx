import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/dashboard/Sidebar';

export default async function TablePage() {
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
  
  const res2 = await fetch('http://localhost:3000/api/table', { cache: 'no-store' }); // sesuaikan domain bila perlu
  const datax = await res2.json();
  
  return (
    <div className="min-h-screen flex">
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Data Tables</h1>

        <div className="bg-white p-6 rounded shadow overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Product Name</th>
                <th className="px-4 py-2 border">Product Brand</th>
                <th className="px-4 py-2 border">Product Owner</th>
              </tr>
            </thead>
            <tbody>
              {datax.map((dataproduct: any) => (
                <tr
                  key={dataproduct.product_id}
                  className="hover:bg-gray-50 border-t transition"
                >
                  <td className="px-4 py-2 border">{dataproduct.product_id}</td>
                  <td className="px-4 py-2 border">{dataproduct.product_name}</td>
                  <td className="px-4 py-2 border">{dataproduct.product_brand}</td>
                  <td className="px-4 py-2 border">{dataproduct.owner_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

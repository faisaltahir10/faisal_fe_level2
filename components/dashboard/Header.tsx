'use client';

import Image from 'next/image';
import { FaCalendarAlt } from 'react-icons/fa';

export default function Header() {
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="bg-slate-50 text-slate-900 shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">FE Level 2</h1>

      <div className="flex items-center gap-6">
        <div className="text-sm text-gray-700 flex items-center gap-2">
          <FaCalendarAlt className="text-gray-600" />
          <span>{today}</span>
        </div>

        <div className="flex items-center gap-3">
          <Image
            src="/face.jpeg"
            alt="User Avatar"
            width={36}
            height={36}
            className="rounded-full object-cover border border-gray-500"
          />
          <span className="text-sm font-medium text-gray-800">John</span>
        </div>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { FaUser, FaHome, FaTable, FaSignOutAlt } from 'react-icons/fa';

const menuItems = [
  { label: 'Home', href: '/', icon: <FaHome /> },
  { label: 'Profile', href: '/profile', icon: <FaUser /> },
  { label: 'Table', href: '/table', icon: <FaTable /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/signin';
  };

  return (
    <aside className="bg-[#0b1222] text-white w-56 h-screen p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">F-Dashboard</h1>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <div key={item.href}>
              {isActive ? (
                <div
                  className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-md cursor-not-allowed opacity-70"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-600 transition-all',
                    {
                      'bg-gray-800 text-white': isActive,
                      'text-white': !isActive,
                    }
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>
      <div className="space-y-4">
          {/* Logout button */}
            <button onClick={handleLogout}
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              <FaSignOutAlt />
              Logout
            </button>

          {/* User email */}
          {/* <div className="text-center text-sm text-gray-400">
            <div className="text-xs">Logged in as:</div>
            <div className="font-medium text-white">{session.email}</div>
          </div> */}
        </div>
    </aside>
  );
}

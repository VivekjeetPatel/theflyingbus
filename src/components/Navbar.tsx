'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-700">
          <img src="/images/bus-logo.svg" alt="Logo" className="w-8 h-8" />
          The Flying Bus
        </Link>
        <div className="flex items-center gap-4">
          {!user && (
            <>
              <Link href="/login" className="text-blue-700 hover:underline font-medium">Sign In</Link>
              <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">Sign Up</Link>
            </>
          )}
          {user && (
            <div className="relative">
              <button
                className="flex items-center gap-2 focus:outline-none"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <UserCircleIcon className="w-8 h-8 text-blue-700" />
                <span className="font-medium text-blue-700">{user.displayName || user.email}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <button
                    onClick={async () => { setDropdownOpen(false); await logout(); }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 
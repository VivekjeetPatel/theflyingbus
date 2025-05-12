'use client';

import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 gradient-text">Welcome to your Dashboard!</h1>
          {user ? (
            <>
              <p className="text-lg text-gray-700 mb-2">Hello, <span className="font-semibold">{user.displayName || user.email}</span>!</p>
              <p className="text-gray-500">You are now signed in.</p>
            </>
          ) : (
            <p className="text-gray-500">Loading user info...</p>
          )}
        </div>
      </main>
    </>
  );
} 
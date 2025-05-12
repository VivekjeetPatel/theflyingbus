import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'The Flying Bus',
  description: 'Your next generation transportation platform',
  keywords: ['kids journalism', 'crypto rewards', 'writing platform', 'education'],
  openGraph: {
    title: 'The Flying Bus - News by Kids, Rewards in Crypto',
    description: 'A kid-friendly news platform where young writers can earn crypto rewards for their contributions.',
    images: ['/images/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

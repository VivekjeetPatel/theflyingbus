'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email collection
    console.log('Email submitted:', email);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen hero-pattern">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent opacity-70"></div>
          <div className="container mx-auto px-4 py-16 relative">
            <div className="text-center animate-fade-in">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <Image
                  src="/images/bus-logo.svg"
                  alt="The Flying Bus Logo"
                  width={96}
                  height={96}
                  className="animate-float"
                />
              </div>
              <h1 className="text-6xl font-bold gradient-text mb-6">
                The Flying Bus
              </h1>
              <p className="text-2xl text-gray-600 mb-8">
                News by Kids, Rewards in Crypto
              </p>
              <div className="space-x-4">
                <Link 
                  href="/register"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Join Now
                </Link>
                <Link
                  href="/about"
                  className="glass-morphism text-blue-600 px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            Earn While You Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="✍️"
              title="Write Articles"
              description="Share your stories and earn TFB tokens"
              reward="5 TFB per article"
            />
            <FeatureCard
              icon="💬"
              title="Comment & Engage"
              description="Join discussions and earn rewards"
              reward="1 TFB per comment"
            />
            <FeatureCard
              icon="🎯"
              title="Join Events"
              description="Participate in writing challenges"
              reward="3 TFB per event"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <StatCard number="1000+" label="Young Writers" />
              <StatCard number="5000+" label="Articles Published" />
              <StatCard number="50000+" label="TFB Tokens Earned" />
              <StatCard number="100+" label="Writing Events" />
            </div>
          </div>
        </div>

        {/* Waitlist Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold gradient-text mb-8">Join Our Waitlist</h2>
            <p className="text-gray-600 mb-8">
              Be among the first to experience the future of kid journalism and earn crypto rewards!
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

function FeatureCard({ icon, title, description, reward }: {
  icon: string;
  title: string;
  description: string;
  reward: string;
}) {
  return (
    <div className="glass-morphism p-8 rounded-2xl card-hover">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-600 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full inline-block">
        {reward}
      </div>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="glass-morphism p-6 rounded-xl card-hover">
      <div className="text-3xl font-bold gradient-text mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
} 
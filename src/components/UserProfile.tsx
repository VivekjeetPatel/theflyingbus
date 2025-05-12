'use client';

import React, { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getTokenBalance } from '../lib/web3';
import ParentalConsent from './ParentalConsent';

interface UserData {
  id: string;
  email: string;
  name: string;
  role: 'kid' | 'moderator' | 'admin';
  parentalConsentStatus?: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  articlesPublished: number;
  commentsPosted: number;
  eventsJoined: number;
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user logged in');
      }

      // Load user data from Firestore
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        throw new Error('User data not found');
      }

      setUserData({
        id: user.uid,
        ...userDoc.data()
      } as UserData);

      // Load token balance
      const balance = await getTokenBalance(user.uid);
      setTokenBalance(balance);
    } catch (err) {
      console.error('Error loading user data:', err);
      setError('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="p-6 bg-red-50 text-red-700 rounded-lg">
        {error || 'Failed to load user profile'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-500 p-6 text-white">
          <h1 className="text-2xl font-bold">{userData.name}</h1>
          <p className="text-blue-100">{userData.email}</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-600">Role:</span>{' '}
                  <span className="capitalize">{userData.role}</span>
                </p>
                <p>
                  <span className="text-gray-600">Member since:</span>{' '}
                  {new Date(userData.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">TFB Balance</h2>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{tokenBalance} TFB</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Activity Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">{userData.articlesPublished}</p>
                <p className="text-gray-600">Articles Published</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">{userData.commentsPosted}</p>
                <p className="text-gray-600">Comments Posted</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">{userData.eventsJoined}</p>
                <p className="text-gray-600">Events Joined</p>
              </div>
            </div>
          </div>

          {userData.role === 'kid' && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Parental Consent</h2>
              {userData.parentalConsentStatus === 'approved' ? (
                <div className="bg-green-50 p-4 rounded-lg text-green-700">
                  Parental consent has been approved. You can use all features!
                </div>
              ) : userData.parentalConsentStatus === 'pending' ? (
                <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700">
                  Parental consent request is pending approval.
                </div>
              ) : (
                <ParentalConsent
                  userId={userData.id}
                  onConsentUpdate={(hasConsent) => {
                    setUserData({
                      ...userData,
                      parentalConsentStatus: hasConsent ? 'approved' : 'pending'
                    });
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
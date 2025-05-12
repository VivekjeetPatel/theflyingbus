'use client';

import React, { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface ParentalConsentProps {
  userId: string;
  onConsentUpdate: (hasConsent: boolean) => void;
}

export default function ParentalConsent({ userId, onConsentUpdate }: ParentalConsentProps) {
  const [parentEmail, setParentEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Update user document with parent email and pending consent status
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        parentEmail,
        parentalConsentStatus: 'pending',
        parentalConsentRequestedAt: new Date().toISOString()
      });

      // TODO: Implement email sending to parent
      // This would involve:
      // 1. Setting up email service (SendGrid/AWS SES)
      // 2. Creating email template with consent link
      // 3. Sending email with unique verification token

      alert('Consent request sent to parent email!');
      onConsentUpdate(false);
    } catch (err) {
      console.error('Error requesting parental consent:', err);
      setError('Failed to send consent request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Parental Consent Required</h2>
      <p className="text-gray-600 mb-6">
        To ensure your safety and comply with regulations, we need your parent's permission
        before you can use certain features like token redemption.
      </p>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700 mb-2">
            Parent's Email Address
          </label>
          <input
            type="email"
            id="parentEmail"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="parent@example.com"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-lg text-white ${
            isSubmitting
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? 'Sending Request...' : 'Request Parent Permission'}
        </button>
      </form>

      <div className="mt-6 text-sm text-gray-500">
        <p>What happens next?</p>
        <ul className="list-disc list-inside mt-2">
          <li>We'll send an email to your parent</li>
          <li>They'll review your account and activities</li>
          <li>Once approved, you can start redeeming rewards</li>
        </ul>
      </div>
    </div>
  );
} 
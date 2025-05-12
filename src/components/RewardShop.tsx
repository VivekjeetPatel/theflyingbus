'use client';

import React, { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { getTokenBalance } from '../lib/web3';

interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'gift_card' | 'donation' | 'fiat';
}

const REWARDS: Reward[] = [
  {
    id: 'amazon',
    name: 'Amazon Gift Card',
    description: '$10 Amazon Gift Card',
    cost: 100,
    type: 'gift_card'
  },
  {
    id: 'roblox',
    name: 'Roblox Gift Card',
    description: '$10 Roblox Gift Card',
    cost: 100,
    type: 'gift_card'
  },
  {
    id: 'unicef',
    name: 'UNICEF Donation',
    description: 'Donate to UNICEF',
    cost: 50,
    type: 'donation'
  },
  {
    id: 'fiat',
    name: 'Convert to USD',
    description: 'Convert TFB to USD (requires parent approval)',
    cost: 100,
    type: 'fiat'
  }
];

export default function RewardShop() {
  const [balance, setBalance] = useState<number>(0);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);

  // Load token balance
  useEffect(() => {
    const loadBalance = async () => {
      const user = auth.currentUser;
      if (user) {
        const balance = await getTokenBalance(user.uid);
        setBalance(balance);
      }
    };
    loadBalance();
  }, []);

  const handleRedeem = async (reward: Reward) => {
    setIsRedeeming(true);
    try {
      // TODO: Implement reward redemption logic
      // This would involve:
      // 1. Checking parental consent for fiat conversion
      // 2. Processing the reward through Tremendous API
      // 3. Updating token balance
      alert(`Redeeming ${reward.name}...`);
    } catch (error) {
      console.error('Error redeeming reward:', error);
      alert('Failed to redeem reward. Please try again.');
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Reward Shop</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-700">
            Your Balance: <span className="font-bold">{balance} TFB</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REWARDS.map((reward) => (
          <div
            key={reward.id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-2">{reward.name}</h3>
            <p className="text-gray-600 mb-4">{reward.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-blue-600 font-bold">{reward.cost} TFB</span>
              <button
                onClick={() => handleRedeem(reward)}
                disabled={isRedeeming || balance < reward.cost}
                className={`px-4 py-2 rounded-lg ${
                  balance >= reward.cost
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isRedeeming ? 'Processing...' : 'Redeem'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
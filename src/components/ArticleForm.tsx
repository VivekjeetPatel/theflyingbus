'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../lib/firebase';
import { distributeRewards, REWARD_AMOUNTS } from '../lib/web3';
import { auth } from '../lib/firebase';

export default function ArticleForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      // Save article to Firebase
      const articleRef = await db.collection('articles').add({
        title,
        content,
        authorId: user.uid,
        status: 'pending',
        createdAt: new Date(),
      });

      // Distribute rewards
      await distributeRewards(user.uid, REWARD_AMOUNTS.ARTICLE);

      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting article:', error);
      alert('Failed to submit article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Write an Article</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg h-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            You will earn {REWARD_AMOUNTS.ARTICLE} TFB tokens for submitting this article.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Article'}
        </button>
      </form>
    </div>
  );
} 
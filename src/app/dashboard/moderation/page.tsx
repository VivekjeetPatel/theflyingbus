'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function ModerationDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPendingArticles();
  }, []);

  const loadPendingArticles = async () => {
    try {
      const articlesRef = collection(db, 'articles');
      const q = query(articlesRef, where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);
      
      const articlesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Article[];

      setArticles(articlesData);
    } catch (err) {
      console.error('Error loading articles:', err);
      setError('Failed to load pending articles');
    } finally {
      setLoading(false);
    }
  };

  const handleModeration = async (articleId: string, decision: 'approved' | 'rejected') => {
    try {
      const articleRef = doc(db, 'articles', articleId);
      await updateDoc(articleRef, {
        status: decision,
        moderatedAt: new Date().toISOString()
      });

      // Update local state
      setArticles(articles.filter(article => article.id !== articleId));

      // TODO: If approved, trigger reward distribution
      if (decision === 'approved') {
        // Call reward distribution function
      }
    } catch (err) {
      console.error('Error moderating article:', err);
      alert('Failed to update article status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Moderation Dashboard</h1>
      
      {articles.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No pending articles to review</p>
        </div>
      ) : (
        <div className="space-y-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                  <p className="text-sm text-gray-500">
                    By {article.authorName} • {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleModeration(article.id, 'approved')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleModeration(article.id, 'rejected')}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
              <div className="prose max-w-none">
                {article.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 
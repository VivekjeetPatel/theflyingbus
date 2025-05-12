'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db, auth } from '../../../lib/firebase';
import { doc, getDoc, collection, query, where, orderBy, getDocs, addDoc, updateDoc, increment } from 'firebase/firestore';
import { distributeRewards } from '../../../lib/web3';

interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  likes: number;
  comments: number;
}

interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export default function ArticleDetail() {
  const params = useParams();
  const articleId = params.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticleAndComments();
  }, [articleId]);

  const loadArticleAndComments = async () => {
    try {
      // Load article
      const articleRef = doc(db, 'articles', articleId);
      const articleDoc = await getDoc(articleRef);
      
      if (!articleDoc.exists()) {
        throw new Error('Article not found');
      }

      setArticle({
        id: articleDoc.id,
        ...articleDoc.data()
      } as Article);

      // Load comments
      const commentsRef = collection(db, 'comments');
      const q = query(
        commentsRef,
        where('articleId', '==', articleId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[];

      setComments(commentsData);
    } catch (err) {
      console.error('Error loading article:', err);
      setError('Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Must be logged in to like articles');
      }

      const articleRef = doc(db, 'articles', articleId);
      await updateDoc(articleRef, {
        likes: increment(1)
      });

      setArticle(prev => prev ? {
        ...prev,
        likes: prev.likes + 1
      } : null);
    } catch (err) {
      console.error('Error liking article:', err);
      alert('Failed to like article');
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Must be logged in to comment');
      }

      // Add comment to Firestore
      const commentsRef = collection(db, 'comments');
      const newCommentRef = await addDoc(commentsRef, {
        articleId,
        content: newComment,
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous',
        createdAt: new Date().toISOString()
      });

      // Update article's comment count
      const articleRef = doc(db, 'articles', articleId);
      await updateDoc(articleRef, {
        comments: increment(1)
      });

      // Update local state
      const newCommentData = {
        id: newCommentRef.id,
        content: newComment,
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous',
        createdAt: new Date().toISOString()
      };

      setComments([newCommentData, ...comments]);
      setNewComment('');
      
      if (article) {
        setArticle({
          ...article,
          comments: article.comments + 1
        });
      }

      // Distribute rewards for commenting
      await distributeRewards(user.uid, 'COMMENT');
    } catch (err) {
      console.error('Error posting comment:', err);
      alert('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="p-6 bg-red-50 text-red-700 rounded-lg">
        {error || 'Article not found'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span>By {article.authorName}</span>
            <span className="mx-2">•</span>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="prose max-w-none mb-6">
            {article.content}
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <button
              onClick={handleLike}
              className="flex items-center hover:text-red-500"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{article.likes} likes</span>
            </button>
            
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span>{article.comments} comments</span>
            </div>
          </div>
        </div>
      </article>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Comments</h2>

        <form onSubmit={handleComment} className="mb-8">
          <div className="mb-4">
            <label htmlFor="comment" className="sr-only">
              Add a comment
            </label>
            <textarea
              id="comment"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`px-6 py-2 rounded-lg text-white ${
              submitting
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="mb-2">{comment.content}</p>
              <div className="text-sm text-gray-500">
                <span>{comment.authorName}</span>
                <span className="mx-2">•</span>
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
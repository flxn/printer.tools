import React, { useState, useEffect } from 'react';

// Simple cache to avoid duplicate API calls
const likeCountCache = new Map();

const LikeCount = ({ resourceSlug, className = "" }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLikeCount();
  }, [resourceSlug]);

  const loadLikeCount = async () => {
    if (!resourceSlug) {
      setIsLoading(false);
      return;
    }

    // Check cache first
    if (likeCountCache.has(resourceSlug)) {
      setLikeCount(likeCountCache.get(resourceSlug));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/likes/${resourceSlug}`);
      if (response.ok) {
        const data = await response.json();
        const count = data.count || 0;
        setLikeCount(count);
        // Cache the result for 5 minutes
        likeCountCache.set(resourceSlug, count);
        setTimeout(() => likeCountCache.delete(resourceSlug), 5 * 60 * 1000);
      }
    } catch (error) {
      console.log('Failed to load like count for', resourceSlug);
      // Fallback to localStorage
      const storedLikes = localStorage.getItem('printerToolsLikes');
      if (storedLikes) {
        try {
          const likes = JSON.parse(storedLikes);
          const count = likes[resourceSlug] || 0;
          setLikeCount(count);
          likeCountCache.set(resourceSlug, count);
        } catch (e) {
          setLikeCount(0);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  if (isLoading) {
    return (
      <div className={`flex items-center text-gray-400 bg-gray-50 rounded-full py-1 px-2 ${className}`}>
        <svg className="w-3 h-3 mr-1 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
        <span className="text-xs">...</span>
      </div>
    );
  }

  if (likeCount === 0) {
    return null; // Don't show anything if there are no likes
  }

  return (
    <div className={`flex items-center text-gray-500 bg-red-50 rounded-full py-1 px-2 ${className}`} title={`${likeCount} likes`}>
      <svg className="w-3 h-3 mr-1 text-red-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
      <span className="text-xs font-medium">{formatCount(likeCount)}</span>
    </div>
  );
};

export default LikeCount;
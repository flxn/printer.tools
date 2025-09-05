import React, { useState, useEffect, useRef } from 'react';

const LikeButton = ({ resourceId, resourceName }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const buttonRef = useRef(null);

  // API base URL - using local Astro API routes
  const API_BASE = '/api'; // Local API endpoints
  
  // Fallback to localStorage if API is not available
  const STORAGE_KEY = 'printerToolsLikes';
  const USER_LIKES_KEY = 'printerToolsUserLikes';

  // Load initial state
  useEffect(() => {
    loadLikeData();
  }, [resourceId]);

  // Hide notification after timeout
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const loadLikeData = async () => {
    setIsLoading(true);
    
    try {
      // Try to load from API first
      const response = await fetch(`${API_BASE}/likes/${resourceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.count || 0);
      } else {
        throw new Error('API not available');
      }
    } catch (error) {
      // Fallback to localStorage
      console.log('API not available, using localStorage');
      loadFromLocalStorage();
    }

    // Check if user has liked this resource
    checkUserLikeStatus();
    setIsLoading(false);
  };

  const loadFromLocalStorage = () => {
    const storedLikes = localStorage.getItem(STORAGE_KEY);
    if (storedLikes) {
      try {
        const likes = JSON.parse(storedLikes);
        setLikeCount(likes[resourceId] || 0);
      } catch (e) {
        console.error('Failed to parse likes from localStorage', e);
        setLikeCount(0);
      }
    }
  };

  const checkUserLikeStatus = () => {
    const userLikes = localStorage.getItem(USER_LIKES_KEY);
    if (userLikes) {
      try {
        const likes = JSON.parse(userLikes);
        setIsLiked(likes.includes(resourceId));
      } catch (e) {
        console.error('Failed to parse user likes from localStorage', e);
      }
    }
  };

  const updateLocalStorage = (newCount, userHasLiked) => {
    // Update global like counts
    const storedLikes = localStorage.getItem(STORAGE_KEY);
    let likes = {};
    if (storedLikes) {
      try {
        likes = JSON.parse(storedLikes);
      } catch (e) {
        console.error('Failed to parse likes from localStorage', e);
      }
    }
    likes[resourceId] = newCount;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likes));

    // Update user's like status
    const storedUserLikes = localStorage.getItem(USER_LIKES_KEY);
    let userLikes = [];
    if (storedUserLikes) {
      try {
        userLikes = JSON.parse(storedUserLikes);
      } catch (e) {
        console.error('Failed to parse user likes from localStorage', e);
      }
    }

    if (userHasLiked && !userLikes.includes(resourceId)) {
      userLikes.push(resourceId);
    } else if (!userHasLiked && userLikes.includes(resourceId)) {
      userLikes = userLikes.filter(id => id !== resourceId);
    }

    localStorage.setItem(USER_LIKES_KEY, JSON.stringify(userLikes));
  };

  const toggleLike = async () => {
    const newLikedState = !isLiked;
    const newCount = newLikedState ? likeCount + 1 : Math.max(0, likeCount - 1);

    // Optimistic update
    setIsLiked(newLikedState);
    setLikeCount(newCount);

    // Fire heart confetti on like (not on unlike)
    if (newLikedState) {
      try {
        launchHeartConfetti();
      } catch {}
    }

    try {
      // Try to update via API
      const response = await fetch(`${API_BASE}/likes/${resourceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: newLikedState ? 'like' : 'unlike',
          resourceName: resourceName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.count);
        setNotification(newLikedState ? 'Thanks for liking!' : 'Like removed');
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      // Fallback to localStorage
      console.log('API not available, using localStorage');
      setNotification(newLikedState ? 'Liked locally!' : 'Like removed');
    }

    // Always update localStorage as backup
    updateLocalStorage(newCount, newLikedState);
  };

  // --- Heart Confetti Effect (no dependencies) ---
  const launchHeartConfetti = () => {
    if (typeof window === 'undefined' || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = Math.max(0, rect.top) - 4; // just above the button

    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();

    const onResize = () => {
      resize();
    };
    window.addEventListener('resize', onResize);

    const particles = [];
    const count = 24;
    for (let i = 0; i < count; i++) {
      // Angles around straight up (-90deg) with some spread
      const angle = -Math.PI / 2 + (Math.random() * (Math.PI / 3) - Math.PI / 6);
      const speed = 4 + Math.random() * 3.5;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.4,
        size: 10 + Math.random() * 10, // px
        alpha: 1,
      });
    }

    const gravity = 0.1;
    const drag = 0.998;

    const drawHeart = (ctx, x, y, size, rotation, alpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      // Normalize heart size around ~10 units, then scale to px
      const s = size / 10;
      ctx.scale(s, s);
      ctx.beginPath();
      // Simple symmetric heart path centered at (0,0)
      ctx.moveTo(0, -3);
      ctx.bezierCurveTo(3, -6, 8, -3, 0, 6);
      ctx.bezierCurveTo(-8, -3, -3, -6, 0, -3);
      ctx.closePath();
      ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`; // tailwind red-500
      ctx.fill();
      ctx.restore();
    };

    let rafId;
    const tick = () => {
      // Clear in CSS pixels (context scaled to DPR)
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= drag;
        p.vy = p.vy * drag + gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.alpha -= 0.01 + Math.random() * 0.01;

        drawHeart(ctx, p.x, p.y, p.size, p.rotation, Math.max(0, p.alpha));

        // Remove faded or off-screen particles
        if (
          p.alpha <= 0 ||
          p.x < -100 ||
          p.x > window.innerWidth + 100 ||
          p.y > window.innerHeight + 100
        ) {
          particles.splice(i, 1);
        }
      }

      if (particles.length) {
        rafId = requestAnimationFrame(tick);
      } else {
        cleanup();
      }
    };

    const cleanup = () => {
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };

    rafId = requestAnimationFrame(tick);
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

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleLike}
        disabled={isLoading}
        className={`px-4 py-2 rounded-md text-sm font-medium border flex items-center transition-all ${
          isLiked 
            ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' 
            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label={isLiked ? "Unlike this tool" : "Like this tool"}
      >
        <svg 
          className={`w-4 h-4 mr-2 transition-colors ${
            isLiked ? 'text-red-500' : 'text-gray-400'
          }`} 
          fill={isLiked ? 'currentColor' : 'none'}
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span className="mr-1">
          {isLoading ? '...' : (isLiked ? 'Liked' : 'Like')}
        </span>
        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full min-w-[2rem] text-center">
          {isLoading ? '...' : formatCount(likeCount)}
        </span>
      </button>
      
      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all transform bg-gray-700">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span>{notification}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default LikeButton;
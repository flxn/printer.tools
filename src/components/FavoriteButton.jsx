import React, { useState, useEffect } from 'react';

const FavoriteButton = ({ resourceId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [notification, setNotification] = useState(null);

  // Check if this resource is favorited on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('printerToolsFavorites');
    if (storedFavorites) {
      try {
        const favorites = JSON.parse(storedFavorites);
        setIsFavorite(favorites.includes(resourceId));
      } catch (e) {
        console.error('Failed to parse favorites from localStorage', e);
      }
    }
  }, [resourceId]);

  // Hide notification after timeout
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const toggleFavorite = () => {
    const storedFavorites = localStorage.getItem('printerToolsFavorites');
    let favorites = [];
    
    if (storedFavorites) {
      try {
        favorites = JSON.parse(storedFavorites);
      } catch (e) {
        console.error('Failed to parse favorites from localStorage', e);
      }
    }

    if (isFavorite) {
      favorites = favorites.filter(id => id !== resourceId);
      setNotification('Removed from Quick Access');
    } else {
      favorites.push(resourceId);
      setNotification('Added to Quick Access');
    }

    localStorage.setItem('printerToolsFavorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <button
        onClick={toggleFavorite}
        className={`px-4 py-2 rounded-md text-sm font-medium border flex items-center ${
          isFavorite 
            ? 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100' 
            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
        }`}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <svg className={`w-4 h-4 mr-1 ${isFavorite ? 'text-yellow-500' : 'text-gray-400'}`} 
          fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        {isFavorite ? 'Favorited' : 'Add to Favorites'}
      </button>
      
      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all transform bg-gray-700">
          <div className="flex items-center space-x-2">
            {isFavorite ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            )}
            <span>{notification}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default FavoriteButton;

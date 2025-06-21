import React from 'react';

const FavoritesList = ({ favorites, resources, onToggleFavorite }) => {
  // If there are no favorites, don't render anything
  if (favorites.length === 0) {
    return null;
  }

  // Get the full resource objects for each favorite id
  const favoriteResources = resources.filter(resource => favorites.includes(resource.id));

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-gray-900">Quick Access</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {favoriteResources.map((resource) => (
          <div
            key={resource.id}
            className="group relative bg-white rounded-lg p-3 shadow-sm border border-gray-200 
                     hover:border-gray-300 hover:scale-101 hover:shadow-lg transition-all duration-200"
          >
            <a href={resource.website ? resource.website : `/tools/${resource.slug}`} className="block">
              {/* Icon */}
              <div className="flex items-center justify-center mb-2">
                {resource.icon ? (
                  <img 
                    src={resource.icon} 
                    alt={resource.name} 
                    className="w-8 h-8 object-contain" 
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center text-white font-medium text-sm">
                    {resource.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className="text-xs text-center font-medium text-gray-800 truncate">
                {resource.name}
              </h3>
            </a>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(resource.id);
              }}
              className="absolute top-1 right-1 p-1 text-yellow-500 hover:text-yellow-600"
              aria-label={`Remove ${resource.name} from favorites`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;

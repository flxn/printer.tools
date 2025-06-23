import React, { useState, useEffect } from 'react';
import FavoritesList from './FavoritesList';

const ResourceList = ({ resources, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState(null);

  // Check for URL parameters and load favorites on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Handle category parameter
    const categoryParam = urlParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
    
    // Handle search query parameter
    const searchQuery = urlParams.get('q');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }

    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('printerToolsFavorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        console.error('Failed to parse favorites from localStorage', e);
      }
    }
  }, [categories]);

  // Hide notification after timeout
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Toggle favorite status for a resource
  const toggleFavorite = (resourceId) => {
    // Find the resource name for the notification
    const resource = resources.find(r => r.id === resourceId);
    const resourceName = resource ? resource.name : 'Resource';

    setFavorites(prev => {
      const isRemoving = prev.includes(resourceId);
      const newFavorites = isRemoving
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId];
      
      // Save to localStorage
      localStorage.setItem('printerToolsFavorites', JSON.stringify(newFavorites));
      
      // Show notification
      setNotification({
        type: isRemoving ? 'removed' : 'added',
        message: isRemoving 
          ? `Removed ${resourceName} from Quick Access` 
          : `Added ${resourceName} to Quick Access`
      });
      
      return newFavorites;
    });
  };

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Group resources by category
  const groupedResources = filteredResources.reduce((groups, resource) => {
    const category = resource.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(resource);
    return groups;
  }, {});

  // Sort categories by order of categories array
  const sortedCategories = categories.filter(category => groupedResources[category]);

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all transform ${
          notification.type === 'added' ? 'bg-green-600' : 'bg-gray-700'
        }`}>
          <div className="flex items-center space-x-2">
            {notification.type === 'added' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Favorites Section */}
      <FavoritesList
        favorites={favorites}
        resources={resources} 
        onToggleFavorite={toggleFavorite}
      />

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search tools, software, and resources..."
              value={searchTerm}
              onChange={(e) => {
                const newSearchTerm = e.target.value;
                setSearchTerm(newSearchTerm);
                
                // Update URL with search term without page reload
                const url = new URL(window.location);
                if (newSearchTerm) {
                  url.searchParams.set('q', newSearchTerm);
                } else {
                  url.searchParams.delete('q');
                }
                window.history.replaceState({}, '', url);
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       placeholder-gray-500 text-gray-800"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => {
              const newCategory = e.target.value;
              setSelectedCategory(newCategory);
              
              // Update URL with category and preserve search term
              const url = new URL(window.location);
              if (newCategory !== 'All') {
                url.searchParams.set('category', newCategory);
              } else {
                url.searchParams.delete('category');
              }
              // Keep search term if it exists
              if (searchTerm) {
                url.searchParams.set('q', searchTerm);
              }
              window.history.replaceState({}, '', url);
            }}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     text-gray-700 min-w-[180px]"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-gray-600 text-sm">
        Showing {filteredResources.length} of {resources.length} resources
        {selectedCategory !== 'All' && (
          <span className="ml-2 text-blue-600">in {selectedCategory}</span>
        )}
      </div>

      {/* Grouped Resource Sections */}
      {sortedCategories.map((category) => (
        <div key={category} className="space-y-4">
          {/* Category Header */}
          <div className="flex items-center space-x-3 pb-2 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {groupedResources[category].length}
            </span>
          </div>
          
          {/* Resource Grid for this category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {groupedResources[category].map((resource) => (
              <div
                key={resource.id}
                className={`group relative bg-white rounded-xl p-4 shadow-sm border ${resource.madeByMe ? 'border-orange-200' : 'border-gray-200'} 
                         hover:shadow-md ${resource.madeByMe ? 'hover:border-orange-300' : 'hover:border-gray-200'} hover:scale-105 hover:shadow-xl transition-all duration-200`}
              >
                <a
                  href={`/tools/${resource.slug}`}
                  className="block"
                >
                  {/* Icon/Screenshot */}
                  <div className="flex items-center justify-center w-12 h-12 mb-3 bg-gray-100 rounded-lg">
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

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm pr-6">
                      {resource.name}
                    </h3>
                    
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                      {resource.shortDescription || resource.description}
                    </p>

                    {/* Price only (category is now in section header) */}
                    <div className="flex items-center justify-between pt-1">
                      {resource.website && (
                      <a href={resource.website} target="_blank" rel="noopener noreferrer" className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors">
                        Visit Website
                      </a>
                      )}
                      <span className={`text-xs font-medium ${resource.price === 'Free' ? 'text-green-600' : 'text-gray-700'}`}>
                        {resource.price}
                      </span>
                    </div>
                  </div>
                </a>

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(resource.id);
                  }}
                  className={`absolute top-2 right-2 p-1 ${favorites.includes(resource.id) 
                    ? 'text-yellow-500 hover:text-yellow-600' 
                    : 'text-gray-300 hover:text-gray-500'}`}
                  aria-label={favorites.includes(resource.id) 
                    ? `Remove ${resource.name} from favorites` 
                    : `Add ${resource.name} to favorites`}
                  title={favorites.includes(resource.id) 
                    ? `Remove ${resource.name} from favorites` 
                    : `Add ${resource.name} to favorites`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.443-.64-6.293-1.709M12 21l-9-9 9-9 9 9-9 9z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
        </div>
      )}
    </div>
  );
};

export default ResourceList;

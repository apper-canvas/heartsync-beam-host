import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = ({ preferences, onPreferenceUpdate }) => {
  // Icons
  const HeartIcon = getIcon('Heart');
  const XIcon = getIcon('X');
  const SliderIcon = getIcon('Sliders');
  const RefreshCwIcon = getIcon('RefreshCw');
  const MapPinIcon = getIcon('MapPin');
  const BriefcaseIcon = getIcon('Briefcase');
  const GraduationCapIcon = getIcon('GraduationCap');
  const MusicIcon = getIcon('Music');
  const CoffeeIcon = getIcon('Coffee');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const ChevronRightIcon = getIcon('ChevronRight');
  const FilterIcon = getIcon('Filter');
  
  // State
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [filterSettings, setFilterSettings] = useState({
    ageRange: [preferences.ageRange[0], preferences.ageRange[1]],
    distance: preferences.distance,
    interestedIn: preferences.interestedIn,
    showMe: preferences.showMe
  });

  // Sample potential matches data
  const potentialMatches = [
    {
      id: 1,
      name: "Emma",
      age: 28,
      distance: 3,
      occupation: "UX Designer",
      education: "Stanford University",
      bio: "Creative soul who loves design, hiking, and trying new restaurants. Looking for someone who shares my passion for exploration.",
      compatibilityScore: 89,
      photos: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      interests: ["Design", "Hiking", "Food", "Music", "Travel"]
    },
    {
      id: 2,
      name: "Michael",
      age: 32,
      distance: 5,
      occupation: "Software Engineer",
      education: "MIT",
      bio: "Tech enthusiast who enjoys coding, running, and playing guitar. Seeking someone to share adventures and quiet evenings.",
      compatibilityScore: 85,
      photos: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      interests: ["Coding", "Music", "Running", "Photography", "Movies"]
    },
    {
      id: 3,
      name: "Sophia",
      age: 26,
      distance: 7,
      occupation: "Marketing Specialist",
      education: "NYU",
      bio: "Creative thinker who loves photography, yoga, and indie films. Looking for genuine connections and meaningful conversations.",
      compatibilityScore: 92,
      photos: [
        "https://images.unsplash.com/photo-1539698103494-a76dd0436fbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      interests: ["Photography", "Yoga", "Film", "Art", "Reading"]
    }
  ];

  const currentProfile = potentialMatches[currentProfileIndex];

  // Handle swipe interactions
  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX || e.touches[0].clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (clientX) {
      const offset = clientX - dragStartX;
      setDragOffset(offset);
      
      // Determine swipe direction for visual feedback
      if (offset > 50) {
        setSwipeDirection('right');
      } else if (offset < -50) {
        setSwipeDirection('left');
      } else {
        setSwipeDirection(null);
      }
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    // If swiped enough distance, process the swipe
    if (dragOffset > 100) {
      handleLike();
    } else if (dragOffset < -100) {
      handlePass();
    }
    
    // Reset values
    setDragOffset(0);
    setSwipeDirection(null);
  };

  const handleLike = () => {
    toast.success(`You liked ${currentProfile.name}!`);
    goToNextProfile();
  };

  const handlePass = () => {
    toast.info(`You passed on ${currentProfile.name}`);
    goToNextProfile();
  };

  const goToNextProfile = () => {
    setCurrentProfileIndex((prevIndex) => {
      if (prevIndex >= potentialMatches.length - 1) {
        toast.info("You've seen all potential matches! Refreshing the list.");
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const goToPreviousProfile = () => {
    setCurrentProfileIndex((prevIndex) => {
      if (prevIndex <= 0) {
        toast.info("You're at the beginning of your matches.");
        return 0;
      }
      return prevIndex - 1;
    });
  };

  const handleFilterChange = (key, value) => {
    setFilterSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    onPreferenceUpdate(filterSettings);
    setShowFilters(false);
    toast.success("Filters applied successfully!");
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Preferences</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <XIcon size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Age Range</label>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-surface-600 dark:text-surface-400">
                    {filterSettings.ageRange[0]}
                  </span>
                  <input
                    type="range"
                    min="18"
                    max="70"
                    value={filterSettings.ageRange[0]}
                    onChange={(e) => handleFilterChange('ageRange', [parseInt(e.target.value), filterSettings.ageRange[1]])}
                    className="flex-1 mx-3 h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-surface-600 dark:text-surface-400">
                    {filterSettings.ageRange[1]}
                  </span>
                  <input
                    type="range"
                    min="18"
                    max="70"
                    value={filterSettings.ageRange[1]}
                    onChange={(e) => handleFilterChange('ageRange', [filterSettings.ageRange[0], parseInt(e.target.value)])}
                    className="flex-1 mx-3 h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              <div>
                <label className="block mb-2 font-medium">Maximum Distance</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={filterSettings.distance}
                    onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
                    className="flex-1 h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="ml-3 text-surface-600 dark:text-surface-400 min-w-[60px]">
                    {filterSettings.distance} miles
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block mb-2 font-medium">Interested In</label>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleFilterChange('interestedIn', 'women')}
                    className={`px-4 py-2 rounded-lg ${
                      filterSettings.interestedIn === 'women'
                        ? 'bg-primary text-white'
                        : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                    }`}
                  >
                    Women
                  </button>
                  <button
                    onClick={() => handleFilterChange('interestedIn', 'men')}
                    className={`px-4 py-2 rounded-lg ${
                      filterSettings.interestedIn === 'men'
                        ? 'bg-primary text-white'
                        : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                    }`}
                  >
                    Men
                  </button>
                  <button
                    onClick={() => handleFilterChange('interestedIn', 'everyone')}
                    className={`px-4 py-2 rounded-lg ${
                      filterSettings.interestedIn === 'everyone'
                        ? 'bg-primary text-white'
                        : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                    }`}
                  >
                    Everyone
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="font-medium">Show Me to Others</label>
                <button
                  onClick={() => handleFilterChange('showMe', !filterSettings.showMe)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    filterSettings.showMe ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      filterSettings.showMe ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <button
                onClick={applyFilters}
                className="btn-primary w-full"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Profile Card */}
      <div 
        className="relative overflow-hidden"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <motion.div
          animate={{
            x: dragOffset,
            rotate: dragOffset * 0.05
          }}
          className="card overflow-hidden"
          style={{ touchAction: 'pan-y' }}
        >
          <div className="relative">
            <img
              src={currentProfile.photos[0]}
              alt={currentProfile.name}
              className="w-full h-96 object-cover rounded-xl"
            />
            <div className="absolute top-4 right-4 bg-white dark:bg-surface-800 rounded-full px-3 py-1.5 text-sm font-semibold text-primary flex items-center space-x-1 shadow-soft">
              <HeartIcon size={16} className="fill-primary" />
              <span>{currentProfile.compatibilityScore}%</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{currentProfile.name}, {currentProfile.age}</h2>
              <div className="flex items-center text-surface-600 dark:text-surface-400">
                <MapPinIcon size={16} className="mr-1" />
                <span className="text-sm">{currentProfile.distance} miles away</span>
              </div>
            </div>
            
            <div className="flex items-center mt-2 text-surface-600 dark:text-surface-400">
              <BriefcaseIcon size={16} className="mr-1" />
              <span className="text-sm mr-4">{currentProfile.occupation}</span>
              <GraduationCapIcon size={16} className="mr-1" />
              <span className="text-sm">{currentProfile.education}</span>
            </div>
            
            <p className="mt-3 text-surface-700 dark:text-surface-300">
              {currentProfile.bio}
            </p>
            
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2 text-surface-600 dark:text-surface-400">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.map((interest, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 bg-surface-100 dark:bg-surface-700 text-surface-800 dark:text-surface-200 rounded-full text-xs font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Swipe Overlay */}
            {swipeDirection && (
              <div className={`absolute inset-0 flex items-center justify-center rounded-xl bg-black bg-opacity-40`}>
                {swipeDirection === 'right' ? (
                  <div className="rounded-full bg-green-500 p-4">
                    <HeartIcon size={40} className="text-white" />
                  </div>
                ) : (
                  <div className="rounded-full bg-red-500 p-4">
                    <XIcon size={40} className="text-white" />
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Action buttons */}
      <div className="flex items-center justify-center space-x-4 mt-6">
        <button
          onClick={goToPreviousProfile}
          className="p-3 bg-white dark:bg-surface-800 rounded-full shadow-card hover:shadow-lg dark:shadow-none dark:hover:bg-surface-700 transition-all"
        >
          <ChevronLeftIcon size={24} className="text-surface-600 dark:text-surface-400" />
        </button>
        
        <button
          onClick={handlePass}
          className="p-5 bg-white dark:bg-surface-800 rounded-full shadow-card hover:shadow-lg dark:shadow-none dark:hover:bg-surface-700 transition-all"
        >
          <XIcon size={32} className="text-red-500" />
        </button>
        
        <button
          onClick={handleLike}
          className="p-5 bg-white dark:bg-surface-800 rounded-full shadow-card hover:shadow-lg dark:shadow-none dark:hover:bg-surface-700 transition-all"
        >
          <HeartIcon size={32} className="text-primary fill-primary" />
        </button>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-3 bg-white dark:bg-surface-800 rounded-full shadow-card hover:shadow-lg dark:shadow-none dark:hover:bg-surface-700 transition-all"
        >
          <FilterIcon size={24} className="text-surface-600 dark:text-surface-400" />
        </button>
        
        <button
          onClick={goToNextProfile}
          className="p-3 bg-white dark:bg-surface-800 rounded-full shadow-card hover:shadow-lg dark:shadow-none dark:hover:bg-surface-700 transition-all"
        >
          <ChevronRightIcon size={24} className="text-surface-600 dark:text-surface-400" />
        </button>
      </div>
    </div>
  );
};

export default MainFeature;
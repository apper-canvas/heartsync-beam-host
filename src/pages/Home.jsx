import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

const Home = () => {
  const [activeSection, setActiveSection] = useState('explore');
  const [userPreferences, setUserPreferences] = useState({
    ageRange: [25, 35],
    distance: 25,
    interestedIn: 'everyone',
    showMe: true
  });
  
  // Icons
  const SearchHeartIcon = getIcon('SearchHeart');
  const HeartIcon = getIcon('Heart');
  const MessagesSquareIcon = getIcon('MessagesSquare');
  const UserIcon = getIcon('User');
  
  const handleSectionChange = (section) => {
    setActiveSection(section);
    // We could add analytics tracking here in a real app
  };
  
  const handlePreferenceUpdate = (preferences) => {
    setUserPreferences(preferences);
    toast.success("Preferences updated successfully!");
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Find Your <span className="text-gradient">Perfect Match</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-surface-600 dark:text-surface-400">
          Connect with people who share your interests, values, and life goals
        </p>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center mb-8">
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-surface-800 rounded-full p-1.5 shadow-soft flex items-center"
          >
            <button
              onClick={() => handleSectionChange('explore')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                activeSection === 'explore' 
                  ? 'bg-primary text-white'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
              } transition-all duration-300`}
            >
              <SearchHeartIcon size={18} />
              <span className="hidden sm:inline">Explore</span>
            </button>
            
            <button
              onClick={() => handleSectionChange('matches')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                activeSection === 'matches' 
                  ? 'bg-primary text-white'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
              } transition-all duration-300`}
            >
              <HeartIcon size={18} />
              <span className="hidden sm:inline">Matches</span>
            </button>
            
            <button
              onClick={() => handleSectionChange('messages')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                activeSection === 'messages' 
                  ? 'bg-primary text-white'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
              } transition-all duration-300`}
            >
              <MessagesSquareIcon size={18} />
              <span className="hidden sm:inline">Messages</span>
            </button>
            
            <button
              onClick={() => handleSectionChange('profile')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                activeSection === 'profile' 
                  ? 'bg-primary text-white'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
              } transition-all duration-300`}
            >
              <UserIcon size={18} />
              <span className="hidden sm:inline">Profile</span>
            </button>
          </motion.div>
        </div>
        
        {/* Active Section Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'explore' && (
              <MainFeature 
                preferences={userPreferences}
                onPreferenceUpdate={handlePreferenceUpdate}
              />
            )}
            
            {activeSection === 'matches' && (
              <div className="text-center py-12">
                <img 
                  src="https://images.unsplash.com/photo-1545271508-8895fcc9de35?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Matches" 
                  className="w-48 h-48 mx-auto mb-6 rounded-full object-cover"
                />
                <h2 className="text-2xl font-bold mb-4">Your Matches</h2>
                <p className="text-surface-600 dark:text-surface-400 mb-6">
                  Start exploring to find your potential matches!
                </p>
                <button 
                  onClick={() => handleSectionChange('explore')}
                  className="btn-primary"
                >
                  Start Exploring
                </button>
              </div>
            )}
            
            {activeSection === 'messages' && (
              <div className="text-center py-12">
                <img 
                  src="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Messages" 
                  className="w-48 h-48 mx-auto mb-6 rounded-full object-cover"
                />
                <h2 className="text-2xl font-bold mb-4">Your Messages</h2>
                <p className="text-surface-600 dark:text-surface-400 mb-6">
                  No conversations yet. Match with someone to start chatting!
                </p>
                <button 
                  onClick={() => handleSectionChange('explore')}
                  className="btn-primary"
                >
                  Find Matches
                </button>
              </div>
            )}
            
            {activeSection === 'profile' && (
              <div className="text-center py-12">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-6xl">
                  <UserIcon size={64} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
                <p className="text-surface-600 dark:text-surface-400 mb-6">
                  Complete your profile to improve your matches
                </p>
                <button 
                  onClick={() => toast.info("Profile editing coming soon!")}
                  className="btn-primary"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Home;
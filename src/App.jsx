import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import getIcon from './utils/iconUtils';

// Context
import { UserProvider, useUser } from './context/UserContext';

// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Lazy load the modal to avoid unnecessary code
const GenderPreferenceModal = lazy(() => import('./components/GenderPreferenceModal'));

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  // Icons
  const SunIcon = getIcon('Sun');
  const MoonIcon = getIcon('Moon');
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <UserProvider>
      <AppContent isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </UserProvider>
  );
}

// Separating content to use context
function AppContent({ isDarkMode, toggleDarkMode }) {
  const { needsOnboarding } = useUser();
  
  // Icons
  const SunIcon = getIcon('Sun');
  const MoonIcon = getIcon('Moon');
  

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -30 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-primary text-2xl">❤</span>
            </motion.div>
            <h1 className="text-xl font-bold text-surface-800 dark:text-surface-100">
              Heart<span className="text-primary">Sync</span>
            </h1>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20 pb-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-surface-800 shadow-sm py-4">
        <div className="container mx-auto px-4 text-center text-surface-500 dark:text-surface-400 text-sm">
          &copy; {new Date().getFullYear()} HeartSync - Find your perfect match
        </div>
      </footer>
      
      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
        toastClassName="rounded-xl shadow-lg"
      />
      
      {/* Onboarding Modal */}
      {needsOnboarding && (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-surface-800 p-6 rounded-xl">Loading...</div>
        </div>}>
          <GenderPreferenceModal />
        </Suspense>
      )}
    </div>
  );
}

export default App;
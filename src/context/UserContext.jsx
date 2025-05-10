import { createContext, useState, useContext, useEffect } from 'react';

// Create context
const UserContext = createContext();

// Custom hook for using the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Provider component
export const UserProvider = ({ children }) => {
  const [userGender, setUserGender] = useState(null);
  const [needsOnboarding, setNeedsOnboarding] = useState(true);
  
  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedGender = localStorage.getItem('userGender');
    if (savedGender) {
      setUserGender(savedGender);
      setNeedsOnboarding(false);
    } else {
      setNeedsOnboarding(true);
    }
  }, []);

  // Save gender preference and mark onboarding as complete
  const setGenderPreference = (gender) => {
    setUserGender(gender);
    localStorage.setItem('userGender', gender);
    setNeedsOnboarding(false);
  };

  return (
    <UserContext.Provider value={{ 
      userGender, 
      setGenderPreference,
      needsOnboarding
    }}>
      {children}
    </UserContext.Provider>
  );
};
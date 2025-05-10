import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import getIcon from '../utils/iconUtils';

const GenderPreferenceModal = () => {
  const { setGenderPreference } = useUser();
  const [selectedGender, setSelectedGender] = useState(null);
  
  // Icons
  const MaleIcon = getIcon('Male');
  const FemaleIcon = getIcon('Female');
  const ArrowRightIcon = getIcon('ArrowRight');
  
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };
  
  const handleContinue = () => {
    if (selectedGender) {
      setGenderPreference(selectedGender);
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white dark:bg-surface-800 rounded-2xl shadow-xl p-6 max-w-md w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className="text-2xl font-bold text-center mb-6 text-surface-800 dark:text-white" variants={itemVariants}>
          Welcome to <span className="text-primary">HeartSync</span>
        </motion.h2>
        
        <motion.p className="text-surface-600 dark:text-surface-300 text-center mb-8" variants={itemVariants}>
          Please select your gender so we can show you the right matches
        </motion.p>
        
        <motion.div className="flex justify-center space-x-8 mb-8" variants={itemVariants}>
          <button
            onClick={() => handleGenderSelect('male')}
            className={`flex flex-col items-center p-4 rounded-xl transition-all ${
              selectedGender === 'male' 
                ? 'bg-primary bg-opacity-10 border-2 border-primary scale-105' 
                : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
          >
            <MaleIcon size={40} className={selectedGender === 'male' ? 'text-primary' : 'text-surface-600 dark:text-surface-300'} />
            <span className={`mt-2 font-medium ${selectedGender === 'male' ? 'text-primary' : 'text-surface-700 dark:text-surface-200'}`}>Male</span>
          </button>
          
          <button
            onClick={() => handleGenderSelect('female')}
            className={`flex flex-col items-center p-4 rounded-xl transition-all ${
              selectedGender === 'female' 
                ? 'bg-primary bg-opacity-10 border-2 border-primary scale-105' 
                : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
          >
            <FemaleIcon size={40} className={selectedGender === 'female' ? 'text-primary' : 'text-surface-600 dark:text-surface-300'} />
            <span className={`mt-2 font-medium ${selectedGender === 'female' ? 'text-primary' : 'text-surface-700 dark:text-surface-200'}`}>Female</span>
          </button>
        </motion.div>
        
        <motion.button variants={itemVariants} onClick={handleContinue} disabled={!selectedGender} className="w-full py-3 px-4 bg-primary hover:bg-primary-600 active:bg-primary-700 disabled:bg-surface-300 dark:disabled:bg-surface-600 text-white rounded-xl font-medium flex items-center justify-center space-x-2 disabled:cursor-not-allowed transition-colors">
          <span>Continue</span>
          <ArrowRightIcon size={18} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default GenderPreferenceModal;
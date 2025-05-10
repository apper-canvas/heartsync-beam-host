import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  // Icons
  const HeartOffIcon = getIcon('HeartOff');
  const HomeIcon = getIcon('Home');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        delay: 0.2, 
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4"
    >
      <motion.div
        variants={itemVariants}
        className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-8"
      >
        <HeartOffIcon size={64} className="text-primary" />
      </motion.div>
      
      <motion.h1 
        variants={itemVariants}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        404
      </motion.h1>
      
      <motion.h2 
        variants={itemVariants}
        className="text-2xl md:text-3xl font-bold mb-6"
      >
        Page Not Found
      </motion.h2>
      
      <motion.p 
        variants={itemVariants}
        className="text-surface-600 dark:text-surface-400 max-w-md mb-10 text-lg"
      >
        Looks like this relationship wasn't meant to be. Let's find you a better match!
      </motion.p>
      
      <motion.div variants={itemVariants}>
        <Link 
          to="/" 
          className="btn-primary flex items-center justify-center space-x-2"
        >
          <HomeIcon size={20} />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
// src/components/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const LandingPage = () => {
  // Framer Motion Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const cardHoverEffect = {
    scale: 1.05,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
    transition: { type: 'spring', stiffness: 300 },
  };

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-200 text-slate-800 font-sans min-h-screen overflow-x-hidden">
      {/* Main container for staggered animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <header className="text-center py-24 px-6">
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-extrabold mb-4 text-blue-900 leading-tight"
          >
            <span className="block text-sky-600">Your Ideas,</span>
            <span className="block mt-2">Perfectly Organized.</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-blue-800 max-w-3xl mx-auto mb-8"
          >
            noteManager: The intelligent and secure way to capture, manage, and retrieve all your important notes with ease.
          </motion.p>
          <motion.div variants={itemVariants} className="flex justify-center items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="bg-sky-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-sky-600 transition-colors duration-300"
              >
                Start Taking Notes
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="bg-white text-sky-600 font-bold py-3 px-8 rounded-full shadow-lg border border-slate-300 hover:bg-slate-100 transition-colors duration-300"
              >
                I Already Have An Account
              </Link>
            </motion.div>
          </motion.div>
        </header>

        {/* Feature Showcase Section */}
        <main className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-center mb-16 text-blue-900"
            >
              Features Designed For You
            </motion.h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible" // Animation triggers when section scrolls into view
              viewport={{ once: true, amount: 0.3 }}
              className="grid md:grid-cols-3 gap-8 text-left"
            >
              {/* Feature 1 */}
              <motion.div
                variants={itemVariants}
                whileHover={cardHoverEffect}
                className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50"
              >
                <div className="text-4xl mb-4 text-sky-500">✍️</div>
                <h3 className="text-2xl font-semibold mb-3 text-blue-800">Rich Text Editor</h3>
                <p className="text-slate-600">
                  Craft beautiful notes with robust formatting options: headings, lists, bold, italics, and more.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                variants={itemVariants}
                whileHover={cardHoverEffect}
                className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50"
              >
                <div className="text-4xl mb-4 text-emerald-500">🏷️</div>
                <h3 className="text-2xl font-semibold mb-3 text-blue-800">Intelligent Tagging</h3>
                <p className="text-slate-600">
                  Effortlessly organize and retrieve your notes using a flexible and intuitive tagging system.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                variants={itemVariants}
                whileHover={cardHoverEffect}
                className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50"
              >
                <div className="text-4xl mb-4 text-purple-500">☁️</div>
                <h3 className="text-2xl font-semibold mb-3 text-blue-800">Seamless Cloud Sync</h3>
                <p className="text-slate-600">
                  Your notes are securely stored and instantly accessible across all your devices, anytime, anywhere.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-blue-900 text-white text-center py-8">
          <p>&copy; {new Date().getFullYear()} noteManager. All rights reserved.</p>
        </footer>
      </motion.div>
    </div>
  );
};

export default LandingPage;
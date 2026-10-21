'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const WhatsAppButton: React.FC = () => {
  return (
    <motion.a
      href="https://wa.me/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-11 h-11 sm:w-13 sm:h-13 bg-[#25d366] rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] cursor-pointer transition-shadow"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
    >
      <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-7 sm:h-7 fill-white" aria-hidden="true">
        <path d="M16 2a13.9 13.9 0 0 0-12 21l-2 7.7 7.9-2A13.9 13.9 0 1 0 16 2zm0 25.5c-2.3 0-4.5-.6-6.4-1.8l-.5-.3-4.7 1.2 1.3-4.5-.3-.5A11.6 11.6 0 1 1 27.6 16 11.6 11.6 0 0 1 16 27.5zm6.4-8.7c-.3-.2-2.1-1-2.4-1.1-.3-.1-.6-.2-.8.2s-.9 1.1-1.1 1.3-.4.2-.7 0a9.2 9.2 0 0 1-2.7-1.7 10.2 10.2 0 0 1-1.9-2.3c-.2-.4 0-.6.1-.8.2-.2.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.8-2-1.1-2.7c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1 .5s-1.4 1.3-1.4 3.2 1.4 3.7 1.6 4c.2.2 2.8 4.3 6.8 6 1 .4 1.7.7 2.3.9.9.3 1.8.3 2.5.2.8-.1 2.4-1 2.8-1.9.3-1 .3-1.8.2-1.9-.1-.2-.4-.3-.7-.5z" />
      </svg>
    </motion.a>
  );
};

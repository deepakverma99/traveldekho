'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown, Star, Heart } from 'lucide-react';
import { colors } from '@/theme/colors';

export const HeroBookingCard: React.FC = () => {
  const [destination, setDestination] = useState<string>('');
  const [pickup, setPickup] = useState<string>('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden font-jakarta shadow-[0_20px_50px_-12px_rgba(244,140,6,0.22),0_8px_24px_-8px_rgba(250,161,46,0.25)]"
      style={{
        background: `linear-gradient(145deg, ${colors.amber[300]} 0%, ${colors.amber[400]} 55%, ${colors.amber[500]} 100%)`,
      }}
    >
      {/* Sheen Radial Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.9) 0%, transparent 55%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.7) 0%, transparent 45%)',
        }}
      />

      <div className="relative z-10">
        <h1 className="text-[24px] sm:text-[34px] md:text-[40px] font-black leading-[1.08] mb-2 sm:mb-3.5 tracking-tight text-charcoal">
          Find Your
          <br />
          Dream Trip
        </h1>

        <p className="text-[14px] sm:text-[15px] leading-relaxed mb-5 sm:mb-7 font-medium text-dark-amber">
          Get instant suggestions for your next adventure
        </p>

        {/* Form Box */}
        <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-3.5 sm:p-5 border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex flex-col gap-3">
          {/* Destination Selector */}
          <div className="relative group">
            <button
              id="hero-destination-trigger"
              type="button"
              onClick={() => {
                const choice = prompt('Enter your destination:');
                if (choice) setDestination(choice);
              }}
              className="w-full text-left bg-white/85 hover:bg-white backdrop-blur-sm rounded-xl py-3.5 pl-10 pr-4 text-[13px] font-bold tracking-wider outline-none cursor-pointer transition-all duration-200 border-2 border-transparent text-charcoal shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] hover:border-amber-500/40 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/25 relative font-jakarta"
            >
              {destination ? destination.toUpperCase() : 'DESTINATION'}
            </button>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MapPin className="w-4 h-4 text-[#191c1d] opacity-70" />
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-[#191c1d] opacity-70" />
            </div>
          </div>

          {/* Pickup Selector */}
          <div className="relative group">
            <button
              id="hero-pickup-trigger"
              type="button"
              onClick={() => {
                const choice = prompt('Enter your pickup location:');
                if (choice) setPickup(choice);
              }}
              className="w-full text-left bg-white/85 hover:bg-white backdrop-blur-sm rounded-xl py-3.5 pl-10 pr-4 text-[13px] font-bold tracking-wider outline-none cursor-pointer transition-all duration-200 border-2 border-transparent text-charcoal shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] hover:border-amber-500/40 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/25 relative font-jakarta"
            >
              {pickup ? pickup.toUpperCase() : 'PICKUP'}
            </button>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MapPin className="w-4 h-4 text-[#191c1d] opacity-70" />
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-[#191c1d] opacity-70" />
            </div>
          </div>

          {/* Search CTA */}
          <motion.button
            id="hero-search-button"
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-xl flex justify-center items-center p-3.5 text-sm font-extrabold tracking-widest cursor-pointer mt-1.5 relative overflow-hidden bg-amber-500 hover:bg-black text-white border-0 font-jakarta shadow-[0_4px_14px_rgba(244,140,6,0.35)] hover:shadow-lg transition-all duration-300 group"
          >
            <span className="relative z-10">SEARCH</span>
          </motion.button>
        </div>

        {/* Footer Badges */}
        <div className="flex items-center justify-center mt-8 pt-2">
          {/* Rating */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Star className="w-[18px] h-[18px] text-green-700 fill-green-700" />
              <span className="text-lg font-bold text-gray-900">4.0/5</span>
            </div>
            <span className="text-xs font-medium text-gray-800/70 text-center leading-tight">
              Based on
              <br />
              Reviews
            </span>
          </div>

          {/* Divider */}
          <div className="w-px h-10 bg-dark-amber/20 mx-4" />

          {/* Happy Customers */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center justify-center h-7 mb-1">
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
            </div>
            <span className="text-xs font-medium text-gray-800/70 text-center leading-tight">
              Happy
              <br />
              Customers
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

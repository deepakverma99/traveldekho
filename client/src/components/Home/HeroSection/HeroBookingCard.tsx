'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown, Star, Heart } from 'lucide-react';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const CardContainer = styled(motion.div)`
  border-radius: 1rem;
  padding: 1.25rem 1rem 1.5rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(145deg, #ffd133 0%, #f5c623 50%, #eec221 100%);
  box-shadow: rgba(115, 92, 0, 0.2) 0px 20px 60px -12px, rgba(255, 209, 51, 0.25) 0px 8px 24px -8px;
  font-family: ${typography.fonts.jakarta};

  @media (min-width: 480px) {
    padding: 1.5rem 1.5rem 1.75rem;
  }

  @media (min-width: 640px) {
    padding: 2rem 2rem 2.25rem;
  }
`;

const SheenOverlay = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.06;
  pointer-events: none;
  background-image: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.8) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.5) 0%, transparent 40%);
`;

const FormBox = styled.div`
  backdrop-filter: blur(24px);
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 1rem;
  padding: 0.875rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 30px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 480px) {
    padding: 1.25rem;
  }
`;

const SelectTrigger = styled.button`
  width: 100%;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  padding: 0.875rem 1rem 0.875rem 2.5rem;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  color: ${colors.charcoal};
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 8px -2px;
  position: relative;
  font-family: ${typography.fonts.jakarta};

  &:hover {
    background-color: #ffffff;
    border-color: rgba(255, 209, 51, 0.5);
  }

  &:focus {
    border-color: ${colors.gold};
    box-shadow: 0 0 0 3px rgba(250, 203, 43, 0.3);
  }
`;

const SearchSubmitButton = styled(motion.button)`
  width: 100%;
  border-radius: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.875rem;
  font-size: 0.875rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  cursor: pointer;
  margin-top: 0.375rem;
  position: relative;
  overflow: hidden;
  background-color: ${colors.gold};
  color: ${colors.charcoal};
  border: none;
  font-family: ${typography.fonts.jakarta};
  box-shadow: 0 4px 14px rgba(250, 203, 43, 0.4);
  transition: all 0.25s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: ${colors.black};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
  }

  &:hover {
    color: ${colors.white};

    &::before {
      transform: scaleX(1);
    }
  }

  > span {
    position: relative;
    z-index: 10;
  }
`;

export const HeroBookingCard: React.FC = () => {
  const [destination, setDestination] = useState<string>('');
  const [pickup, setPickup] = useState<string>('');

  return (
    <CardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <SheenOverlay />

      <div className="relative z-10">
        <h1 className="text-[24px] sm:text-[34px] md:text-[40px] font-black leading-[1.08] mb-2 sm:mb-3.5 tracking-tight text-[#191c1d]">
          Find Your
          <br />
          Dream Trip
        </h1>

        <p className="text-[14px] sm:text-[15px] leading-relaxed mb-5 sm:mb-7 font-medium text-[#3a3520]">
          Get instant suggestions for your next adventure
        </p>

        <FormBox>
          {/* Destination Selector */}
          <div className="relative group">
            <SelectTrigger
              id="hero-destination-trigger"
              type="button"
              onClick={() => {
                const choice = prompt('Enter your destination:');
                if (choice) setDestination(choice);
              }}
            >
              {destination ? destination.toUpperCase() : 'DESTINATION'}
            </SelectTrigger>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MapPin className="w-[16px] h-[16px] text-[#191c1d] opacity-70" />
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <ChevronDown className="w-[16px] h-[16px] text-[#191c1d] opacity-70" />
            </div>
          </div>

          {/* Pickup Selector */}
          <div className="relative group">
            <SelectTrigger
              id="hero-pickup-trigger"
              type="button"
              onClick={() => {
                const choice = prompt('Enter your pickup location:');
                if (choice) setPickup(choice);
              }}
            >
              {pickup ? pickup.toUpperCase() : 'PICKUP'}
            </SelectTrigger>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MapPin className="w-[16px] h-[16px] text-[#191c1d] opacity-70" />
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <ChevronDown className="w-[16px] h-[16px] text-[#191c1d] opacity-70" />
            </div>
          </div>

          {/* Search CTA */}
          <SearchSubmitButton
            id="hero-search-button"
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>SEARCH</span>
          </SearchSubmitButton>
        </FormBox>

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
          <div className="w-px h-10 bg-[#C89B16]/30 mx-4" />

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
    </CardContainer>
  );
};

'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { PartnerNetworkItem } from './types';
import { typography } from '@/theme/typography';

const CardRoot = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 1.25rem;
  padding: 1.25rem 1rem;
  width: 100%;
  max-width: 300px;
  height: 260px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-family: ${typography.fonts.jakarta};

  @media (min-width: 640px) {
    max-width: 100%;
    height: 100%;
    min-height: 275px;
    border-radius: 20px;
    padding: 1.25rem;
  }

  @media (min-width: 1024px) {
    min-height: 300px;
    border-radius: 24px;
    padding: 1.5rem;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-bottom: 0.5rem;

  @media (min-width: 640px) {
    height: 95px;
    margin-bottom: 0.75rem;
  }

  @media (min-width: 1024px) {
    height: 110px;
    margin-bottom: 1rem;
  }

  .icon-inner {
    filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04));
    opacity: 0.9;
    transform: scale(0.7);
    transition: transform 0.3s ease;

    @media (min-width: 640px) {
      transform: scale(0.8);
    }

    @media (min-width: 1024px) {
      transform: scale(0.9);
    }

    &:hover {
      transform: scale(1.05);
    }
  }
`;

interface PartnerCardProps {
  item: PartnerNetworkItem;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({ item }) => {
  return (
    <CardRoot>
      <IconWrapper>
        <div className="icon-inner">
          {item.icon}
        </div>
      </IconWrapper>

      <div className="flex flex-col flex-grow items-center justify-center text-center w-full min-h-[56px] px-1">
        <h3 className="text-[13px] sm:text-[14px] lg:text-[15px] font-bold text-gray-900 leading-[1.35] whitespace-pre-line text-center">
          {item.title}
        </h3>
      </div>

      <div className="mt-auto flex justify-center items-center w-full pt-3">
        <Link
          href={item.link}
          className="inline-block bg-[#111111] text-white text-[11px] sm:text-[12px] lg:text-sm font-semibold px-5 py-2 rounded-full hover:bg-black transition-colors shadow-sm text-center"
        >
          {item.ctaText || 'Apply Now'}
        </Link>
      </div>
    </CardRoot>
  );
};

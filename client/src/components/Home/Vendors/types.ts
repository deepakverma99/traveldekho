import React from 'react';

export interface PartnerNetworkItem {
  id: string;
  title: string;
  link: string;
  ctaText?: string;
  icon: React.ReactNode;
}

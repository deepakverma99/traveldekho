'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { TripPartner } from './types';
import { colors } from '@/theme/colors';

interface TripPartnerCardProps {
  partner: TripPartner;
}

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: ${colors.gray[50]};
  border: 1px solid ${colors.gray[100]};
  padding: 0.75rem 1.25rem 0.75rem 0.75rem;
  border-radius: 1rem;
  width: fit-content;
  transition: background-color 0.15s ease;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);

  &:hover {
    background-color: ${colors.gray[100]}CC;
  }
`;

const PartnerLogoBox = styled.div`
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${colors.white};
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.gray[100]};
  overflow: hidden;
  flex-shrink: 0;

  img {
    object-fit: contain;
    padding: 0.375rem;
    transition: transform 0.2s ease;
  }

  ${CardContainer}:hover & img {
    transform: scale(1.05);
  }
`;

const ManagedByLabel = styled.p`
  font-size: 9px;
  font-weight: 900;
  color: ${colors.gray[400]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const PartnerName = styled.p`
  font-weight: 800;
  color: ${colors.gray[900]};
  font-size: 0.875rem;
  letter-spacing: -0.01em;
  text-transform: capitalize;
  transition: color 0.15s ease;

  ${CardContainer}:hover & {
    color: ${colors.amber[600]};
  }
`;

const VerifiedBadge = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: ${colors.green[50]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const TripPartnerCard: React.FC<TripPartnerCardProps> = ({ partner }) => {
  return (
    <section>
      <Link href={`/trip-partners/${partner.slug}`}>
        <CardContainer>
          <PartnerLogoBox>
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              sizes="40px"
            />
          </PartnerLogoBox>

          <div style={{ flex: '1', minWidth: 0 }}>
            <ManagedByLabel>Managed by</ManagedByLabel>
            <PartnerName>{partner.name}</PartnerName>
          </div>

          {partner.isVerified && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <VerifiedBadge title="Scout Verified Partner">
                <ShieldCheck
                  style={{
                    width: '1rem',
                    height: '1rem',
                    color: colors.green[600],
                  }}
                />
              </VerifiedBadge>
            </div>
          )}
        </CardContainer>
      </Link>
    </section>
  );
};

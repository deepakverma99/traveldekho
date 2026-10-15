'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { ChevronRight, Home } from 'lucide-react';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  font-family: ${typography.fonts.jakarta};

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

const List = styled.ol`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.375rem;

  @media (min-width: 640px) {
    gap: 0.5rem;
  }
`;

const Item = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;

  @media (min-width: 640px) {
    gap: 0.5rem;
  }
`;

const Separator = styled(ChevronRight)`
  width: 0.875rem;
  height: 0.875rem;
  color: ${colors.gray[400]};
  flex-shrink: 0;
  user-select: none;
`;

const CurrentPage = styled.span`
  font-weight: 700;
  color: ${colors.amber[600]};
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;

  svg {
    width: 0.875rem;
    height: 0.875rem;
    color: ${colors.amber[600]};
  }
`;

const BreadcrumbLink = styled(Link)`
  font-weight: 500;
  color: ${colors.gray[500]};
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  transition: color 0.2s ease;
  text-decoration: none;

  svg {
    width: 0.875rem;
    height: 0.875rem;
    color: ${colors.gray[400]};
    transition: color 0.2s ease;
  }

  &:hover {
    color: ${colors.amber[600]};

    svg {
      color: ${colors.amber[600]};
    }
  }
`;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = '',
  showHomeIcon = true,
}) => {
  return (
    <Nav aria-label="Breadcrumb" className={className}>
      <List>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHome = index === 0 && showHomeIcon;

          return (
            <Item key={index}>
              {index > 0 && <Separator aria-hidden="true" />}

              {isLast || !item.href ? (
                <CurrentPage aria-current="page">
                  {isHome && (item.icon || <Home />)}
                  <span>{item.label}</span>
                </CurrentPage>
              ) : (
                <BreadcrumbLink href={item.href}>
                  {isHome && (item.icon || <Home />)}
                  <span>{item.label}</span>
                </BreadcrumbLink>
              )}
            </Item>
          );
        })}
      </List>
    </Nav>
  );
};


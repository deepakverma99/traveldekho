import Link from 'next/link';
import styled from 'styled-components';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export const BookingsPageRoot = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  width: 100%;
  min-width: 0;
  padding: 0.875rem 0.625rem 3rem 0.625rem;
  font-family: ${typography.fonts.jakarta};

  @media (min-width: 480px) {
    padding: 1rem 0.75rem 3rem 0.75rem;
  }
  @media (min-width: 640px) {
    padding: 1.25rem 1rem 3.5rem 1rem;
  }
  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 4rem 1.5rem;
  }
`;

export const BannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1.25rem;
  width: 100%;
  min-width: 0;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    margin-bottom: 1.75rem;
  }
`;

export const BreadcrumbScroll = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  max-width: 100%;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Heading = styled.h1`
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 900;
  color: ${colors.gray[900]};
  letter-spacing: -0.025em;
  text-transform: uppercase;
  word-break: break-word;
`;

export const AmberText = styled.span`
  color: ${colors.amber[500]};
`;

export const SubtitleText = styled.p`
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  color: ${colors.gray[400]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0.25rem;
`;

/* Filter Card at the top */
export const FilterCard = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[200]};
  border-radius: 1.25rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1.75rem;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.03);

  @media (min-width: 640px) {
    padding: 0.875rem 1.25rem;
  }
`;

export const FilterInputsGrid = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.625rem;
  width: 100%;

  @media (min-width: 1200px) {
    flex-wrap: nowrap;
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1 1 200px;
  min-width: 180px;

  svg {
    position: absolute;
    left: 0.875rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    color: ${colors.gray[400]};
    pointer-events: none;
  }

  input {
    width: 100%;
    height: 2.5rem;
    padding: 0 0.875rem 0 2.375rem;
    background-color: ${colors.white};
    border: 1.5px solid ${colors.gray[200]};
    border-radius: 0.75rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: ${colors.gray[800]};
    transition: all 0.2s ease;

    &::placeholder {
      color: ${colors.gray[400]};
      font-weight: 500;
    }

    &:focus {
      outline: none;
      border-color: ${colors.amber[500]};
      box-shadow: 0 0 0 3px rgba(244, 140, 6, 0.15);
    }
  }
`;

export const FilterSelect = styled.select`
  height: 2.5rem;
  padding: 0 2rem 0 0.875rem;
  background-color: ${colors.white};
  border: 1.5px solid ${colors.gray[200]};
  border-radius: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${colors.gray[800]};
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.65rem center;
  background-size: 1rem;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${colors.amber[500]};
    box-shadow: 0 0 0 3px rgba(244, 140, 6, 0.15);
  }
`;

export const DateRangePill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  height: 2.5rem;
  padding: 0 0.75rem;
  background-color: ${colors.white};
  border: 1.5px solid ${colors.gray[200]};
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${colors.gray[700]};
  width: fit-content;
  flex-shrink: 0;

  input[type='date'] {
    border: none;
    background: transparent;
    font-size: 0.75rem;
    font-weight: 600;
    color: ${colors.gray[800]};
    outline: none;
    cursor: pointer;
    font-family: inherit;
  }

  span {
    color: ${colors.gray[400]};
    font-weight: 600;
    font-size: 0.75rem;
  }
`;

export const ResetFiltersButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  height: 2.5rem;
  padding: 0 0.75rem;
  background-color: #fffaf0;
  border: 1.5px solid #fed7aa;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #c2410c;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  white-space: nowrap;

  &:hover {
    background-color: #ffedd5;
    border-color: #fdba74;
    color: #9a3412;
  }

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
`;


/* Accordion Trip Group Card */
export const TripGroupCard = styled.div<{ $isOpen?: boolean }>`
  background-color: ${colors.white};
  border: 1px solid ${({ $isOpen }) => ($isOpen ? colors.amber[300] : colors.gray[200])};
  border-left: ${({ $isOpen }) => ($isOpen ? `4px solid ${colors.amber[500]}` : `1px solid ${colors.gray[200]}`)};
  border-radius: 1.25rem;
  overflow: hidden;
  margin-bottom: 1.25rem;
  box-shadow: ${({ $isOpen }) =>
    $isOpen
      ? '0 10px 25px -5px rgba(244, 140, 6, 0.08), 0 2px 6px rgba(0, 0, 0, 0.03)'
      : '0 2px 8px -2px rgba(0, 0, 0, 0.04)'};
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: ${colors.amber[400]};
    box-shadow: 0 8px 24px -4px rgba(244, 140, 6, 0.08);
  }
`;

export const TripGroupHeader = styled.div<{ $isOpen?: boolean }>`
  padding: 1.125rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
  cursor: pointer;
  background: ${({ $isOpen }) => ($isOpen ? 'linear-gradient(to right, #fffbf5, #ffffff)' : colors.white)};
  user-select: none;
  transition: background 0.2s ease;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1.25rem 1.5rem;
  }

  &:hover {
    background: #fffdfa;
  }
`;

export const TripInfoLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.125rem;
  min-width: 0;
  flex: 1 1 auto;
`;

export const TripThumbnail = styled.div`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 0.875rem;
  overflow: hidden;
  background-color: ${colors.gray[100]};
  border: 1px solid ${colors.gray[200]};
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);

  @media (min-width: 640px) {
    width: 5rem;
    height: 5rem;
    border-radius: 1rem;
  }
`;

export const TripThumbnailBadge = styled.span`
  position: absolute;
  bottom: 0.35rem;
  left: 0.35rem;
  padding: 0.15rem 0.4rem;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  color: ${colors.white};
  font-size: 0.625rem;
  font-weight: 800;
  border-radius: 0.375rem;
  letter-spacing: 0.02em;
  pointer-events: none;
`;

export const TripTitleArea = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  h2 {
    font-size: 1.0625rem;
    font-weight: 900;
    color: ${colors.gray[900]};
    line-height: 1.25;
    letter-spacing: -0.015em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 640px) {
      font-size: 1.1875rem;
    }
  }
`;

export const TripMetaTagsRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.75rem;

  span.dot {
    color: ${colors.gray[300]};
    font-weight: 700;
  }
`;

export const TripMetaTag = styled.span<{ $highlight?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 700;
  color: ${({ $highlight }) => ($highlight ? colors.amber[800] : colors.gray[600])};
  background-color: ${({ $highlight }) => ($highlight ? colors.amber[50] : 'transparent')};
  padding: ${({ $highlight }) => ($highlight ? '0.15rem 0.5rem' : '0')};
  border-radius: 0.375rem;
  border: ${({ $highlight }) => ($highlight ? `1px solid ${colors.amber[200]}` : 'none')};
`;

export const TripCenterProgress = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  min-width: 13rem;
  max-width: 17rem;
  width: 100%;
  padding: 0 0.5rem;

  @media (min-width: 1200px) {
    display: flex;
  }
`;

export const ProgressHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.6875rem;
  font-weight: 700;
  margin-bottom: 0.35rem;

  span.title {
    color: ${colors.gray[400]};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  span.stats {
    color: ${colors.gray[800]};
  }
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 0.375rem;
  background-color: ${colors.gray[100]};
  border-radius: 9999px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => Math.min(100, Math.max(0, $percent))}%;
  background: linear-gradient(to right, #10b981, #059669);
  border-radius: 9999px;
  transition: width 0.4s ease;
`;

export const TripStatsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex-wrap: wrap;
  flex-shrink: 0;

  @media (min-width: 640px) {
    gap: 0.875rem;
  }
`;

export const MetricCardlet = styled.div<{ $variant?: 'green' | 'amber' | 'neutral' | 'default' }>`
  display: flex;
  flex-direction: column;
  padding: 0.45rem 0.75rem;
  border-radius: 0.75rem;
  min-width: 4.75rem;
  transition: all 0.2s ease;

  ${({ $variant }) => {
    switch ($variant) {
      case 'green':
        return `
          background-color: #f0fdf4;
          border: 1px solid #bbf7d0;
          span.label { color: #15803d; }
          span.value { color: #166534; font-weight: 900; }
        `;
      case 'amber':
        return `
          background-color: #fff8ec;
          border: 1px solid #fed7a1;
          span.label { color: #b45309; }
          span.value { color: #9a3412; font-weight: 900; }
        `;
      case 'neutral':
        return `
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          span.label { color: #6b7280; }
          span.value { color: #374151; font-weight: 800; }
        `;
      default:
        return `
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          span.label { color: #6b7280; }
          span.value { color: #111827; font-weight: 900; }
        `;
    }
  }}

  span.label {
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    line-height: 1;
    margin-bottom: 0.2rem;
  }

  span.value {
    font-size: 0.9375rem;
    letter-spacing: -0.01em;
    line-height: 1.2;

    @media (min-width: 640px) {
      font-size: 1.0625rem;
    }
  }
`;

export const ChevronToggleButton = styled.button<{ $isOpen: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  height: 2.25rem;
  padding: 0 0.75rem;
  border-radius: 0.625rem;
  background-color: ${({ $isOpen }) => ($isOpen ? colors.amber[500] : colors.amber[50])};
  color: ${({ $isOpen }) => ($isOpen ? colors.white : colors.amber[800])};
  border: 1px solid ${({ $isOpen }) => ($isOpen ? colors.amber[600] : colors.amber[200])};
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 800;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: ${({ $isOpen }) => ($isOpen ? '0 2px 8px rgba(244, 140, 6, 0.3)' : 'none')};

  &:hover {
    background-color: ${({ $isOpen }) => ($isOpen ? colors.amber[600] : colors.amber[100])};
    color: ${({ $isOpen }) => ($isOpen ? colors.white : colors.amber[900])};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.97);
  }

  svg.chevron-icon {
    transition: transform 0.25s ease;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

export const ManifestHeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #fae8d4;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const StatBlock = styled.div<{ $colorVariant?: 'green' | 'amber' | 'default' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  span.label {
    font-size: 0.6875rem;
    font-weight: 600;
    color: ${colors.gray[400]};
    text-transform: capitalize;
  }

  span.value {
    font-size: 0.9375rem;
    font-weight: 800;
    margin-top: 0.1rem;
    color: ${({ $colorVariant }) =>
      $colorVariant === 'green'
        ? colors.green[600]
        : $colorVariant === 'amber'
        ? colors.amber[500]
        : colors.gray[800]};
  }
`;

export const ChevronCircleButton = styled.button<{ $isOpen: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: ${colors.gray[100]};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.gray[600]};
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background-color: ${colors.amber[100]};
    color: ${colors.amber[800]};
  }

  svg {
    width: 1.125rem;
    height: 1.125rem;
    transition: transform 0.25s ease;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
  }
`;

/* Bookings List Area inside Accordion */
export const BookingsListWrapper = styled.div`
  padding: 0.75rem 1rem 1.25rem 1rem;
  background-color: #faf8f5;
  border-top: 1px solid ${colors.gray[200]};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 640px) {
    padding: 1rem 1.25rem 1.5rem 1.25rem;
    gap: 0.875rem;
  }
`;

/* Individual Booking Card matching user screenshot */
export const BookingCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #fae8d4;
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  &:hover {
    border-color: ${colors.amber[300]};
    box-shadow: 0 4px 12px rgba(244, 140, 6, 0.08);
  }
`;

export const TravelerDetailsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
`;

export const TravelerAvatar = styled.div`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, ${colors.amber[400]}, ${colors.amber[500]});
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.black};
  font-weight: 900;
  font-size: 0.875rem;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(244, 140, 6, 0.2);
`;

export const TravelerTextMeta = styled.div`
  min-width: 0;

  h3 {
    font-size: 0.9375rem;
    font-weight: 900;
    color: ${colors.gray[900]};
    text-transform: uppercase;
    letter-spacing: 0.02em;
    line-height: 1.2;
  }

  p.phone {
    font-size: 0.8125rem;
    font-weight: 700;
    color: ${colors.gray[700]};
    margin-top: 0.15rem;
  }

  p.email {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: ${colors.gray[400]};
    margin-top: 0.1rem;
    word-break: break-all;
  }

  p.details {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.6875rem;
    font-weight: 800;
    color: ${colors.gray[600]};
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-top: 0.25rem;
  }
`;

export const BookingActionsRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    justify-content: flex-end;
    gap: 1.25rem;
  }
`;

export const AmountBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 768px) {
    align-items: flex-end;
  }

  span.label {
    font-size: 0.625rem;
    font-weight: 800;
    color: ${colors.gray[400]};
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  span.value {
    font-size: 1.0625rem;
    font-weight: 900;
    color: ${colors.gray[900]};
    line-height: 1.2;
  }
`;

export const StatusPillArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 5.5rem;

  span.badge {
    background-color: #d1fae5;
    color: #065f46;
    font-size: 0.6875rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.3rem 0.85rem;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  span.date {
    font-size: 0.625rem;
    font-weight: 700;
    color: ${colors.gray[400]};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 0.25rem;
  }
`;

export const MarkPaidButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.875rem;
  background-color: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 800;
  color: #047857;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #d1fae5;
    border-color: #6ee7b7;
    transform: translateY(-1px);
  }
`;

export const PaidBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.875rem;
  background-color: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 800;
  color: #047857;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const ActionIconButton = styled.button<{ $variant?: 'danger' | 'default' }>`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ $variant }) => ($variant === 'danger' ? '#fecdd3' : colors.gray[200])};
  background-color: ${colors.white};
  color: ${({ $variant }) => ($variant === 'danger' ? '#f43f5e' : colors.gray[400])};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $variant }) => ($variant === 'danger' ? '#ffe4e6' : colors.gray[50])};
    color: ${({ $variant }) => ($variant === 'danger' ? '#e11d48' : colors.gray[700])};
    border-color: ${({ $variant }) => ($variant === 'danger' ? '#fda4af' : colors.gray[300])};
  }

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
`;

export const ActionIconLink = styled(Link)<{ $variant?: 'danger' | 'default' }>`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ $variant }) => ($variant === 'danger' ? '#fecdd3' : colors.gray[200])};
  background-color: ${colors.white};
  color: ${({ $variant }) => ($variant === 'danger' ? '#f43f5e' : colors.gray[400])};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $variant }) => ($variant === 'danger' ? '#ffe4e6' : colors.gray[50])};
    color: ${({ $variant }) => ($variant === 'danger' ? '#e11d48' : colors.gray[700])};
    border-color: ${({ $variant }) => ($variant === 'danger' ? '#fda4af' : colors.gray[300])};
  }

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
`;

export const EmptyBookingsState = styled.div`
  background-color: ${colors.white};
  border: 1.5px dashed ${colors.gray[300]};
  border-radius: 1.25rem;
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 1rem;

  h3 {
    font-size: 1.125rem;
    font-weight: 800;
    color: ${colors.gray[900]};
    margin-top: 0.75rem;
  }

  p {
    font-size: 0.8125rem;
    color: ${colors.gray[500]};
    margin-top: 0.25rem;
    max-width: 22rem;
  }
`;

export const ExportButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${colors.white};
  color: ${colors.gray[800]};
  border-radius: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  font-family: ${typography.fonts.jakarta};
  border: 1.5px solid ${colors.gray[200]};
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  width: 100%;

  @media (min-width: 640px) {
    width: auto;
  }

  svg {
    width: 0.9375rem;
    height: 0.9375rem;
    color: ${colors.amber[500]};
    stroke-width: 2.25px;
  }

  &:hover {
    background-color: #fffaf0;
    color: ${colors.amber[700]};
    border-color: ${colors.amber[400]};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(244, 140, 6, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;


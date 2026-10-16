'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  Plus,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  SearchBar,
  Select,
} from '@/components/shared';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { TripPartnerTripCard } from './TripPartnerTripCard';
import {
  type TripPartnerMyTripsProps,
  type PartnerTripItem,
} from './types/';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectFilteredPartnerTrips,
  selectTripsSearchQuery,
  selectTripsStatusFilter,
  selectTripsCategoryFilter,
  selectTripsDifficultyFilter,
  selectTripsSortBy,
  selectTripsToastMessage,
  setTripsSearchQuery,
  setTripsStatusFilter,
  setTripsCategoryFilter,
  setTripsDifficultyFilter,
  setTripsSortBy,
  resetTripsFilters,
  setTripsToastMessage,
  deletePartnerTrip,
  archivePartnerTrip,
  editPartnerTrip,
  copyPartnerTripDetails,
} from '@/redux/slices/tripPartnerSlice';

export type { TripPartnerMyTripsProps };

const PageRoot = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  width: 100%;
  min-width: 0;
  padding: 1.25rem 0.875rem 2.5rem 0.875rem;

  @media (min-width: 640px) {
    padding: 1.5rem 1.25rem 2.5rem 1.25rem;
  }
  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 3rem 1.5rem;
  }
`;

const BannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1.25rem;
  width: 100%;
  min-width: 0;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    margin-bottom: 1.75rem;
    gap: 1.5rem;
  }
`;

const Heading = styled.h1`
  font-size: 1.375rem;
  font-weight: 900;
  color: ${colors.gray[900]};
  letter-spacing: -0.025em;
  word-break: break-word;

  @media (min-width: 480px) {
    font-size: 1.625rem;
  }
  @media (min-width: 640px) {
    font-size: 1.875rem;
  }
  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

const AmberText = styled.span`
  color: ${colors.amber[500]};
`;

const SubtitleText = styled.p`
  color: ${colors.gray[500]};
  font-weight: 600;
  letter-spacing: -0.01em;
  font-size: 0.875rem;
`;

/* Search, Filters & Export Container */
const FilterBarCard = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[200]};
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02);

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
`;


const ExportButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5625rem 1.125rem;
  background-color: #0b132b;
  color: ${colors.amber[400]};
  border-radius: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  font-family: ${typography.fonts.jakarta};
  border: 1px solid rgba(251, 191, 36, 0.2);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  svg {
    width: 0.9375rem;
    height: 0.9375rem;
    stroke-width: 2.25px;
  }

  &:hover {
    background-color: #1c2541;
    color: ${colors.amber[300]};
    border-color: rgba(251, 191, 36, 0.4);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(11, 19, 43, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

/* Trips Grid */
const TripsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 0.875rem;
  width: 100%;
  min-width: 0;

  @media (min-width: 400px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
  }

  @media (min-width: 1120px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.25rem;
  }
`;

const EmptyContainer = styled.div`
  background-color: ${colors.white};
  border: 1px dashed ${colors.gray[300]};
  border-radius: 1.25rem;
  padding: 3.5rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const ToastMessage = styled.div<{ $variant?: 'success' | 'info' }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 1.25rem;
  background-color: #0b132b;
  color: ${colors.white};
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25);
  font-size: 0.8125rem;
  font-weight: 700;
  font-family: ${typography.fonts.jakarta};
  animation: slideIn 0.25s ease-out;

  svg {
    width: 1rem;
    height: 1rem;
    color: ${colors.amber[400]};
    flex-shrink: 0;
  }
`;

export const TripPartnerMyTrips: React.FC<TripPartnerMyTripsProps> = ({ username }) => {
  const dispatch = useAppDispatch();

  // Redux Selectors replacing local useState hooks
  const filteredTrips = useAppSelector(selectFilteredPartnerTrips);
  const searchQuery = useAppSelector(selectTripsSearchQuery);
  const statusFilter = useAppSelector(selectTripsStatusFilter);
  const categoryFilter = useAppSelector(selectTripsCategoryFilter);
  const difficultyFilter = useAppSelector(selectTripsDifficultyFilter);
  const sortBy = useAppSelector(selectTripsSortBy);
  const toastText = useAppSelector(selectTripsToastMessage);

  // Auto-dismiss toast timer
  useEffect(() => {
    if (!toastText) return;
    const timer = setTimeout(() => {
      dispatch(setTripsToastMessage(null));
    }, 2800);
    return () => clearTimeout(timer);
  }, [toastText, dispatch]);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Trip Partner', href: `/trip-partner/${username}/dashboard` },
    { label: 'My Trips' },
  ];

  /* Actions for 3-dot menu */
  const handleEdit = (trip: PartnerTripItem) => {
    dispatch(editPartnerTrip(trip));
  };

  const handleDelete = (tripId: string) => {
    dispatch(deletePartnerTrip(tripId));
  };

  const handleCopyDetails = (trip: PartnerTripItem) => {
    dispatch(copyPartnerTripDetails(trip));
  };

  const handleArchive = (tripId: string) => {
    dispatch(archivePartnerTrip(tripId));
  };

  /* Export CSV action */
  const handleExport = () => {
    const headers = [
      'ID',
      'Title',
      'Destination',
      'Status',
      'Duration',
      'Price (INR)',
      'Bookings',
      'Category',
      'Difficulty',
      'Departure Date',
    ];

    const rows = filteredTrips.map((t) => [
      t.id,
      `"${t.title.replace(/"/g, '""')}"`,
      `"${t.destination}"`,
      t.status,
      `"${t.duration}"`,
      t.price,
      t.bookingsCount,
      `"${t.category}"`,
      `"${t.difficulty}"`,
      `"${t.date}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `trips-export-${username}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    dispatch(setTripsToastMessage(`Exported ${filteredTrips.length} trips to CSV!`));
  };

  const handleResetFilters = () => {
    dispatch(resetTripsFilters());
  };

  return (
    <PageRoot>
      {/* Top Banner / Welcome Header */}
      <BannerWrapper>
        <div className="space-y-2">
          <Breadcrumb items={breadcrumbItems} />

          <Heading>
            My <AmberText>Trips</AmberText>
          </Heading>
          <SubtitleText>
            Manage and track all your Active Trips, Upcoming Departures, and Published Itineraries
          </SubtitleText>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/trip-partner/${username}/trips/new`}>
            <Button
              leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
              showArrow={false}
              size="lg"
            >
              Post New Trip
            </Button>
          </Link>
        </div>
      </BannerWrapper>

      {/* Search, Filters, and Export Bar (Matching User Screenshot) */}
      <FilterBarCard>
        <FilterGroup>
          {/* Search Input using shared SearchBar */}
          <SearchBar
            variant="filter"
            placeholder="Search by title or destination..."
            value={searchQuery}
            onChange={(e) => dispatch(setTripsSearchQuery(e.target.value))}
            onClear={() => dispatch(setTripsSearchQuery(''))}
            aria-label="Search trips"
          />

          {/* Status Filter */}
          <Select
            aria-label="Filter by Status"
            value={statusFilter}
            onChange={(e) => dispatch(setTripsStatusFilter(e.target.value))}
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Pending">Pending</option>
            <option value="Draft">Draft</option>
          </Select>

          {/* Categories Filter */}
          <Select
            aria-label="Filter by Category"
            value={categoryFilter}
            onChange={(e) => dispatch(setTripsCategoryFilter(e.target.value))}
          >
            <option value="All">All Categories</option>
            <option value="Trekking">Trekking</option>
            <option value="Weekend Gateway">Weekend Gateway</option>
            <option value="Adventure">Adventure</option>
            <option value="Heritage">Heritage</option>
            <option value="Offbeat">Offbeat</option>
          </Select>

          {/* Difficulties Filter */}
          <Select
            aria-label="Filter by Difficulty"
            value={difficultyFilter}
            onChange={(e) => dispatch(setTripsDifficultyFilter(e.target.value))}
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Difficult">Difficult</option>
            <option value="Challenging">Challenging</option>
          </Select>

          {/* Sort By Filter */}
          <Select
            aria-label="Sort Trips"
            value={sortBy}
            onChange={(e) => dispatch(setTripsSortBy(e.target.value))}
          >
            <option value="newest">Sort by Newest</option>
            <option value="oldest">Sort by Oldest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="bookings">Most Booked</option>
          </Select>
        </FilterGroup>

        {/* Export Button */}
        <ExportButton type="button" onClick={handleExport}>
          <Download />
          <span>Export</span>
        </ExportButton>
      </FilterBarCard>

      {/* Trips Grid */}
      {filteredTrips.length > 0 ? (
        <TripsGrid>
          {filteredTrips.map((trip, idx) => (
            <TripPartnerTripCard
              key={trip.id}
              trip={trip}
              priority={idx < 3}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCopyDetails={handleCopyDetails}
              onArchive={handleArchive}
            />
          ))}
        </TripsGrid>
      ) : (
        <EmptyContainer>
          <div
            style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '9999px',
              backgroundColor: colors.amber[50],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.amber[600],
            }}
          >
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <h4
              style={{
                fontSize: '1.125rem',
                fontWeight: 800,
                color: colors.gray[900],
                marginBottom: '0.25rem',
              }}
            >
              No trips match your filters
            </h4>
            <p
              style={{
                fontSize: '0.8125rem',
                color: colors.gray[500],
                fontWeight: 500,
              }}
            >
              Try adjusting your search query, status, or category filters.
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.5rem 1rem',
              backgroundColor: colors.gray[900],
              color: colors.white,
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        </EmptyContainer>
      )}

      {/* Toast Notification */}
      {toastText && (
        <ToastMessage>
          <CheckCircle2 />
          <span>{toastText}</span>
        </ToastMessage>
      )}
    </PageRoot>
  );
};

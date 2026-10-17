'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  ArrowUpRight,
  IndianRupee,
  DollarSign,
  Users,
  Layers,
  Star,
  TrendingUp,
  ChevronRight,
  Bell,
  Plus,
} from 'lucide-react';
import { Button, Breadcrumb, BreadcrumbItem } from '@/components/shared';
import { colors } from '@/theme/colors';
import { TripPartnerBookingChart } from './TripPartnerBookingChart';
import { TripPartnerStatCard } from './TripPartnerStatCard';
import { useAppSelector } from '@/redux/hooks';
import {
  selectPartnerStats,
  selectPartnerBookings,
  selectPartnerNotifications,
  selectCurrentPartner,
} from '@/redux/slices/tripPartnerSlice';

import { type TripPartnerDashboardProps } from './types/';

export type { TripPartnerDashboardProps };

const DashboardRoot = styled.div`
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
  margin-bottom: 1.25rem;
  gap: 1.25rem;
  width: 100%;
  min-width: 0;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    margin-bottom: 1.5rem;
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
  text-transform: uppercase;
`;

const SubtitleText = styled.p`
  color: ${colors.gray[500]};
  font-weight: 400;
  letter-spacing: -0.01em;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;


const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  width: 100%;
  min-width: 0;

  @media (min-width: 640px) {
    gap: 1.25rem;
  }

  @media (min-width: 1120px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
  width: 100%;
  min-width: 0;

  @media (min-width: 1120px) {
    grid-template-columns: 1.8fr 1.2fr;
    gap: 1.5rem;
    align-items: stretch;
  }
`;

const BookingsCard = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[200]};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02);
  transition: all 0.25s ease;
  margin-bottom: 2.5rem;
  width: 100%;
  min-width: 0;

  &:hover {
    box-shadow: 0 10px 25px -5px ${colors.amber[100]}80, 0 8px 10px -6px rgba(0, 0, 0, 0.04);
    border-color: ${colors.amber[200]};
  }
`;

const CardHeader = styled.div`
  padding: 1.125rem 1.25rem;
  border-bottom: 1px solid ${colors.gray[50]};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 640px) {
    padding: 1.5rem 2rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 900;
  color: ${colors.gray[900]};
  text-transform: uppercase;
  letter-spacing: -0.025em;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 640px) {
    font-size: 1.25rem;
    gap: 0.75rem;
  }

  svg {
    color: ${colors.amber[500]};
    width: 1.25rem;
    height: 1.25rem;

    @media (min-width: 640px) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

const ViewAllLink = styled(Link)`
  font-size: 0.75rem;
  font-weight: 900;
  color: ${colors.amber[600]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  min-width: 520px;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: ${colors.gray[50]}80;
`;

const TableHeaderCell = styled.th<{ $alignRight?: boolean }>`
  padding: 1rem 1rem;
  text-align: ${({ $alignRight }) => ($alignRight ? 'right' : 'left')};
  font-size: 10px;
  font-weight: 900;
  color: ${colors.gray[400]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;

  @media (min-width: 640px) {
    padding: 1.25rem 1.5rem;
  }
  @media (min-width: 768px) {
    padding: 1.25rem 2rem;
  }
`;

const TableBody = styled.tbody`
  & > tr + tr {
    border-top: 1px solid ${colors.gray[50]};
  }
`;

const TableRow = styled.tr`
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.gray[50]}80;
  }
`;

const TableCell = styled.td<{ $alignRight?: boolean }>`
  padding: 1rem 1rem;
  text-align: ${({ $alignRight }) => ($alignRight ? 'right' : 'left')};

  @media (min-width: 640px) {
    padding: 1.25rem 1.5rem;
  }
  @media (min-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

const StatusPill = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background-color: ${colors.green[100]};
  color: ${colors.green[600]};
  white-space: nowrap;
`;

const NotificationsCard = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[200]};
  border-radius: 1rem;
  padding: 1.125rem 1.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 440px;
  min-width: 0;
  transition: all 0.25s ease;

  &:hover {
    box-shadow: 0 10px 25px -5px ${colors.amber[100]}80, 0 8px 10px -6px rgba(0, 0, 0, 0.04);
    border-color: ${colors.amber[200]};
  }

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

const NotificationsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const NotificationsTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 900;
  color: ${colors.gray[900]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${colors.amber[500]};
  }
`;

const NewBadge = styled.span`
  background-color: ${colors.amber[100]};
  color: ${colors.amber[600]};
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.1em;
  margin-left: 0.5rem;
`;

const NotifList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
  padding-right: 0.5rem;
  flex: 1;
  margin-right: -0.5rem;

  &::-webkit-scrollbar {
    width: 0.375rem;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.gray[200]};
    border-radius: 9999px;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: ${colors.gray[300]};
  }
`;

const NotifItem = styled(Link)`
  display: flex;
  gap: 0.875rem;
  padding: 0.875rem 1rem;
  border-radius: 0.875rem;
  cursor: pointer;
  border: 1px solid ${colors.amber[100]}80;
  background-color: ${colors.amber[50]}66;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.amber[50]};
    border-color: ${colors.amber[200]};
  }
`;

const NotifIconBox = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: ${colors.amber[50]};
  color: ${colors.amber[600]};
  border: 1px solid ${colors.amber[200]}80;
`;

const NotifUnreadDot = styled.div`
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  width: 0.875rem;
  height: 0.875rem;
  background-color: ${colors.amber[500]};
  border-radius: 9999px;
  border: 3px solid ${colors.white};
`;

const ViewAllNotifBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.875rem;
  border-radius: 1rem;
  background-color: ${colors.gray[50]};
  font-size: 10px;
  font-weight: 900;
  color: ${colors.gray[900]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: all 0.2s ease;

  svg {
    color: ${colors.amber[500]};
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: ${colors.amber[50]};
    color: ${colors.amber[600]};

    svg {
      transform: scale(1.1);
    }
  }
`;

export const TripPartnerDashboard: React.FC<TripPartnerDashboardProps> = ({
  username,
  displayName,
}) => {
  const stats = useAppSelector(selectPartnerStats);
  const bookings = useAppSelector(selectPartnerBookings);
  const notifications = useAppSelector(selectPartnerNotifications);
  const currentPartner = useAppSelector(selectCurrentPartner);

  const effectiveDisplayName = currentPartner?.displayName || displayName || username;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Trip Partner', href: `/trip-partner/${username}/dashboard` },
    { label: 'Dashboard' },
  ];

  return (
    <DashboardRoot>
      {/* Top Banner / Welcome Header */}
      <BannerWrapper>
        <div>
          <Breadcrumb items={breadcrumbItems} />

          <div className="mt-2">
            <Heading>
              Hello, <AmberText>{effectiveDisplayName}!</AmberText>
            </Heading>
            <SubtitleText>
              Manage your trips and track your growth
            </SubtitleText>
          </div>
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

      {/* 4 Stat Cards */}
      <StatsGrid>
        <TripPartnerStatCard
          label="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          trend={{ percentage: 12, text: 'since last month', isPositive: true }}
          icon={IndianRupee}
        />
        <TripPartnerStatCard
          label="Total Bookings"
          value={stats.totalBookings}
          trend={{ percentage: 8, text: 'since last month', isPositive: true }}
          icon={Users}
        />
        <TripPartnerStatCard
          label="Active Trips"
          value={stats.activeTrips}
          trend={{ percentage: 24, text: 'since last month', isPositive: true }}
          icon={Layers}
        />
        <TripPartnerStatCard
          label="Avg Rating"
          value={stats.avgRating}
          trend={{ percentage: 5, text: 'since last month', isPositive: false }}
          icon={Star}
        />
      </StatsGrid>

      {/* Analytics Section: Booking Volume Chart (Left) & Notifications (Right) */}
      <AnalyticsGrid>
        {/* Booking Volume Chart */}
        <TripPartnerBookingChart />

        {/* Notifications Card (Right of Graph) */}
        <NotificationsCard>
          <NotificationsHeader>
            <NotificationsTitle>
              <Bell className="w-5 h-5" /> Notifications
              {unreadCount > 0 && <NewBadge>{unreadCount} NEW</NewBadge>}
            </NotificationsTitle>
          </NotificationsHeader>

          <NotifList>
            {notifications.map((notif) => (
              <NotifItem
                key={notif.id}
                href={`/trip-partner/${username}/notifications`}
              >
                <div className="flex-shrink-0 relative mt-1">
                  <NotifIconBox>
                    <DollarSign className="w-4 h-4" />
                  </NotifIconBox>
                  <NotifUnreadDot className="animate-pulse" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <p
                      className="text-[11px] uppercase tracking-wider truncate font-black"
                      style={{ color: colors.gray[900] }}
                    >
                      {notif.title}
                    </p>
                    <span
                      className="text-[9px] font-bold whitespace-nowrap uppercase mt-0.5"
                      style={{ color: colors.gray[400] }}
                    >
                      {notif.date}
                    </span>
                  </div>
                  <p
                    className="text-xs leading-relaxed line-clamp-2 font-bold"
                    style={{ color: colors.gray[600] }}
                  >
                    {notif.description}
                  </p>
                </div>
              </NotifItem>
            ))}
          </NotifList>

          <div
            className="pt-4 mt-2"
            style={{ borderTop: `1px solid ${colors.gray[50]}` }}
          >
            <ViewAllNotifBtn href={`/trip-partner/${username}/notifications`}>
              <span>View All Notifications</span>
              <ArrowUpRight className="w-4 h-4" />
            </ViewAllNotifBtn>
          </div>
        </NotificationsCard>
      </AnalyticsGrid>

      {/* Full-width Recent Bookings Table */}
      <BookingsCard>
        <CardHeader>
          <CardTitle>
            <TrendingUp className="w-6 h-6" /> Recent Bookings
          </CardTitle>
          <ViewAllLink href={`/trip-partner/${username}/bookings`}>
            <span>View All</span> <ChevronRight className="w-4 h-4" />
          </ViewAllLink>
        </CardHeader>

        <TableWrapper>
          <Table>
            <TableHead>
              <tr>
                <TableHeaderCell>Traveler</TableHeaderCell>
                <TableHeaderCell>Trip</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell $alignRight>Amount</TableHeaderCell>
              </tr>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span
                        className="text-sm font-black uppercase leading-none"
                        style={{ color: colors.gray[900] }}
                      >
                        {booking.travelerName}
                      </span>
                      <span
                        className="text-[10px] font-bold mt-1"
                        style={{ color: colors.gray[400] }}
                      >
                        {booking.travelerEmail}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className="text-sm font-bold"
                      style={{ color: colors.gray[600] }}
                    >
                      {booking.tripTitle}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusPill>
                      {booking.status}
                    </StatusPill>
                  </TableCell>
                  <TableCell $alignRight>
                    <span
                      className="text-sm font-black"
                      style={{ color: colors.gray[900] }}
                    >
                      ₹{booking.amount.toLocaleString()}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </BookingsCard>
    </DashboardRoot>
  );
};


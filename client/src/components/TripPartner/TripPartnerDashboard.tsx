'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  Activity,
  ArrowUpRight,
  DollarSign,
  Users,
  Layers,
  Star,
  TrendingUp,
  ChevronRight,
  Bell,
} from 'lucide-react';
import { colors } from '@/theme/colors';
import { TripPartnerBookingChart } from './TripPartnerBookingChart';
import {
  MOCK_PARTNER_BOOKINGS,
  MOCK_PARTNER_NOTIFICATIONS,
  MOCK_PARTNER_STATS,
} from './utils/partnerAuth';

export interface TripPartnerDashboardProps {
  username: string;
  displayName: string;
}

const DashboardRoot = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (min-width: 640px) {
    padding: 2rem 1.5rem;
  }
  @media (min-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const BannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const PortalBadge = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: ${colors.amber[400]};
  color: ${colors.black};
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 9999px;
`;

const SystemLiveBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 10px;
  font-weight: 900;
  color: ${colors.green[600]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: 900;
  color: ${colors.gray[900]};
  letter-spacing: -0.025em;
  text-transform: uppercase;

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
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75rem;
`;

const PostTripButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 3.5rem;
  padding: 0.625rem 2rem;
  background-color: ${colors.amber[400]};
  color: ${colors.black};
  border-radius: 9999px;
  border: none;
  font-weight: 900;
  font-size: 1rem;
  white-space: nowrap;
  box-shadow: 0 20px 25px -5px ${colors.amber[200]}99;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.amber[500]};
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 2.5rem;

  @media (min-width: 768px) {
    margin-bottom: 3rem;
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const StatCard = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[100]};
  border-radius: 32px;
  padding: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px ${colors.amber[100]}80;
    border-color: ${colors.amber[200]};
  }

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

const StatIconBox = styled.div<{ $bg: string; $color: string }>`
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: transform 0.5s ease;

  ${StatCard}:hover & {
    transform: scale(1.1);
  }
`;

const StatLabel = styled.p`
  font-size: 10px;
  font-weight: 900;
  color: ${colors.gray[400]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.25rem;
`;

const StatValue = styled.h3`
  font-size: 1.5rem;
  font-weight: 900;
  color: ${colors.gray[900]};
  letter-spacing: -0.05em;

  @media (min-width: 640px) {
    font-size: 1.875rem;
  }
`;

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2.5rem;
  }
`;

const BookingsCard = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[100]};
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 1024px) {
    grid-column: span 2 / span 2;
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${colors.gray[50]};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 900;
  color: ${colors.gray[900]};
  text-transform: uppercase;
  letter-spacing: -0.025em;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: ${colors.amber[500]};
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
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: ${colors.gray[50]}80;
`;

const TableHeaderCell = styled.th<{ $alignRight?: boolean }>`
  padding: 1.25rem 1.5rem;
  text-align: ${({ $alignRight }) => ($alignRight ? 'right' : 'left')};
  font-size: 10px;
  font-weight: 900;
  color: ${colors.gray[400]};
  text-transform: uppercase;
  letter-spacing: 0.1em;

  @media (min-width: 640px) {
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
  padding: 1.5rem;
  text-align: ${({ $alignRight }) => ($alignRight ? 'right' : 'left')};

  @media (min-width: 640px) {
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
`;

const NotificationsCard = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[100]};
  border-radius: 40px;
  padding: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 500px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 640px) {
    padding: 2rem;
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
  gap: 1rem;
  padding: 1rem;
  border-radius: 1.5rem;
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
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: ${colors.green[50]};
  color: ${colors.green[500]};
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
  return (
    <DashboardRoot>
      {/* Top Banner / Welcome Header */}
      <BannerWrapper>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <PortalBadge>
              Trip Partner Portal
            </PortalBadge>
            <SystemLiveBadge>
              <Activity className="w-3 h-3" /> System Live
            </SystemLiveBadge>
          </div>

          <Heading>
            Hello, <AmberText>{displayName}!</AmberText>
          </Heading>
          <SubtitleText>
            Manage your trips and track your growth
          </SubtitleText>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/trip-partner/${username}/trips/new`}>
            <PostTripButton>
              <span>Post New Trip</span>
              <ArrowUpRight className="w-5 h-5" />
            </PostTripButton>
          </Link>
        </div>
      </BannerWrapper>

      {/* 4 Stat Cards */}
      <StatsGrid>
        {/* Total Revenue */}
        <StatCard>
          <StatIconBox $bg={colors.green[100]} $color={colors.green[600]}>
            <DollarSign className="w-6 h-6" />
          </StatIconBox>
          <StatLabel>
            Total Revenue
          </StatLabel>
          <StatValue>
            ₹{MOCK_PARTNER_STATS.totalRevenue.toLocaleString()}
          </StatValue>
        </StatCard>

        {/* Total Bookings */}
        <StatCard>
          <StatIconBox $bg={colors.blue[100]} $color={colors.blue[600]}>
            <Users className="w-6 h-6" />
          </StatIconBox>
          <StatLabel>
            Total Bookings
          </StatLabel>
          <StatValue>
            {MOCK_PARTNER_STATS.totalBookings}
          </StatValue>
        </StatCard>

        {/* Active Trips */}
        <StatCard>
          <StatIconBox $bg={colors.amber[100]} $color={colors.amber[600]}>
            <Layers className="w-6 h-6" />
          </StatIconBox>
          <StatLabel>
            Active Trips
          </StatLabel>
          <StatValue>
            {MOCK_PARTNER_STATS.activeTrips}
          </StatValue>
        </StatCard>

        {/* Avg Rating */}
        <StatCard>
          <StatIconBox $bg={colors.purple[100]} $color={colors.purple[600]}>
            <Star className="w-6 h-6" />
          </StatIconBox>
          <StatLabel>
            Avg Rating
          </StatLabel>
          <StatValue>
            {MOCK_PARTNER_STATS.avgRating}
          </StatValue>
        </StatCard>
      </StatsGrid>

      {/* Booking Volume Chart */}
      <TripPartnerBookingChart />

      {/* 2 Columns: Recent Bookings & Notifications */}
      <BottomGrid>
        {/* Recent Bookings Table (2 cols) */}
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
                {MOCK_PARTNER_BOOKINGS.map((booking) => (
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

        {/* Notifications Card (1 col) */}
        <div>
          <NotificationsCard>
            <NotificationsHeader>
              <NotificationsTitle>
                <Bell className="w-5 h-5" /> Notifications
                <NewBadge>5 NEW</NewBadge>
              </NotificationsTitle>
            </NotificationsHeader>

            <NotifList>
              {MOCK_PARTNER_NOTIFICATIONS.map((notif) => (
                <NotifItem
                  key={notif.id}
                  href={`/trip-partner/${username}/notifications`}
                >
                  <div className="flex-shrink-0 relative mt-1">
                    <NotifIconBox>
                      <DollarSign className="w-5 h-5" />
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
              className="pt-6 mt-2"
              style={{ borderTop: `1px solid ${colors.gray[50]}` }}
            >
              <ViewAllNotifBtn href={`/trip-partner/${username}/notifications`}>
                <span>View All Notifications</span>
                <ArrowUpRight className="w-4 h-4" />
              </ViewAllNotifBtn>
            </div>
          </NotificationsCard>
        </div>
      </BottomGrid>
    </DashboardRoot>
  );
};


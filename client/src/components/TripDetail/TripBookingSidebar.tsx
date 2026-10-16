'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  Calendar,
  ChevronDown,
  Check,
  Users,
  Minus,
  Plus,
  CloudRain,
  Snowflake,
  Sun,
  Cloud,
} from 'lucide-react';
import { TripDetail } from './types';
import { TripBookingModal } from './TripBookingModal';
import {
  useAppDispatch,
  useAppSelector,
  selectUser,
  selectSelectedSlotId,
  selectTravellers,
  selectSelectedMonth,
  selectIsMonthDropdownOpen,
  setSelectedSlotId,
  incrementTravellers,
  decrementTravellers,
  setSelectedMonth,
  toggleMonthDropdown,
  openBookingModal,
  initializeTripDetail,
} from '@/redux';
import { colors } from '@/theme/colors';

interface TripBookingSidebarProps {
  trip: TripDetail;
}

const SidebarContainer = styled.div`
  width: 100%;
  flex-shrink: 0;
  position: sticky;
  top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    top: 6rem;
  }
  @media (min-width: 1024px) {
    width: 380px;
  }
`;

const BookingCard = styled.div`
  background-color: ${colors.white};
  border-radius: 1.5rem;
  border: 1px solid ${colors.gray[100]};
  padding: 1.25rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

const DiscountBadge = styled.span`
  font-size: 10px;
  font-weight: 900;
  color: ${colors.red[500]};
  background-color: ${colors.red[50]};
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid ${colors.red[100]};
`;

const MonthFilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border: 1px solid ${colors.gray[300]};
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${colors.gray[700]};
  background: transparent;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${colors.gray[50]};
  }
`;

const MonthDropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.375rem;
  width: 9rem;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[200]};
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 20;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  overflow: hidden;
`;

const MonthDropdownItem = styled.button<{ $isActive?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.375rem 0.875rem;
  font-size: 0.75rem;
  font-weight: 700;
  transition: background-color 0.15s ease;
  border: none;
  cursor: pointer;
  background-color: ${({ $isActive }) => ($isActive ? colors.amber[50] : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? colors.amber[700] : colors.gray[700])};

  &:hover {
    background-color: ${({ $isActive }) =>
      $isActive ? colors.amber[50] : colors.gray[50]};
  }
`;

const SlotOptionCard = styled.div<{ $isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 1rem;
  border: 1px solid
    ${({ $isSelected }) => ($isSelected ? colors.amber[400] : colors.gray[100])};
  background-color: ${({ $isSelected }) =>
    $isSelected ? `${colors.amber[50]}66` : colors.white};
  box-shadow: ${({ $isSelected }) =>
    $isSelected ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ $isSelected }) =>
      $isSelected ? colors.amber[400] : colors.gray[200]};
  }
`;

const RadioCircle = styled.div<{ $isSelected?: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background-color: ${({ $isSelected }) =>
    $isSelected ? colors.gray[900] : 'transparent'};
  color: ${colors.white};
  border: ${({ $isSelected }) =>
    $isSelected ? 'none' : `2px solid ${colors.gray[200]}`};

  ${SlotOptionCard}:hover & {
    border-color: ${({ $isSelected }) =>
      $isSelected ? 'none' : colors.gray[300]};
  }
`;

const StepCounterButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  border: 1px solid ${colors.gray[200]};
  color: ${colors.gray[500]};
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover:not(:disabled) {
    color: ${colors.gray[900]};
    background-color: ${colors.gray[50]};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const BookNowButton = styled.button`
  width: 100%;
  background-color: ${colors.amber[400]};
  color: ${colors.gray[900]};
  font-weight: 800;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${colors.black};
    color: ${colors.white};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const WeatherCard = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[100]};
  border-radius: 1.5rem;
  padding: 1.25rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

const ForecastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.625rem;
  background-color: ${colors.gray[50]};
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  cursor: default;
  border: 1px solid transparent;

  &:hover {
    background-color: ${colors.amber[50]}CC;
    border-color: ${colors.amber[100]}80;
  }
`;

export const TripBookingSidebar: React.FC<TripBookingSidebarProps> = ({ trip }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const reduxSelectedSlotId = useAppSelector(selectSelectedSlotId);
  const travellers = useAppSelector(selectTravellers);
  const selectedMonth = useAppSelector(selectSelectedMonth);
  const isMonthDropdownOpen = useAppSelector(selectIsMonthDropdownOpen);

  useEffect(() => {
    dispatch(
      initializeTripDetail({
        defaultSlotId: trip.dateSlots[0]?.id,
        user,
      })
    );
  }, [trip.dateSlots, user, dispatch]);

  const selectedSlotId = reduxSelectedSlotId || trip.dateSlots[0]?.id || '';
  const selectedSlot =
    trip.dateSlots.find((s) => s.id === selectedSlotId) || trip.dateSlots[0];

  const months = ['All Months', ...Array.from(new Set(trip.dateSlots.map((s) => s.month)))];

  const filteredSlots =
    selectedMonth === 'All Months'
      ? trip.dateSlots
      : trip.dateSlots.filter((s) => s.month === selectedMonth);

  const handleTravellersChange = (delta: number) => {
    if (delta > 0) {
      dispatch(incrementTravellers());
    } else {
      dispatch(decrementTravellers());
    }
  };

  const renderWeatherIcon = (icon: string, className = 'w-4 h-4') => {
    switch (icon) {
      case 'rain':
        return <CloudRain className={className} />;
      case 'snow':
        return <Snowflake className={className} />;
      case 'sun':
        return <Sun className={className} />;
      default:
        return <Cloud className={className} />;
    }
  };

  return (
    <SidebarContainer id="booking-sidebar-section">
      {/* Booking Form Card */}
      <BookingCard>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.gray[500], marginBottom: '0.25rem' }}>
          Trip Starts From
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '1.875rem', fontWeight: 900, color: colors.amber[500] }}>
            ₹{trip.pricing.startingPrice.toLocaleString('en-IN')}
          </span>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: colors.gray[400], textDecoration: 'line-through' }}>
            ₹{trip.pricing.originalPrice.toLocaleString('en-IN')}
          </span>
          <DiscountBadge>{trip.pricing.discount}</DiscountBadge>
        </div>
        <p style={{ fontSize: '10px', fontWeight: 700, color: colors.gray[400], marginBottom: '1.5rem' }}>
          Per Person
        </p>

        {/* Trip Dates Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', marginBottom: '1rem', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: colors.gray[800], fontSize: '0.875rem', flex: 1 }}>
            <Calendar style={{ width: '1rem', height: '1rem', color: colors.blue[500] }} />
            <span>Trip Dates</span>
          </div>

          {/* Month Filter Dropdown */}
          <div style={{ position: 'relative' }}>
            <MonthFilterButton
              type="button"
              onClick={() => dispatch(toggleMonthDropdown())}
            >
              <span>{selectedMonth}</span>
              <ChevronDown style={{ width: '0.75rem', height: '0.75rem' }} />
            </MonthFilterButton>

            {isMonthDropdownOpen && (
              <MonthDropdownMenu>
                {months.map((m) => (
                  <MonthDropdownItem
                    key={m}
                    type="button"
                    $isActive={selectedMonth === m}
                    onClick={() => dispatch(setSelectedMonth(m))}
                  >
                    {m}
                  </MonthDropdownItem>
                ))}
              </MonthDropdownMenu>
            )}
          </div>
        </div>

        {/* Date Slots Radio Selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {filteredSlots.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;
            return (
              <SlotOptionCard
                key={slot.id}
                $isSelected={isSelected}
                onClick={() => dispatch(setSelectedSlotId(slot.id))}
                className="group"
              >
                <div>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: isSelected ? colors.amber[700] : colors.gray[800],
                      transition: 'color 0.15s ease',
                    }}
                  >
                    {slot.date}
                  </p>
                  <p style={{ fontSize: '10px', fontWeight: 700, color: colors.gray[500], marginTop: '0.125rem' }}>
                    Starting ₹{slot.price.toLocaleString('en-IN')} /Person
                  </p>
                </div>

                <RadioCircle $isSelected={isSelected}>
                  {isSelected && <Check style={{ width: '0.75rem', height: '0.75rem' }} />}
                </RadioCircle>
              </SlotOptionCard>
            );
          })}
        </div>

        {/* Number of Travellers Counter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingTop: '1rem',
            borderTop: `1px solid ${colors.gray[100]}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: colors.gray[800], fontSize: '0.875rem' }}>
            <Users style={{ width: '1rem', height: '1rem', color: colors.purple[600] }} />
            <span>No. of Travellers</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <StepCounterButton
              type="button"
              onClick={() => handleTravellersChange(-1)}
              disabled={travellers <= 1}
              aria-label="Decrease travellers"
            >
              <Minus style={{ width: '0.875rem', height: '0.875rem' }} />
            </StepCounterButton>
            <span style={{ fontSize: '0.875rem', fontWeight: 900, width: '1.5rem', textAlign: 'center', color: colors.gray[900] }}>
              {travellers}
            </span>
            <StepCounterButton
              type="button"
              onClick={() => handleTravellersChange(1)}
              aria-label="Increase travellers"
            >
              <Plus style={{ width: '0.875rem', height: '0.875rem' }} />
            </StepCounterButton>
          </div>
        </div>

        {/* Total Price preview */}
        {selectedSlot && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingLeft: '0.25rem', paddingRight: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.gray[500] }}>
              Total Price
            </span>
            <span style={{ fontSize: '1.125rem', fontWeight: 900, color: colors.gray[900] }}>
              ₹{(selectedSlot.price * travellers).toLocaleString('en-IN')}
            </span>
          </div>
        )}

        {/* Book Now Button */}
        <BookNowButton
          type="button"
          onClick={() => dispatch(openBookingModal())}
        >
          Book Now
        </BookNowButton>
      </BookingCard>

      {/* Live Weather Card */}
      <WeatherCard className="group">
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '8rem',
            height: '8rem',
            backgroundColor: `${colors.amber[400]}0D`,
            borderRadius: '9999px',
            filter: 'blur(24px)',
            marginRight: '-2.5rem',
            marginTop: '-2.5rem',
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', position: 'relative', zIndex: 10 }}>
          <div>
            <p
              style={{
                fontSize: '10px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: colors.gray[400],
                marginBottom: '0.25rem',
              }}
            >
              Live Weather
            </p>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: colors.gray[900], textTransform: 'capitalize' }}>
              {trip.weather.location}
            </h3>
          </div>

          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              backgroundColor: colors.amber[50],
              color: colors.amber[500],
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <CloudRain style={{ width: '1.25rem', height: '1.25rem' }} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '1.5rem', position: 'relative', zIndex: 10 }}>
          <span style={{ fontSize: '2.25rem', fontWeight: 900, color: colors.gray[900] }}>
            {trip.weather.currentTemp}
          </span>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: colors.gray[500], marginBottom: '0.25rem' }}>
            {trip.weather.condition}
          </span>
        </div>

        {/* 3-day Forecast */}
        <div style={{ paddingTop: '1rem', borderTop: `1px solid ${colors.gray[100]}`, position: 'relative', zIndex: 10 }}>
          <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.gray[400], marginBottom: '0.75rem' }}>
            Forecast
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {trip.weather.forecast.map((fc, i) => (
              <ForecastItem key={i}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: colors.gray[500], marginBottom: '0.25rem' }}>
                  {fc.day}
                </span>
                <div style={{ color: colors.gray[400], marginBottom: '0.25rem' }}>
                  {renderWeatherIcon(fc.icon, 'w-4 h-4')}
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 900, color: colors.gray[900] }}>
                  {fc.temp}
                </span>
              </ForecastItem>
            ))}
          </div>
        </div>
      </WeatherCard>

      {/* Booking Checkout Modal */}
      <TripBookingModal trip={trip} />
    </SidebarContainer>
  );
};

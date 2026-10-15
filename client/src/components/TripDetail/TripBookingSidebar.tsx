'use client';

import React, { useState } from 'react';
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

interface TripBookingSidebarProps {
  trip: TripDetail;
}

export const TripBookingSidebar: React.FC<TripBookingSidebarProps> = ({ trip }) => {
  const [selectedSlotId, setSelectedSlotId] = useState<string>(
    trip.dateSlots[0]?.id || ''
  );
  const [travellers, setTravellers] = useState<number>(1);
  const [selectedMonth, setSelectedMonth] = useState<string>('All Months');
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const months = ['All Months', ...Array.from(new Set(trip.dateSlots.map((s) => s.month)))];

  const filteredSlots =
    selectedMonth === 'All Months'
      ? trip.dateSlots
      : trip.dateSlots.filter((s) => s.month === selectedMonth);

  const selectedSlot =
    trip.dateSlots.find((s) => s.id === selectedSlotId) || trip.dateSlots[0];

  const handleTravellersChange = (delta: number) => {
    setTravellers((prev) => Math.max(1, Math.min(20, prev + delta)));
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
    <div id="booking-sidebar-section" className="w-full lg:w-[380px] shrink-0 sticky top-20 md:top-24 space-y-6">
      {/* Booking Form Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-sm">
        <p className="text-xs font-bold text-gray-500 mb-1">Trip Starts From</p>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-3xl font-black text-amber-500">
            ₹{trip.pricing.startingPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-sm font-bold text-gray-400 line-through decoration-gray-400">
            ₹{trip.pricing.originalPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
            {trip.pricing.discount}
          </span>
        </div>
        <p className="text-[10px] font-bold text-gray-400 mb-6">Per Person</p>

        {/* Trip Dates Header */}
        <div className="flex items-center justify-between mb-4 relative">
          <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>Trip Dates</span>
          </div>

          {/* Month Filter Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span>{selectedMonth}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {isMonthDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
                {months.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setSelectedMonth(m);
                      setIsMonthDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-bold transition-colors ${
                      selectedMonth === m
                        ? 'bg-amber-50 text-amber-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Date Slots Radio Selection */}
        <div className="space-y-3 mb-6">
          {filteredSlots.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;
            return (
              <div
                key={slot.id}
                onClick={() => setSelectedSlotId(slot.id)}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group ${
                  isSelected
                    ? 'border-amber-400 bg-amber-50/40 shadow-xs'
                    : 'border-gray-100 hover:border-gray-200 bg-white'
                }`}
              >
                <div>
                  <p
                    className={`text-sm font-bold transition-colors ${
                      isSelected
                        ? 'text-amber-700'
                        : 'text-gray-800 group-hover:text-amber-600'
                    }`}
                  >
                    {slot.date}
                  </p>
                  <p className="text-[10px] font-bold text-gray-500 mt-0.5">
                    Starting ₹{slot.price.toLocaleString('en-IN')} /Person
                  </p>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-gray-900 text-white'
                      : 'border-2 border-gray-200 group-hover:border-gray-300'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Number of Travellers Counter */}
        <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
            <Users className="w-4 h-4 text-purple-600" />
            <span>No. of Travellers</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleTravellersChange(-1)}
              disabled={travellers <= 1}
              className="w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer"
              aria-label="Decrease travellers"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-black w-6 text-center text-gray-900">
              {travellers}
            </span>
            <button
              type="button"
              onClick={() => handleTravellersChange(1)}
              className="w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Increase travellers"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Total Price preview */}
        {selectedSlot && (
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-xs font-bold text-gray-500">Total Price</span>
            <span className="text-lg font-black text-gray-900">
              ₹{(selectedSlot.price * travellers).toLocaleString('en-IN')}
            </span>
          </div>
        )}

        {/* Book Now Button */}
        <button
          type="button"
          onClick={() => setIsBookingModalOpen(true)}
          className="w-full bg-amber-400 hover:bg-black hover:text-white text-gray-900 font-extrabold py-3.5 rounded-xl transition-all shadow-sm active:scale-98 cursor-pointer"
        >
          Book Now
        </button>
      </div>

      {/* Live Weather Card */}
      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-amber-400/10 transition-colors" />

        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 group-hover:text-amber-500 transition-colors duration-300">
              Live Weather
            </p>
            <h3 className="text-lg font-bold text-gray-900 capitalize group-hover:text-amber-600 transition-colors duration-300">
              {trip.weather.location}
            </h3>
          </div>

          <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center shrink-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] group-hover:bg-amber-100 transition-colors duration-300">
            <CloudRain className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-end gap-2 mb-6 relative z-10">
          <span className="text-4xl font-black text-gray-900">
            {trip.weather.currentTemp}
          </span>
          <span className="text-sm font-bold text-gray-500 mb-1">
            {trip.weather.condition}
          </span>
        </div>

        {/* 3-day Forecast */}
        <div className="pt-4 border-t border-gray-100 relative z-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
            Forecast
          </p>
          <div className="grid grid-cols-3 gap-2">
            {trip.weather.forecast.map((fc, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-2.5 bg-gray-50 rounded-xl hover:bg-amber-50/80 transition-colors cursor-default border border-transparent hover:border-amber-100/50"
              >
                <span className="text-[10px] font-bold text-gray-500 mb-1">
                  {fc.day}
                </span>
                <div className="text-gray-400 mb-1 group-hover:text-amber-500 transition-colors">
                  {renderWeatherIcon(fc.icon, 'w-4 h-4')}
                </div>
                <span className="text-sm font-black text-gray-900">
                  {fc.temp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Checkout Modal */}
      {selectedSlot && (
        <TripBookingModal
          trip={trip}
          selectedSlot={selectedSlot}
          travellers={travellers}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}
    </div>
  );
};

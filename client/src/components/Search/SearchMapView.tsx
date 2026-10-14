'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, ArrowRight, X } from 'lucide-react';
import { TripItem } from './types';
import { typography } from '@/theme/typography';

export interface SearchMapViewProps {
  trips: TripItem[];
}

export const SearchMapView: React.FC<SearchMapViewProps> = ({ trips }) => {
  const [selectedTrip, setSelectedTrip] = useState<TripItem | null>(
    trips[0] || null
  );

  return (
    <div className="relative w-full h-[600px] md:h-[700px] rounded-3xl overflow-hidden border border-gray-200 shadow-md bg-stone-100 flex flex-col">
      {/* Map Graphic Background Simulation */}
      <div className="absolute inset-0 bg-[#e5e3df] overflow-hidden">
        {/* SVG Topographic / Roads styling pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="map-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1"
              />
              <circle cx="30" cy="30" r="1.5" fill="#94a3b8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
          {/* Decorative Rivers / Routes */}
          <path
            d="M -50 150 Q 200 120 400 280 T 900 350 T 1500 500"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 100 -50 Q 300 300 700 380 T 1400 700"
            fill="none"
            stroke="#fde68a"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
        </svg>

        {/* Map Interactive Pins */}
        <div className="absolute inset-0 p-8 sm:p-12 pointer-events-none">
          {trips.map((trip, idx) => {
            // Distribute pins across the map area
            const positions = [
              { top: '22%', left: '38%' }, // Manali
              { top: '35%', left: '52%' }, // Kausani
              { top: '15%', left: '32%' }, // Ladakh
              { top: '28%', left: '42%' }, // Spiti
              { top: '38%', left: '46%' }, // Rishikesh
              { top: '68%', left: '28%' }, // Goa
              { top: '44%', left: '34%' }, // Jaipur
              { top: '18%', left: '36%' }, // Zanskar
            ];
            const pos = positions[idx % positions.length];
            const isSelected = selectedTrip?.id === trip.id;

            return (
              <div
                key={trip.id}
                style={{ top: pos.top, left: pos.left }}
                className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer"
                onClick={() => setSelectedTrip(trip)}
              >
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs shadow-lg transition-all duration-300 transform group-hover:scale-110 ${
                    isSelected
                      ? 'bg-black text-white ring-4 ring-[#FFD133]'
                      : 'bg-white text-gray-900 border border-gray-200 hover:bg-[#FFD133]'
                  }`}
                >
                  <MapPin
                    className={`w-3.5 h-3.5 ${
                      isSelected ? 'text-[#FFD133]' : 'text-red-500'
                    }`}
                  />
                  <span>{trip.destination}</span>
                  <span className="text-[11px] font-black opacity-80">
                    ₹{trip.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Trip Floating Card on Map */}
      {selectedTrip && (
        <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-[360px] z-30">
          <div className="bg-white rounded-2xl p-4 shadow-2xl border border-gray-200 relative animate-fade-in-up">
            <button
              type="button"
              onClick={() => setSelectedTrip(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors z-10"
              aria-label="Close Preview"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-4 items-center">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                <Image
                  src={selectedTrip.image}
                  alt={selectedTrip.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold mb-1">
                  <MapPin className="w-3 h-3" />
                  <span>{selectedTrip.destination}</span>
                </div>
                <h4
                  className="font-bold text-sm text-[#191c1d] truncate mb-1"
                  style={{ fontFamily: typography.fonts.jakarta }}
                >
                  {selectedTrip.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                  <Calendar className="w-3 h-3" />
                  <span>{selectedTrip.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-gray-900">
                    ₹{selectedTrip.price.toLocaleString('en-IN')}
                  </span>
                  <Link
                    href={`/trips/${selectedTrip.slug}`}
                    className="flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-black transition-colors"
                  >
                    View Trip <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

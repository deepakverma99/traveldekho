'use client';

import React from 'react';
import { WeatherCard } from './WeatherCard';
import { mockWeatherData } from './mockWeatherData';

export const WeatherForecastSection: React.FC = () => {
  return (
    <section
      id="weather-forecast-section"
      className="relative w-full py-12 md:py-16 overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="font-caveat text-3xl md:text-5xl text-gray-900 font-bold mb-3 leading-tight">
              Live Weather <span className="ml-1 text-primary">Forecasts</span>
            </h2>
            <p className="text-gray-500 font-medium text-sm md:text-base max-w-xl leading-relaxed font-jakarta">
              Check the live weather and upcoming 3-day forecast for some of our
              most popular destinations before you pack your bags!
            </p>
          </div>
        </div>

        {/* Weather Cards: Horizontal Scroll on Mobile, Grid on Tablet/Desktop */}
        <div className="flex gap-3 overflow-x-auto pb-3 scroll-smooth scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 lg:gap-6 sm:overflow-x-visible sm:pb-0">
          {mockWeatherData.map((destination) => (
            <WeatherCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
};

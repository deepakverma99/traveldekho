'use client';

import React, { useState } from 'react';
import { colors } from '@/theme/colors';
import { useAppSelector } from '@/redux/hooks';
import { selectPartnerBookingTrends } from '@/redux/slices/tripPartnerSlice';

export const TripPartnerBookingChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const bookingTrends = useAppSelector(selectPartnerBookingTrends);

  // SVG dimensions - compact & responsive
  const width = 800;
  const height = 240;
  const paddingLeft = 40;
  const paddingRight = 24;
  const paddingTop = 16;
  const paddingBottom = 32;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = Math.max(4, ...bookingTrends.map((d) => d.count));
  const yTicks = [0, 1, 2, 3, 4];

  // Calculate coordinates for each point
  const points = bookingTrends.map((d, i) => {
    const divisor = bookingTrends.length > 1 ? bookingTrends.length - 1 : 1;
    const x = paddingLeft + (i / divisor) * chartWidth;
    const y = paddingTop + chartHeight - (d.count / maxVal) * chartHeight;
    return { x, y, ...d };
  });

  // Construct smooth bezier curve path
  const createSmoothPath = (pts: typeof points) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      d += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${p1.x},${p1.y}`;
    }
    return d;
  };

  const linePath = createSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x},${paddingTop + chartHeight} L ${points[0].x},${paddingTop + chartHeight} Z`;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4.5 sm:p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.04),0_1px_2px_-1px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full min-w-0 overflow-hidden transition-all duration-250 ease-out hover:shadow-[0_10px_25px_-5px_rgba(255,237,208,0.5),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:border-amber-200">
      {/* Header */}
      <div className="flex flex-col min-[480px]:flex-row min-[480px]:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-gray-900">
            Booking <span className="text-amber-500">Volume</span>
          </h3>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
            Real-time performance analytics
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors.amber[500] }}
            />
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
              Reserved
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors.gray[200] }}
            />
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
              Drafts
            </span>
          </div>
        </div>
      </div>

      {/* SVG Responsive Chart */}
      <div className="w-full max-w-full min-w-0 relative overflow-hidden flex-1 flex items-center">

        <svg
          role="img"
          aria-label="Booking Volume Chart"
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id="gradient-bookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.amber[500]} stopOpacity="0.35" />
              <stop offset="95%" stopColor={colors.amber[500]} stopOpacity="0.0" />
            </linearGradient>
            <filter id="shadow-bookings" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={colors.amber[500]} floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Horizontal Grid lines & Y-Axis values */}
          {yTicks.map((tick) => {
            const y = paddingTop + chartHeight - (tick / maxVal) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke={colors.gray[100]}
                  strokeDasharray="4 4"
                  strokeWidth="1.5"
                />
                <text
                  x={paddingLeft - 14}
                  y={y + 4}
                  fill={colors.gray[400]}
                  fontSize="12"
                  fontWeight="600"
                  textAnchor="end"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#gradient-bookings)" />

          {/* Curve Stroke Line */}
          <path
            d={linePath}
            fill="none"
            stroke={colors.amber[500]}
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#shadow-bookings)"
          />

          {/* Points & Hover Interactivity */}
          {points.map((pt, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g
                key={pt.day}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Invisible hit area */}
                <circle cx={pt.x} cy={pt.y} r="18" fill="transparent" />

                {/* Outer Ring on Hover */}
                {isHovered && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="8"
                    fill={colors.amber[100]}
                    stroke={colors.amber[500]}
                    strokeWidth="2"
                    className="animate-ping"
                  />
                )}

                {/* Visible Data Dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? '6' : '4.5'}
                  fill={colors.white}
                  stroke={colors.amber[500]}
                  strokeWidth="3"
                  className="transition-all duration-200"
                />

                {/* X-Axis Day Label */}
                <text
                  x={pt.x}
                  y={height - 10}
                  fill={isHovered ? colors.gray[800] : colors.gray[500]}
                  fontSize="12"
                  fontWeight={isHovered ? '800' : '600'}
                  textAnchor="middle"
                  className="transition-colors duration-150"
                >
                  {pt.day}
                </text>

                {/* Tooltip on hover */}
                {isHovered && (
                  <g transform={`translate(${pt.x}, ${pt.y - 36})`}>
                    <rect
                      x="-42"
                      y="-12"
                      width="84"
                      height="26"
                      rx="8"
                      fill={colors.charcoal}
                      className="shadow-lg"
                    />
                    <text
                      x="0"
                      y="5"
                      fill={colors.white}
                      fontSize="11"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      {pt.count} Bookings
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};


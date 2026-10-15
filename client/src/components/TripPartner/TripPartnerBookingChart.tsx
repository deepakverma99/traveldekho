'use client';

import React, { useState } from 'react';

interface ChartPoint {
  day: string;
  count: number;
}

const DEFAULT_DATA: ChartPoint[] = [
  { day: 'Mon', count: 2 },
  { day: 'Tue', count: 3 },
  { day: 'Wed', count: 1 },
  { day: 'Thu', count: 4 },
  { day: 'Fri', count: 3 },
  { day: 'Sat', count: 4 },
  { day: 'Sun', count: 2 },
];

export const TripPartnerBookingChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG dimensions
  const width = 1000;
  const height = 280;
  const paddingLeft = 50;
  const paddingRight = 30;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = 4;
  const yTicks = [0, 1, 2, 3, 4];

  // Calculate coordinates for each point
  const points = DEFAULT_DATA.map((d, i) => {
    const x = paddingLeft + (i / (DEFAULT_DATA.length - 1)) * chartWidth;
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
    <div className="mb-12 bg-white border border-gray-100 rounded-[40px] p-6 sm:p-10 shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-900">
            Booking <span className="text-amber-500">Volume</span>
          </h3>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">
            Real-time performance analytics
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-200" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Drafts</span>
          </div>
        </div>
      </div>

      {/* SVG Responsive Chart */}
      <div className="w-full relative overflow-visible">
        <svg
          role="img"
          aria-label="Booking Volume Chart"
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id="gradient-bookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity="0.0" />
            </linearGradient>
            <filter id="shadow-bookings" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#f59e0b" floodOpacity="0.25" />
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
                  stroke="#f1f5f9"
                  strokeDasharray="4 4"
                  strokeWidth="1.5"
                />
                <text
                  x={paddingLeft - 14}
                  y={y + 4}
                  fill="#94a3b8"
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
            stroke="#f59e0b"
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
                    fill="#fef3c7"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    className="animate-ping"
                  />
                )}

                {/* Visible Data Dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? '6' : '4.5'}
                  fill="#ffffff"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  className="transition-all duration-200"
                />

                {/* X-Axis Day Label */}
                <text
                  x={pt.x}
                  y={height - 10}
                  fill={isHovered ? '#1e293b' : '#64748b'}
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
                      fill="#191c1d"
                      className="shadow-lg"
                    />
                    <text
                      x="0"
                      y="5"
                      fill="#ffffff"
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

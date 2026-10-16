'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '@/theme/colors';
import { useAppSelector } from '@/redux/hooks';
import { selectPartnerBookingTrends } from '@/redux/slices/tripPartnerSlice';

const ChartCard = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[200]};
  border-radius: 1rem;
  padding: 1.125rem 1.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-width: 0;
  overflow: hidden;
  transition: all 0.25s ease;

  &:hover {
    box-shadow: 0 10px 25px -5px ${colors.amber[100]}80, 0 8px 10px -6px rgba(0, 0, 0, 0.04);
    border-color: ${colors.amber[200]};
  }

  @media (min-width: 640px) {
    padding: 1.5rem 1.75rem;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;

  @media (min-width: 480px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: ${colors.gray[900]};

  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
`;

const Highlight = styled.span`
  color: ${colors.amber[500]};
`;

const Subtitle = styled.p`
  font-size: 10px;
  font-weight: 900;
  color: ${colors.gray[400]};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-top: 0.25rem;
`;

const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LegendDot = styled.div<{ $color: string }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background-color: ${({ $color }) => $color};
`;

const LegendText = styled.span`
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${colors.gray[400]};
`;

const SvgContainer = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  position: relative;
  overflow: hidden;
  flex: 1;
  display: flex;
  align-items: center;
`;

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
    <ChartCard>
      {/* Header */}
      <HeaderRow>
        <div>
          <Title>
            Booking <Highlight>Volume</Highlight>
          </Title>
          <Subtitle>
            Real-time performance analytics
          </Subtitle>
        </div>

        <LegendRow>
          <LegendItem>
            <LegendDot $color={colors.amber[500]} />
            <LegendText>Reserved</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendDot $color={colors.gray[200]} />
            <LegendText>Drafts</LegendText>
          </LegendItem>
        </LegendRow>
      </HeaderRow>

      {/* SVG Responsive Chart */}
      <SvgContainer>
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
      </SvgContainer>
    </ChartCard>
  );
};


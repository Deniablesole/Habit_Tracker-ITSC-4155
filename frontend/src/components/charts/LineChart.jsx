import React from 'react';

export const SimpleLineChart = ({ color, data }) => {
  const trendData = data || [30, 45, 35, 50, 40, 60, 55, 70, 65, 80, 75, 90, 85, 60, 70, 75, 50, 60, 80, 90, 100, 95, 80, 85, 90, 100, 95, 90, 95, 100];
  const height = 60; const width = 200; const max = Math.max(...trendData);
  const points = trendData.map((val, i) => {
    const x = (i / (trendData.length - 1)) * width;
    const y = height - (val / max) * height;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={color.replace('bg-', 'text-')} />
      <polygon points={`0,${height} ${points} ${width},${height}`} fill="currentColor" className={`${color.replace('bg-', 'text-')} opacity-10`} />
    </svg>
  );
};

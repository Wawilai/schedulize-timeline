import React from 'react';
import { minutesToTime } from '@/utils/timeUtils';

interface TimelineHeaderProps {
  startTime: number;
  endTime: number;
  timeScale: number;
  pixelsPerMinute: number;
  width: number;
}

const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  startTime,
  endTime,
  timeScale,
  pixelsPerMinute,
  width
}) => {
  const labelStep = timeScale < 30 ? 30 : 60;
  const timeLines = [];

  for (let t = startTime; t < endTime; t += timeScale) {
    const isHour = t % 60 === 0;
    const isHalfHour = t % 30 === 0;
    const left = (t - startTime) * pixelsPerMinute;
    
    let borderClass = '';
    if (isHour) borderClass = 'border-l border-slate-400';
    else if (isHalfHour) borderClass = 'border-l border-slate-300';
    else borderClass = 'border-l border-slate-200';

    const showLabel = t % labelStep === 0 || (timeScale === 15 && isHalfHour);
    
    timeLines.push(
      <div
        key={t}
        className={`absolute top-0 h-full ${borderClass}`}
        style={{ left: `${left}px` }}
      >
        {showLabel && (
          <span className={`absolute top-2 left-2 ${
            isHour 
              ? 'text-sm font-semibold text-slate-600' 
              : 'text-xs text-slate-500'
          }`}>
            {minutesToTime(t)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className="sticky-header relative h-[40px] bg-white border-b border-slate-200"
      style={{ width: `${width}px` }}
    >
      {timeLines}
    </div>
  );
};

export default TimelineHeader;
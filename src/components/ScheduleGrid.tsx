import React, { useRef, useEffect } from 'react';
import { Employee, Appointment } from '@/types/schedule';
import { timeToMinutes, minutesToTime } from '@/utils/timeUtils';
import AppointmentBlock from './AppointmentBlock';
import TimelineHeader from './TimelineHeader';

interface ScheduleGridProps {
  employees: Employee[];
  appointments: Appointment[];
  timeScale: number;
  currentDate: Date;
  onAppointmentDrop: (appointmentId: number | string, employeeId: string, startTime: string, duration: number) => void;
  onAppointmentDragStart: (appointment: Appointment) => void;
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  employees,
  appointments,
  timeScale,
  currentDate,
  onAppointmentDrop,
  onAppointmentDragStart
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const startTime = 8 * 60; // 08:00 in minutes
  const endTime = 18 * 60; // 18:00 in minutes
  const timelineTotalWidth = 2000;
  const pixelsPerMinute = timelineTotalWidth / (endTime - startTime);
  const resourceColumnWidth = 240;
  const rowHeight = 80;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, employeeId: string) => {
    e.preventDefault();
    
    const data = e.dataTransfer.getData('application/json');
    if (!data) return;
    
    const draggedItem = JSON.parse(data);
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left + (gridRef.current?.scrollLeft || 0);
    
    // Snap to time grid
    const timeStep = timeScale;
    const snapWidth = timeStep * pixelsPerMinute;
    const snappedLeft = Math.floor(Math.max(0, offsetX) / snapWidth) * snapWidth;
    const startMins = startTime + (snappedLeft / pixelsPerMinute);
    
    onAppointmentDrop(draggedItem.id, employeeId, minutesToTime(startMins), draggedItem.duration);
  };

  // Current time indicator
  useEffect(() => {
    const updateCurrentTime = () => {
      if (!gridRef.current) return;
      
      const now = new Date();
      if (now.toDateString() !== currentDate.toDateString()) return;
      
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      if (currentMinutes < startTime || currentMinutes > endTime) return;
      
      const indicatorLeft = resourceColumnWidth + (currentMinutes - startTime) * pixelsPerMinute;
      
      // Update or create current time line
      let indicator = gridRef.current.querySelector('#current-time-indicator') as HTMLElement;
      if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'current-time-indicator';
        indicator.className = 'absolute w-0.5 current-time-line z-20 pointer-events-none';
        gridRef.current.appendChild(indicator);
      }
      
      indicator.style.left = `${indicatorLeft}px`;
      indicator.style.top = '0px';
      indicator.style.height = `${40 + employees.length * rowHeight}px`;
    };
    
    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(interval);
  }, [currentDate, employees.length, startTime, endTime, pixelsPerMinute, resourceColumnWidth]);

  return (
    <div ref={gridRef} className="flex-grow relative custom-scrollbar overflow-auto">
      <div
        className="inline-grid"
        style={{ gridTemplateColumns: `${resourceColumnWidth}px 1fr` }}
      >
        {/* Corner block */}
        <div className="sticky-corner w-[240px] h-[40px] bg-white border-b border-r border-slate-200" />
        
        {/* Timeline header */}
        <TimelineHeader
          startTime={startTime}
          endTime={endTime}
          timeScale={timeScale}
          pixelsPerMinute={pixelsPerMinute}
          width={timelineTotalWidth}
        />
        
        {/* Employee rows */}
        {employees.map((employee) => (
          <React.Fragment key={employee.id}>
            {/* Resource header */}
            <div className="sticky-column flex items-center p-3 h-[80px] bg-white border-b border-r border-slate-200">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="font-semibold">{employee.name}</span>
            </div>
            
            {/* Timeline row */}
            <div
              className="relative h-[80px] border-b border-slate-200 timeline-grid"
              style={{
                '--grid-size': `${timeScale * pixelsPerMinute}px`,
                width: `${timelineTotalWidth}px`
              } as React.CSSProperties}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, employee.id)}
            >
              {appointments
                .filter(apt => apt.employeeId === employee.id)
                .map(appointment => (
                  <AppointmentBlock
                    key={appointment.id}
                    appointment={appointment}
                    startTime={startTime}
                    pixelsPerMinute={pixelsPerMinute}
                    onDragStart={() => onAppointmentDragStart(appointment)}
                  />
                ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ScheduleGrid;
import React, { useRef, useEffect, useState } from 'react';
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
  onAddAppointmentData?: (appointmentId: number) => void;
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  employees,
  appointments,
  timeScale,
  currentDate,
  onAppointmentDrop,
  onAppointmentDragStart,
  onAddAppointmentData
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [ghostPreview, setGhostPreview] = useState<{
    show: boolean;
    employeeId: string;
    left: number;
    width: number;
    title: string;
    duration: number;
    rowIndex: number;
  } | null>(null);
  
  const startTime = 8 * 60; // 08:00 in minutes
  const endTime = 18 * 60; // 18:00 in minutes
  const timelineTotalWidth = 2000;
  const pixelsPerMinute = timelineTotalWidth / (endTime - startTime);
  const resourceColumnWidth = 240;
  const rowHeight = 130;

  const handleDragOver = (e: React.DragEvent, employeeId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    // Add visual feedback for drop zone
    const target = e.currentTarget as HTMLElement;
    target.classList.add('drag-over');
    
    // Show ghost preview
    const data = e.dataTransfer.getData('application/json');
    if (data) {
      try {
        const draggedItem = JSON.parse(data);
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left + (gridRef.current?.scrollLeft || 0);
        
        // Calculate ghost position with snap
        const timeStep = Math.max(15, timeScale);
        const snapWidth = timeStep * pixelsPerMinute;
        const adjustedOffsetX = Math.max(0, offsetX - 10);
        const snappedLeft = Math.round(adjustedOffsetX / snapWidth) * snapWidth;
        const width = draggedItem.duration * pixelsPerMinute;
        
        // Find employee row index
        const rowIndex = employees.findIndex(emp => emp.id === employeeId);
        
        setGhostPreview({
          show: true,
          employeeId,
          left: snappedLeft,
          width: Math.max(width, 60), // Minimum width
          title: draggedItem.title,
          duration: draggedItem.duration,
          rowIndex
        });
      } catch (error) {
        // Ignore JSON parse errors
      }
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Remove visual feedback when leaving drop zone
    const target = e.currentTarget as HTMLElement;
    target.classList.remove('drag-over');
    
    // Hide ghost preview when leaving the timeline area
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setGhostPreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent, employeeId: string) => {
    e.preventDefault();
    
    // Remove visual feedback and hide ghost
    const target = e.currentTarget as HTMLElement;
    target.classList.remove('drag-over');
    setGhostPreview(null);
    
    const data = e.dataTransfer.getData('application/json');
    if (!data) return;
    
    const draggedItem = JSON.parse(data);
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left + (gridRef.current?.scrollLeft || 0);
    
    // Improved snap to grid calculation
    const timeStep = Math.max(15, timeScale); // Minimum 15-minute steps for better accuracy
    const snapWidth = timeStep * pixelsPerMinute;
    
    // Calculate snapped position with better precision
    const adjustedOffsetX = Math.max(0, offsetX - 10); // Account for drag offset
    const snappedLeft = Math.round(adjustedOffsetX / snapWidth) * snapWidth;
    const startMins = startTime + (snappedLeft / pixelsPerMinute);
    
    // Ensure the time is within bounds
    const clampedStartMins = Math.max(startTime, Math.min(endTime - draggedItem.duration, startMins));
    
    onAppointmentDrop(draggedItem.id, employeeId, minutesToTime(clampedStartMins), draggedItem.duration);
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
        <div className="sticky-corner w-[240px] h-[40px] bg-white border-b border-r border-border shadow-sm" />
        
        {/* Timeline header */}
        <TimelineHeader
          startTime={startTime}
          endTime={endTime}
          timeScale={timeScale}
          pixelsPerMinute={pixelsPerMinute}
          width={timelineTotalWidth}
        />
        
        {/* Employee rows */}
        {employees.map((employee, index) => (
          <React.Fragment key={employee.id}>
            {/* Resource header */}
            <div className="sticky-column flex items-center p-4 h-[130px] bg-white border-b border-r border-border shadow-sm">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-10 h-10 rounded-full mr-3 border-2 border-border"
              />
              <span className="font-semibold text-foreground">{employee.name}</span>
            </div>
            
            {/* Timeline row */}
            <div
              className="relative h-[130px] border-b border-border timeline-grid bg-white/50 transition-colors duration-200"
              style={{
                '--grid-size': `${Math.max(15, timeScale) * pixelsPerMinute}px`,
                width: `${timelineTotalWidth}px`
              } as React.CSSProperties}
              onDragOver={(e) => handleDragOver(e, employee.id)}
              onDragLeave={handleDragLeave}
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
                    onAddData={onAddAppointmentData}
                  />
                ))}
              
              {/* Ghost Preview */}
              {ghostPreview && ghostPreview.employeeId === employee.id && (
                <div
                  className="absolute top-[5px] h-[120px] rounded-lg border-2 border-dashed border-primary/50 bg-primary/10 backdrop-blur-sm z-[1] ghost-card"
                  style={{
                    left: `${ghostPreview.left}px`,
                    width: `${ghostPreview.width}px`
                  }}
                >
                  <div className="p-3 h-full flex flex-col justify-center">
                    <div className="text-xs font-medium text-primary/80 truncate">
                      📅 {ghostPreview.title}
                    </div>
                    <div className="text-[10px] text-primary/60 mt-1">
                      ⏱️ {ghostPreview.duration} นาที
                    </div>
                    <div className="text-[10px] text-primary/50 mt-auto">
                      วางที่นี่
                    </div>
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ScheduleGrid;
import React from 'react';
import { Appointment } from '@/types/schedule';
import { timeToMinutes } from '@/utils/timeUtils';

interface AppointmentBlockProps {
  appointment: Appointment;
  startTime: number;
  pixelsPerMinute: number;
  onDragStart: () => void;
}

const AppointmentBlock: React.FC<AppointmentBlockProps> = ({
  appointment,
  startTime,
  pixelsPerMinute,
  onDragStart
}) => {
  const startMinutes = timeToMinutes(appointment.startTime);
  const endMinutes = timeToMinutes(appointment.endTime);
  
  const left = (startMinutes - startTime) * pixelsPerMinute;
  const width = (endMinutes - startMinutes) * pixelsPerMinute;
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'appointment-scheduled';
      case 'Completed':
        return 'appointment-completed';
      case 'Traveling':
        return 'appointment-traveling';
      case 'Proposed':
        return 'appointment-proposed';
      default:
        return 'appointment-proposed';
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    const duration = endMinutes - startMinutes;
    const data = { ...appointment, duration, origin: 'calendar' };
    e.dataTransfer.setData('application/json', JSON.stringify(data));
    onDragStart();
  };

  return (
    <div
      className={`absolute h-[60px] top-[10px] rounded-sm p-2 text-xs overflow-hidden shadow-sm cursor-grab active:cursor-grabbing z-[2] ${getStatusClass(appointment.status)}`}
      style={{ left: `${left}px`, width: `${width}px` }}
      draggable
      onDragStart={handleDragStart}
    >
      <p className="font-bold truncate">{appointment.title}</p>
      <p className="truncate text-xs">{appointment.status}</p>
      <p className="truncate text-xs opacity-70">
        {appointment.startTime} - {appointment.endTime}
      </p>
    </div>
  );
};

export default AppointmentBlock;
import React from 'react';
import { Appointment } from '@/types/schedule';
import { timeToMinutes } from '@/utils/timeUtils';
import { Plus } from 'lucide-react';

interface AppointmentBlockProps {
  appointment: Appointment;
  startTime: number;
  pixelsPerMinute: number;
  onDragStart: () => void;
  onAddData?: (appointmentId: number) => void;
}

const AppointmentBlock: React.FC<AppointmentBlockProps> = ({
  appointment,
  startTime,
  pixelsPerMinute,
  onDragStart,
  onAddData
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

  const getCustomerLevelClass = (level?: string) => {
    switch (level) {
      case 'VIP':
        return 'customer-vip';
      case 'Platinum':
        return 'customer-platinum';
      case 'Gold':
        return 'customer-gold';
      case 'Silver':
        return 'customer-silver';
      default:
        return '';
    }
  };

  const getCustomerLevelBadge = (level?: string) => {
    const badges = {
      VIP: { text: 'VIP', color: 'bg-purple-600 text-white' },
      Platinum: { text: 'PLATINUM', color: 'bg-gray-600 text-white' },
      Gold: { text: 'GOLD', color: 'bg-yellow-600 text-white' },
      Silver: { text: 'SILVER', color: 'bg-gray-500 text-white' }
    };
    return badges[level as keyof typeof badges];
  };

  const handleDragStart = (e: React.DragEvent) => {
    const duration = endMinutes - startMinutes;
    const data = { ...appointment, duration, origin: 'calendar' };
    
    // Set drag data
    e.dataTransfer.setData('application/json', JSON.stringify(data));
    e.dataTransfer.effectAllowed = 'move';
    
    // Create a custom drag image with better visibility
    const dragImage = document.createElement('div');
    dragImage.innerHTML = `
      <div style="
        background: rgba(59, 130, 246, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: rotate(-2deg);
        border: 2px solid rgba(255,255,255,0.3);
      ">
        📅 ${appointment.title}<br>
        ⏱️ ${duration} นาที
      </div>
    `;
    
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    dragImage.style.left = '-1000px';
    document.body.appendChild(dragImage);
    
    e.dataTransfer.setDragImage(dragImage, 60, 20);
    
    // Clean up drag image after drag starts
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
    
    // Add dragging class to original element
    const target = e.currentTarget as HTMLElement;
    target.classList.add('dragging');
    
    onDragStart();
  };

  const handleDragEnd = (e: React.DragEvent) => {
    // Remove dragging class
    const target = e.currentTarget as HTMLElement;
    target.classList.remove('dragging');
  };

  const handleAddData = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddData?.(appointment.id);
  };

  const customerBadge = getCustomerLevelBadge(appointment.customerLevel);

  return (
    <div
      className={`absolute h-[120px] top-[5px] rounded-lg p-3 text-xs overflow-hidden shadow-md cursor-grab active:cursor-grabbing z-[2] transition-all hover:shadow-lg hover:scale-[1.02] group ${appointment.customerLevel ? getCustomerLevelClass(appointment.customerLevel) : getStatusClass(appointment.status)}`}
      style={{ left: `${left}px`, width: `${width}px` }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex justify-between items-start mb-1">
        <div className="flex-1 min-w-0">
          <p className="font-bold truncate text-sm">{appointment.title}</p>
          {customerBadge && (
            <span className={`inline-block px-1.5 py-0.5 rounded-full text-[10px] font-bold ${customerBadge.color} mt-1`}>
              {customerBadge.text}
            </span>
          )}
        </div>
        <button
          onClick={handleAddData}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-white/20 ml-1"
          title="เพิ่มข้อมูล"
        >
          <Plus size={12} />
        </button>
      </div>
      
      {appointment.customerName && (
        <p className="truncate text-xs font-medium mb-1">{appointment.customerName}</p>
      )}
      
      {appointment.service && (
        <p className="truncate text-xs mb-1">{appointment.service}</p>
      )}
      
      <p className="truncate text-xs font-medium mb-1">{appointment.status}</p>
      
      <p className="truncate text-xs opacity-80">
        {appointment.startTime} - {appointment.endTime}
      </p>
      
      {appointment.notes && (
        <p className="truncate text-[10px] opacity-70 mt-1" title={appointment.notes}>
          {appointment.notes}
        </p>
      )}
    </div>
  );
};

export default AppointmentBlock;
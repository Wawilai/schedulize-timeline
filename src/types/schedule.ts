export interface Building {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  buildingId: string;
}

export interface Appointment {
  id: number;
  title: string;
  employeeId: string;
  startTime: string;
  endTime: string;
  status: 'Scheduled' | 'Completed' | 'Traveling' | 'Proposed';
  customerLevel?: 'VIP' | 'Silver' | 'Gold' | 'Platinum';
  customerName?: string;
  service?: string;
  notes?: string;
}

export interface UnscheduledItem {
  id: string;
  title: string;
  duration: number;
  priority: 'Normal' | 'High';
}

export interface ScheduleState {
  timeScale: number;
  currentDate: Date;
  filters: {
    building: string;
    employeeSearch: string;
  };
}

export interface DraggedItem {
  id: string | number;
  title: string;
  duration: number;
  origin: 'unscheduled' | 'calendar';
  employeeId?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
}
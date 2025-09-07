import { Building, Employee, Appointment, UnscheduledItem } from '@/types/schedule';

export const mockBuildings: Building[] = [
  { id: 'b1', name: 'อาคาร A' },
  { id: 'b2', name: 'อาคาร B' }
];

export const mockEmployees: Employee[] = [
  { id: 'e1', name: 'Brady Hannon', avatar: 'https://placehold.co/40x40/E2E8F0/475569?text=BH', buildingId: 'b1' },
  { id: 'e2', name: 'Edgar Dominguez', avatar: 'https://placehold.co/40x40/E2E8F0/475569?text=ED', buildingId: 'b1' },
  { id: 'e3', name: 'Efrain Schreiner', avatar: 'https://placehold.co/40x40/E2E8F0/475569?text=ES', buildingId: 'b2' },
  { id: 'e4', name: 'Jorge Gault', avatar: 'https://placehold.co/40x40/E2E8F0/475569?text=JG', buildingId: 'b2' },
  { id: 'e5', name: 'Kris Nakamura', avatar: 'https://placehold.co/40x40/E2E8F0/475569?text=KN', buildingId: 'b1' },
];

export const mockUnscheduled: UnscheduledItem[] = [
  { id: 'u1', title: '00109', duration: 120, priority: 'Normal' },
  { id: 'u2', title: '00112', duration: 90, priority: 'High' },
  { id: 'u3', title: '00115', duration: 45, priority: 'Normal' },
];

export const mockAppointments: Appointment[] = [
  { 
    id: 1, 
    title: '00185', 
    employeeId: 'e1', 
    startTime: '08:30', 
    endTime: '09:30', 
    status: 'Scheduled',
    customerLevel: 'VIP',
    customerName: 'คุณสมชาย วงศ์ดี',
    service: 'บริการพิเศษ VIP',
    notes: 'ลูกค้า VIP ต้องการความเป็นส่วนตัว'
  },
  { 
    id: 2, 
    title: '00048', 
    employeeId: 'e2', 
    startTime: '09:00', 
    endTime: '11:00', 
    status: 'Completed',
    customerLevel: 'Gold',
    customerName: 'คุณวิไล จันทร์เพ็ญ',
    service: 'บริการระดับ Gold',
    notes: 'ลูกค้าประจำ ต้องการผลิตภัณฑ์พรีเมี่ยม'
  },
  { 
    id: 3, 
    title: '00106', 
    employeeId: 'e1', 
    startTime: '10:15', 
    endTime: '12:00', 
    status: 'Traveling',
    customerLevel: 'Silver',
    customerName: 'คุณอนุชา รักดี',
    service: 'บริการทั่วไป',
    notes: 'ลูกค้าใหม่'
  },
  { 
    id: 4, 
    title: '00117', 
    employeeId: 'e3', 
    startTime: '13:00', 
    endTime: '14:30', 
    status: 'Scheduled',
    customerLevel: 'Platinum',
    customerName: 'คุณประสิทธิ์ เจริญชัย',
    service: 'บริการระดับ Platinum',
    notes: 'ลูกค้า VIP สูงสุด'
  },
  { 
    id: 5, 
    title: '00125', 
    employeeId: 'e5', 
    startTime: '14:00', 
    endTime: '15:30', 
    status: 'Completed',
    customerLevel: 'Gold',
    customerName: 'คุณมาลี ใจดี',
    service: 'บริการระดับ Gold',
    notes: 'ลูกค้าคุ้นเคย'
  },
];
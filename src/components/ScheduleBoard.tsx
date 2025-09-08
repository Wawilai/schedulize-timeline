import React, { useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import HeaderControls from './HeaderControls';
import ScheduleGrid from './ScheduleGrid';
import UnscheduledPanel from './UnscheduledPanel';
import AppointmentDataForm from './AppointmentDataForm';
import { Building, Employee, Appointment, UnscheduledItem, DraggedItem } from '@/types/schedule';
import { mockBuildings, mockEmployees, mockAppointments, mockUnscheduled } from '@/data/mockData';
import { minutesToTime, timeToMinutes } from '@/utils/timeUtils';
import { useToast } from '@/hooks/use-toast';

const ScheduleBoard = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 6)); // September 6, 2025
  const [timeScale, setTimeScale] = useState(30);
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [unscheduledItems, setUnscheduledItems] = useState<UnscheduledItem[]>(mockUnscheduled);
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  // Filter employees based on building and search
  const filteredEmployees = useMemo(() => {
    let filtered = [...mockEmployees];
    
    if (selectedBuilding !== 'all') {
      filtered = filtered.filter(emp => emp.buildingId === selectedBuilding);
    }
    
    if (employeeSearch) {
      const searchTerm = employeeSearch.toLowerCase();
      filtered = filtered.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm)
      );
    }
    
    return filtered;
  }, [selectedBuilding, employeeSearch]);

  const handleAppointmentDrop = (
    appointmentId: number | string,
    employeeId: string,
    startTime: string,
    duration: number
  ) => {
    const endTime = minutesToTime(timeToMinutes(startTime) + duration);

    if (draggedItem?.origin === 'calendar') {
      // Moving existing appointment
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId
            ? { ...apt, employeeId, startTime, endTime }
            : apt
        )
      );
    } else if (draggedItem?.origin === 'unscheduled') {
      // Scheduling unscheduled item
      const newAppointment: Appointment = {
        id: Date.now(),
        title: draggedItem.title,
        employeeId,
        startTime,
        endTime,
        status: 'Scheduled'
      };
      
      setAppointments(prev => [...prev, newAppointment]);
      setUnscheduledItems(prev => prev.filter(item => item.id !== appointmentId));
    }
    
    setDraggedItem(null);
  };

  const handleAppointmentDragStart = (appointment: Appointment) => {
    const startMins = timeToMinutes(appointment.startTime);
    const endMins = timeToMinutes(appointment.endTime);
    const duration = endMins - startMins;
    
    setDraggedItem({
      id: appointment.id,
      title: appointment.title,
      duration,
      origin: 'calendar',
      employeeId: appointment.employeeId,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      status: appointment.status
    });
  };

  const handleUnscheduledDragStart = (item: UnscheduledItem) => {
    setDraggedItem({
      id: item.id,
      title: item.title,
      duration: item.duration,
      origin: 'unscheduled'
    });
  };

  const handleAddAppointmentData = (appointmentId: number) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      setSelectedAppointment(appointment);
      setIsFormOpen(true);
    }
  };

  const handleSaveAppointmentData = (appointmentId: number, data: any) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId
          ? { 
              ...apt, 
              customerName: data.customerName,
              customerPhone: data.customerPhone,
              customerEmail: data.customerEmail,
              service: data.service,
              serviceDetails: data.serviceDetails,
              customerLevel: data.customerLevel,
              notes: data.notes,
              price: data.price,
            }
          : apt
      )
    );
    
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูลการให้บริการลูกค้าถูกบันทึกเรียบร้อยแล้ว",
    });
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="font-sarabun antialiased flex h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopBar />
        
        <HeaderControls
          currentDate={currentDate}
          timeScale={timeScale}
          buildings={mockBuildings}
          selectedBuilding={selectedBuilding}
          employeeSearch={employeeSearch}
          onDateChange={setCurrentDate}
          onTimeScaleChange={setTimeScale}
          onBuildingFilterChange={setSelectedBuilding}
          onEmployeeSearchChange={setEmployeeSearch}
        />
        
          <ScheduleGrid
            employees={filteredEmployees}
            appointments={appointments}
            timeScale={timeScale}
            currentDate={currentDate}
            onAppointmentDrop={handleAppointmentDrop}
            onAppointmentDragStart={handleAppointmentDragStart}
            onAddAppointmentData={handleAddAppointmentData}
          />
        
        <UnscheduledPanel
          items={unscheduledItems}
          onDragStart={handleUnscheduledDragStart}
        />
      </div>

      <AppointmentDataForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        appointment={selectedAppointment}
        onSave={handleSaveAppointmentData}
      />
    </div>
  );
};

export default ScheduleBoard;
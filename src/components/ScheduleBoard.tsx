import React, { useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import HeaderControls from './HeaderControls';
import ScheduleGrid from './ScheduleGrid';
import UnscheduledPanel from './UnscheduledPanel';
import { Building, Employee, Appointment, UnscheduledItem, DraggedItem } from '@/types/schedule';
import { mockBuildings, mockEmployees, mockAppointments, mockUnscheduled } from '@/data/mockData';
import { minutesToTime, timeToMinutes } from '@/utils/timeUtils';

const ScheduleBoard = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 6)); // September 6, 2025
  const [timeScale, setTimeScale] = useState(30);
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [unscheduledItems, setUnscheduledItems] = useState<UnscheduledItem[]>(mockUnscheduled);
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);

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
    // TODO: Implement appointment data editing modal
    console.log('เพิ่มข้อมูลให้การนัดหมาย ID:', appointmentId);
    alert(`เพิ่มข้อมูลให้การนัดหมาย ID: ${appointmentId}`);
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
    </div>
  );
};

export default ScheduleBoard;
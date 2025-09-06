import React from 'react';
import { Building } from '@/types/schedule';
import { formatDateThai } from '@/utils/timeUtils';

interface HeaderControlsProps {
  currentDate: Date;
  timeScale: number;
  buildings: Building[];
  selectedBuilding: string;
  employeeSearch: string;
  onDateChange: (date: Date) => void;
  onTimeScaleChange: (scale: number) => void;
  onBuildingFilterChange: (buildingId: string) => void;
  onEmployeeSearchChange: (search: string) => void;
}

const HeaderControls: React.FC<HeaderControlsProps> = ({
  currentDate,
  timeScale,
  buildings,
  selectedBuilding,
  employeeSearch,
  onDateChange,
  onTimeScaleChange,
  onBuildingFilterChange,
  onEmployeeSearchChange,
}) => {
  const timeScaleOptions = [
    { value: 15, text: '15 นาที' },
    { value: 30, text: '30 นาที' },
    { value: 60, text: '60 นาที' }
  ];

  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    onDateChange(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    onDateChange(newDate);
  };

  return (
    <header className="bg-white border-b border-slate-200 p-3 flex items-center justify-between z-20 flex-shrink-0">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-1 border-r pr-4">
          <button
            onClick={handlePrevDay}
            className="p-2 rounded hover:bg-slate-100 text-slate-500"
          >
            <i className="fas fa-chevron-left fa-sm"></i>
          </button>
          <p className="text-sm font-semibold text-slate-700 w-48 text-center">
            {formatDateThai(currentDate)}
          </p>
          <button
            onClick={handleNextDay}
            className="p-2 rounded hover:bg-slate-100 text-slate-500"
          >
            <i className="fas fa-chevron-right fa-sm"></i>
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="building-filter" className="text-sm font-medium text-slate-600">
            อาคาร:
          </label>
          <select
            id="building-filter"
            value={selectedBuilding}
            onChange={(e) => onBuildingFilterChange(e.target.value)}
            className="w-32 rounded border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-1"
          >
            <option value="all">ทั้งหมด</option>
            {buildings.map(building => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="relative">
          <i className="fas fa-search text-slate-400 absolute top-1/2 left-2 -translate-y-1/2"></i>
          <input
            type="text"
            value={employeeSearch}
            onChange={(e) => onEmployeeSearchChange(e.target.value)}
            placeholder="ค้นหาพนักงาน..."
            className="w-40 rounded border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-1 pl-8"
          />
        </div>
        
        <div className="flex items-center space-x-2 border-l pl-4">
          <label htmlFor="time-scale" className="text-sm font-medium text-slate-600">
            มุมมอง:
          </label>
          <select
            id="time-scale"
            value={timeScale}
            onChange={(e) => onTimeScaleChange(parseInt(e.target.value))}
            className="rounded border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-1"
          >
            {timeScaleOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default HeaderControls;
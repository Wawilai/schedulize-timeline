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
    <header className="bg-white border-b border-border p-4 flex items-center justify-between z-20 flex-shrink-0 shadow-sm">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2 border-r border-border pr-6">
          <button
            onClick={handlePrevDay}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-primary transition-colors"
          >
            <i className="fas fa-chevron-left fa-sm"></i>
          </button>
          <p className="text-base font-bold text-foreground w-52 text-center">
            {formatDateThai(currentDate)}
          </p>
          <button
            onClick={handleNextDay}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-primary transition-colors"
          >
            <i className="fas fa-chevron-right fa-sm"></i>
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <label htmlFor="building-filter" className="text-sm font-semibold text-foreground">
            อาคาร:
          </label>
          <select
            id="building-filter"
            value={selectedBuilding}
            onChange={(e) => onBuildingFilterChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm transition-colors"
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
          <i className="fas fa-search text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"></i>
          <input
            type="text"
            value={employeeSearch}
            onChange={(e) => onEmployeeSearchChange(e.target.value)}
            placeholder="ค้นหาพนักงาน..."
            className="w-44 pl-10 pr-4 py-2 rounded-lg border border-border bg-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm transition-colors"
          />
        </div>
        
        <div className="flex items-center space-x-3 border-l border-border pl-6">
          <label htmlFor="time-scale" className="text-sm font-semibold text-foreground">
            มุมมอง:
          </label>
          <select
            id="time-scale"
            value={timeScale}
            onChange={(e) => onTimeScaleChange(parseInt(e.target.value))}
            className="px-3 py-2 rounded-lg border border-border bg-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm transition-colors"
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
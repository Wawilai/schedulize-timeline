import React from 'react';
import { UnscheduledItem } from '@/types/schedule';

interface UnscheduledPanelProps {
  items: UnscheduledItem[];
  onDragStart: (item: UnscheduledItem) => void;
}

const UnscheduledPanel: React.FC<UnscheduledPanelProps> = ({ items, onDragStart }) => {
  const handleDragStart = (e: React.DragEvent, item: UnscheduledItem) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ ...item, origin: 'unscheduled' }));
    onDragStart(item);
  };

  return (
    <footer className="bg-white border-t border-slate-200 h-[250px] flex flex-col flex-shrink-0">
      <div className="p-3 border-b">
        <h3 className="font-bold text-slate-700">รายการที่ยังไม่จัดตาราง</h3>
      </div>
      <div className="p-3 space-y-2 overflow-y-auto custom-scrollbar">
        {items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            className="bg-slate-50 border border-slate-200 p-2 rounded cursor-grab active:cursor-grabbing flex justify-between items-center hover:shadow-sm transition-shadow"
          >
            <div>
              <p className="font-semibold text-slate-800">{item.title}</p>
              <p className="text-xs text-slate-500">{item.duration} นาที</p>
            </div>
            <span className={`text-xs font-bold ${
              item.priority === 'High' ? 'text-red-500' : 'text-slate-400'
            }`}>
              {item.priority}
            </span>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default UnscheduledPanel;
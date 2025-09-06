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
    <footer className="bg-white border-t border-border h-[250px] flex flex-col flex-shrink-0 shadow-sm">
      <div className="p-4 border-b border-border bg-accent/30">
        <h3 className="font-bold text-foreground text-base">รายการที่ยังไม่จัดตาราง</h3>
      </div>
      <div className="p-4 space-y-3 overflow-y-auto custom-scrollbar">
        {items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            className="bg-card border border-border p-3 rounded-lg cursor-grab active:cursor-grabbing flex justify-between items-center hover:shadow-md hover:border-primary/20 transition-all group"
          >
            <div>
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.duration} นาที</p>
            </div>
            <span className={`text-sm font-bold px-2 py-1 rounded-full ${
              item.priority === 'High' 
                ? 'bg-destructive/10 text-destructive' 
                : 'bg-muted text-muted-foreground'
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
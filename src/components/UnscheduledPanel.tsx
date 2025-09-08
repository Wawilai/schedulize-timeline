import React, { useState, useMemo } from 'react';
import { UnscheduledItem } from '@/types/schedule';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface UnscheduledPanelProps {
  items: UnscheduledItem[];
  onDragStart: (item: UnscheduledItem) => void;
}

const UnscheduledPanel: React.FC<UnscheduledPanelProps> = ({ items, onDragStart }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  const handleDragStart = (e: React.DragEvent, item: UnscheduledItem) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ ...item, origin: 'unscheduled' }));
    onDragStart(item);
  };

  return (
    <footer className="bg-white border-t border-border h-[250px] flex flex-col flex-shrink-0 shadow-sm">
      <div className="p-4 border-b border-border bg-accent/30">
        <div className="flex items-center justify-between gap-3 mb-2">
          <h3 className="font-bold text-foreground text-base">รายการที่ยังไม่จัดตาราง</h3>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="ค้นหารายการ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-8 text-sm"
          />
        </div>
      </div>
      <div className="p-4 space-y-3 overflow-y-auto custom-scrollbar">
        {filteredItems.map((item) => (
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
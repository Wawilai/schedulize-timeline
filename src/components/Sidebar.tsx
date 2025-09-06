import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-60 sidebar-dark border-r border-border flex flex-col flex-shrink-0 shadow-sm">
      <div className="h-12 border-b border-border">
        {/* Header content is now in the main top bar */}
      </div>
      <nav className="flex-grow p-4 space-y-4">
        <div>
          <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-sidebar-light">
            <i className="fas fa-home fa-fw text-sidebar-text"></i>
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-sidebar-light">
            <i className="fas fa-clock fa-fw text-sidebar-text"></i>
            <span>Recent</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-sidebar-light">
            <i className="fas fa-star fa-fw text-sidebar-text"></i>
            <span>Pinned</span>
          </a>
        </div>
        
        <div>
          <h3 className="px-3 text-xs font-semibold text-sidebar-text uppercase tracking-wider mb-2">
            Scheduling
          </h3>
          <div className="space-y-1">
            <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-sidebar-light">
              <i className="fas fa-tasks fa-fw text-sidebar-text"></i>
              <span>Resource Requirements</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-sidebar-light">
              <i className="fas fa-book fa-fw text-sidebar-text"></i>
              <span>Bookings</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-sidebar-light">
              <i className="fas fa-users fa-fw text-sidebar-text"></i>
              <span>Resources</span>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="px-3 text-xs font-semibold text-sidebar-text uppercase tracking-wider mb-2">
            Tools
          </h3>
          <div className="space-y-1">
            <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary border-l-4 border-primary font-semibold">
              <i className="fas fa-calendar-alt fa-fw"></i>
              <span>Schedule Board</span>
            </a>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
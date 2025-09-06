import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-60 sidebar-dark text-sidebar-light flex flex-col flex-shrink-0">
      <div className="h-12 border-b border-sidebar-text/20">
        {/* Header content is now in the main top bar */}
      </div>
      <nav className="flex-grow p-4 space-y-4">
        <div>
          <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-sidebar-text/10">
            <i className="fas fa-home fa-fw"></i>
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-sidebar-text/10">
            <i className="fas fa-clock fa-fw"></i>
            <span>Recent</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-sidebar-text/10">
            <i className="fas fa-star fa-fw"></i>
            <span>Pinned</span>
          </a>
        </div>
        
        <div>
          <h3 className="px-2 text-xs font-semibold text-sidebar-text uppercase tracking-wider">
            Scheduling
          </h3>
          <div className="mt-2 space-y-1">
            <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-sidebar-text/10">
              <i className="fas fa-tasks fa-fw"></i>
              <span>Resource Requirements</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-sidebar-text/10">
              <i className="fas fa-book fa-fw"></i>
              <span>Bookings</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-sidebar-text/10">
              <i className="fas fa-users fa-fw"></i>
              <span>Resources</span>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="px-2 text-xs font-semibold text-sidebar-text uppercase tracking-wider">
            Tools
          </h3>
          <div className="mt-2 space-y-1">
            <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md sidebar-darker text-white border-l-4 border-schedule-scheduled font-semibold">
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
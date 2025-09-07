import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gradient-to-b from-white to-gray-50/50 border-r border-border flex flex-col flex-shrink-0 shadow-lg backdrop-blur-sm">
      {/* Beautiful header section */}
      <div className="h-16 border-b border-border/50 flex items-center px-6 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <i className="fas fa-calendar-check text-white text-sm"></i>
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">Schedule Pro</h2>
            <p className="text-xs text-muted-foreground">Resource Planning</p>
          </div>
        </div>
      </div>

      <nav className="flex-grow p-6 space-y-6 overflow-y-auto">
        {/* Quick Actions */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Quick Access
          </h3>
          <a href="#" className="group flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 transition-all duration-200 text-foreground hover:shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors">
              <i className="fas fa-home text-blue-600 text-sm"></i>
            </div>
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="#" className="group flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-amber/10 hover:to-amber/5 transition-all duration-200 text-foreground hover:shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center transition-colors">
              <i className="fas fa-clock text-amber-600 text-sm"></i>
            </div>
            <span className="font-medium">Recent</span>
          </a>
          <a href="#" className="group flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald/10 hover:to-emerald/5 transition-all duration-200 text-foreground hover:shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center transition-colors">
              <i className="fas fa-star text-emerald-600 text-sm"></i>
            </div>
            <span className="font-medium">Favorites</span>
          </a>
        </div>
        
        {/* Scheduling Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            จัดการตาราง
          </h3>
          <a href="#" className="group flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple/10 hover:to-purple/5 transition-all duration-200 text-foreground hover:shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center transition-colors">
              <i className="fas fa-tasks text-purple-600 text-sm"></i>
            </div>
            <span className="font-medium">Resource Requirements</span>
          </a>
          <a href="#" className="group flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo/10 hover:to-indigo/5 transition-all duration-200 text-foreground hover:shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center transition-colors">
              <i className="fas fa-book text-indigo-600 text-sm"></i>
            </div>
            <span className="font-medium">Bookings</span>
          </a>
          <a href="#" className="group flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-cyan/10 hover:to-cyan/5 transition-all duration-200 text-foreground hover:shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-cyan-100 group-hover:bg-cyan-200 flex items-center justify-center transition-colors">
              <i className="fas fa-users text-cyan-600 text-sm"></i>
            </div>
            <span className="font-medium">Resources</span>
          </a>
        </div>
        
        {/* Tools Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            เครื่องมือ
          </h3>
          <a href="#" className="group flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-primary/15 to-primary/10 border border-primary/20 text-primary font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:from-primary/20 hover:to-primary/15">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <i className="fas fa-calendar-alt text-primary text-sm"></i>
            </div>
            <span>Schedule Board</span>
            <div className="ml-auto w-2 h-2 bg-primary rounded-full"></div>
          </a>
        </div>
      </nav>

      {/* Bottom section */}
      <div className="p-6 border-t border-border/50 bg-gradient-to-r from-gray-50 to-transparent">
        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
            <i className="fas fa-user text-gray-600 text-xs"></i>
          </div>
          <div>
            <p className="font-medium text-foreground">Admin User</p>
            <p className="text-xs">System Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
import React from 'react';

const TopBar = () => {
  return (
    <nav className="bg-gradient-to-r from-primary via-primary to-primary/95 text-white h-14 px-6 flex items-center justify-between z-30 flex-shrink-0 shadow-lg backdrop-blur-sm border-b border-primary/20">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <i className="fas fa-th-large text-white text-sm"></i>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">ระบบจัดตารางทรัพยากร</h1>
              <p className="text-xs text-white/80 -mt-1">Resource Scheduling System</p>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-1 text-xs bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white/90 font-medium">System Online</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Search */}
        <div className="hidden lg:flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
          <i className="fas fa-search text-white/70 text-sm"></i>
          <input 
            type="text" 
            placeholder="ค้นหา..." 
            className="bg-transparent text-white placeholder-white/60 text-sm border-none outline-none w-32"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          <button className="group p-2.5 rounded-lg hover:bg-white/15 transition-all duration-200 relative">
            <i className="fas fa-search text-white/90 group-hover:text-white group-hover:scale-110 transition-all duration-200"></i>
            <span className="lg:hidden absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">ค้นหา</span>
          </button>
          
          <button className="group p-2.5 rounded-lg hover:bg-white/15 transition-all duration-200 relative">
            <i className="far fa-clock text-white/90 group-hover:text-white group-hover:scale-110 transition-all duration-200"></i>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">เวลา</span>
          </button>
          
          <button className="group p-2.5 rounded-lg hover:bg-white/15 transition-all duration-200 relative">
            <i className="fas fa-plus text-white/90 group-hover:text-white group-hover:scale-110 transition-all duration-200"></i>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">เพิ่ม</span>
          </button>
          
          <button className="group p-2.5 rounded-lg hover:bg-white/15 transition-all duration-200 relative">
            <i className="fas fa-filter text-white/90 group-hover:text-white group-hover:scale-110 transition-all duration-200"></i>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">กรอง</span>
          </button>
        </div>

        <div className="w-px h-6 bg-white/20 mx-3"></div>

        {/* Profile Section */}
        <div className="flex items-center space-x-2">
          <button className="group p-2.5 rounded-lg hover:bg-white/15 transition-all duration-200 relative">
            <i className="far fa-bell text-white/90 group-hover:text-white group-hover:scale-110 transition-all duration-200"></i>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
              <span className="text-white text-xs">3</span>
            </div>
          </button>
          
          <button className="group p-2.5 rounded-lg hover:bg-white/15 transition-all duration-200 relative">
            <i className="far fa-question-circle text-white/90 group-hover:text-white group-hover:scale-110 transition-all duration-200"></i>
          </button>
          
          <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-3 py-2 hover:bg-white/15 transition-all duration-200 cursor-pointer backdrop-blur-sm">
            <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center">
              <i className="far fa-user text-white text-sm"></i>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-white/70 -mt-0.5">ผู้ดูแลระบบ</p>
            </div>
            <i className="fas fa-chevron-down text-white/70 text-xs hidden sm:block"></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
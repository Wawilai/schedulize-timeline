import React from 'react';

const TopBar = () => {
  return (
    <nav className="sidebar-dark text-white h-12 px-4 flex items-center justify-between z-30 flex-shrink-0">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold text-white">ทดสอบระบบ</h1>
        <span className="border-l border-sidebar-text h-6"></span>
        <span className="text-sidebar-light">Resource Scheduling</span>
      </div>
      <div className="flex items-center space-x-2 text-base">
        <button className="p-2 rounded-full hover:bg-sidebar-text/20">
          <i className="fas fa-search"></i>
        </button>
        <button className="p-2 rounded-full hover:bg-sidebar-text/20">
          <i className="far fa-clock"></i>
        </button>
        <button className="p-2 rounded-full hover:bg-sidebar-text/20">
          <i className="fas fa-plus"></i>
        </button>
        <button className="p-2 rounded-full hover:bg-sidebar-text/20">
          <i className="fas fa-filter"></i>
        </button>
        <span className="border-l border-sidebar-text h-6 mx-2"></span>
        <button className="p-2 rounded-full hover:bg-sidebar-text/20">
          <i className="far fa-question-circle"></i>
        </button>
        <button className="p-2 rounded-full hover:bg-sidebar-text/20">
          <i className="far fa-user-circle"></i>
        </button>
      </div>
    </nav>
  );
};

export default TopBar;
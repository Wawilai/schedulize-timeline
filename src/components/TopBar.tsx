import React from 'react';

const TopBar = () => {
  return (
    <nav className="bg-primary text-white h-12 px-4 flex items-center justify-between z-30 flex-shrink-0 shadow-sm">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold text-white">ทดสอบระบบ</h1>
        <span className="border-l border-white/20 h-6"></span>
        <span className="text-white/90">Resource Scheduling</span>
      </div>
      <div className="flex items-center space-x-1 text-base">
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <i className="fas fa-search"></i>
        </button>
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <i className="far fa-clock"></i>
        </button>
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <i className="fas fa-plus"></i>
        </button>
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <i className="fas fa-filter"></i>
        </button>
        <span className="border-l border-white/20 h-6 mx-2"></span>
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <i className="far fa-question-circle"></i>
        </button>
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <i className="far fa-user-circle"></i>
        </button>
      </div>
    </nav>
  );
};

export default TopBar;
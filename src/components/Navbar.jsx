// src/components/TopNavBar.jsx
import React from 'react';

const Navbar = ({handleReset, handleSave}) => {
  return (
    <header className="bg-blue-500 p-4 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo/Title */}
        <div className="text-white text-2xl font-bold">
          <span>Image Editor</span>
        </div>

        {/* Navigation Links */}
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-400" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

// src/components/TopNavBar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-blue-500 p-4 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo/Title */}
        <div className="text-white text-2xl font-bold">
          <span>Image Editor</span>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6 text-white">
            <li>
              <a href="#upload" className="hover:text-gray-300">Upload</a>
            </li>
            <li>
              <a href="#tools" className="hover:text-gray-300">Tools</a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-300">About</a>
            </li>
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-400">Save</button>
          <button className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-400">Reset</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

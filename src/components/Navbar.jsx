import React, { useState } from 'react';
import DimensionModal from '../DimensionModal.jsx';

const Navbar = ({ width, height, handleReset }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="bg-blue-500 p-4 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-white text-2xl font-bold">
          <span>DICOM Image Viewer & Editor</span>
        </div>

        <button
          className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-400"
          onClick={openModal}
        >
          Dimension Converter
        </button>
        <button className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-400" onClick={handleReset}>Upload Other Image</button>

      </div>

      <DimensionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        width={width}
        height={height}
      />
    </header>
  );
};

export default Navbar;

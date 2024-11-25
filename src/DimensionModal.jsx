import React from 'react';

// Conversion functions
const convertToMM = (pixels) => pixels * 0.264583; // 1 pixel = 0.264583 mm
const convertToCM = (pixels) => pixels * 0.0264583; // 1 pixel = 0.0264583 cm
const convertToM = (pixels) => pixels * 0.000264583; // 1 pixel = 0.000264583 m

const DimensionModal = ({ isOpen, onClose, width, height }) => {
    if (!isOpen) return null; // Don't render if modal is closed

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Image Dimensions</h2>
                <div>
                    <p><strong>Width:</strong> {width} px</p>
                    <p><strong>Height:</strong> {height} px</p>
                </div>

                <div className="mt-4">
                    <p><strong>Width in Milimeters:</strong> {convertToMM(width).toFixed(2)} mm </p>
                    <p><strong>Height in Milimeters:</strong> {convertToMM(height).toFixed(2)} mm </p>
                </div>

                <div className="mt-4">
                    <p><strong>Width in Centi-metres:</strong> {convertToCM(width).toFixed(2)} cm </p>
                    <p><strong>Height in Centi-metres:</strong> {convertToCM(height).toFixed(2)} cm </p>
                </div>

                <div className="mt-4">
                    <p><strong>Width in Metres:</strong> {convertToM(width).toFixed(4)} m</p>
                    <p><strong>Height in Metres:</strong> {convertToM(height).toFixed(4)} m</p>
                </div>

                <button
                    onClick={onClose}
                    className="mt-4 flex bg-red-500 text-white justify-center px-4 py-2 rounded-md hover:bg-red-400"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DimensionModal;

import React, { useState, useRef } from "react";
import { FaSun, FaAdjust, FaSearch, FaCrop } from "react-icons/fa";
import Cropper from "react-easy-crop";
import { MdWindow } from "react-icons/md";
import { IoMdStats } from "react-icons/io";

const ImageEditor = ({ image }) => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [zoom, setZoom] = useState(100);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const [window, setWindow] = useState(100);
  const [level, setLevel] = useState(0);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoomCrop, setZoomCrop] = useState(1);
  const [isCropping, setIsCropping] = useState(false);

  const canvasRef = useRef(null); // Reference to canvas for saving image

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastPosition.x;
    const deltaY = e.clientY - lastPosition.y;
    setPosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleReset = () => {
    setBrightness(100);
    setContrast(100);
    setZoom(100);
    setPosition({ x: 0, y: 0 });
    setWindow(100);
    setLevel(0);
    setIsCropping(false);
  };

  const calculateBrightnessContrast = () => {
    const brightnessValue = (level / window) * 100;
    const contrastValue = (window / 100) * 100;
    return { brightness: brightnessValue, contrast: contrastValue };
  };

  const { brightness: calcBrightness, contrast: calcContrast } =
    calculateBrightnessContrast();

  // Save image functionality
  const handleSave = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    if (canvas && image) {
      // Create an Image object
      const img = new Image();
      img.src = image;
      
      img.onload = () => {
        // Set canvas size based on image dimensions
        canvas.width = img.width;
        canvas.height = img.height;
  
        // Apply transformations like brightness, contrast, and zoom to canvas context
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
        ctx.drawImage(img, position.x, position.y, img.width * (zoom / 100), img.height * (zoom / 100));
  
        // If cropping is enabled, crop the image
        if (isCropping) {
          ctx.drawImage(img, crop.x, crop.y, zoomCrop * img.width, zoomCrop * img.height, 0, 0, canvas.width, canvas.height);
        }
  
        // Convert canvas to a data URL (image URL)
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "edited-image.png";  // Name the saved image
        link.click();
        alert("Image has been saved!");  // Alert after download
      };
    }
  };
  <canvas ref={canvasRef} style={{ display: "none" }} />

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-100">
      {/* Main Image Display Area */}
      <div
        className={`flex-1 flex justify-center items-center p-4 transition-all duration-300 ${
          image ? "w-[calc(100%-16rem)]" : "w-full"
        }`}
        style={{
          filter: `brightness(${brightness}%) contrast(${contrast}%)`,
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom / 100})`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {isCropping ? (
          <Cropper
            image={image}
            crop={crop}
            zoom={zoomCrop}
            aspect={4 / 3} // Adjust the cropping aspect ratio
            onCropChange={setCrop}
            onZoomChange={setZoomCrop}
          />
        ) : (
          <img
            src={image}
            alt="Editable Preview"
            className="rounded-lg shadow-lg max-w-full max-h-full"
          />
        )}
      </div>

      {/* Sidebar Panel */}
      {image && (
        <aside className="w-64 h-full bg-gray-800 text-white shadow-lg flex-shrink-0">
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">Edit Image</h2>

            {/* Brightness Control */}
            <div className="flex items-center space-x-3">
              <FaSun className="text-yellow-400 text-lg" />
              <div className="w-full">
                <label className="block text-sm">Brightness</label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={brightness}
                  onChange={(e) => setBrightness(e.target.value)}
                  className="w-full"
                />
                <span className="text-sm">{brightness}%</span>
              </div>
            </div>

            {/* Contrast Control */}
            <div className="flex items-center space-x-3">
              <FaAdjust className="text-blue-400 text-lg" />
              <div className="w-full">
                <label className="block text-sm">Contrast</label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={contrast}
                  onChange={(e) => setContrast(e.target.value)}
                  className="w-full"
                />
                <span className="text-sm">{contrast}%</span>
              </div>
            </div>

            {/* Zoom Control */}
            <div className="flex items-center space-x-3">
              <FaSearch className="text-green-400 text-lg" />
              <div className="w-full">
                <label className="block text-sm">Zoom</label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={zoom}
                  onChange={(e) => setZoom(e.target.value)}
                  className="w-full"
                />
                <span className="text-sm">{zoom}%</span>
              </div>
            </div>

            {/* Window Control */}
            <div className="flex items-center space-x-3">
              <MdWindow className="text-green-400 text-lg" />
              <div className="w-full">
                <label className="block text-sm">Window</label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={window}
                  onChange={(e) => setWindow(e.target.value)}
                  className="w-full"
                />
                <span className="text-sm">{window}</span>
              </div>
            </div>

            {/* Level Control */}
            <div className="flex items-center space-x-3">
              <IoMdStats className="text-yellow-400 text-lg" />
              <div className="w-full">
                <label className="block text-sm">Level</label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full"
                />
                <span className="text-sm">{level}</span>
              </div>
            </div>

            {/* Cropping Button */}
            <button
              onClick={() => setIsCropping(!isCropping)}
              className="bg-blue-500 px-4 py-2 rounded-md w-full hover:bg-blue-600"
            >
              {isCropping ? "Finish Cropping" : "Start Cropping"}
            </button>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
            >
              Reset Image
            </button>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
            >
              Save Image
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};

export default ImageEditor;

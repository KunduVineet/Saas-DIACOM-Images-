import React, { useState, useRef } from "react";
import { MdWindow } from "react-icons/md";
import { IoMdStats } from "react-icons/io";
import Cropper from "react-easy-crop";

const ImageEditor = ({ image }) => {
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [zoom, setZoom] = useState(100);
    const [zoomCrop, setZoomCrop] = useState(1);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [cropArea, setCropArea] = useState(null);
    const [isCropping, setIsCropping] = useState(false);

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

    const [window, setWindow] = useState(100);
    const [level, setLevel] = useState(0);

    const canvasRef = useRef(null);

    // Handle mouse drag
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

    // Reset all adjustments
    const handleReset = () => {
        setBrightness(100);
        setContrast(100);
        setZoom(100);
        setPosition({ x: 0, y: 0 });
        setWindow(100);
        setLevel(0);
        setIsCropping(false);
    };

    // Calculate brightness and contrast dynamically
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
        if (!canvas) return alert("Canvas is not available!");

        const ctx = canvas.getContext("2d");
        if (!ctx) return alert("Could not get canvas context!");

        const img = new Image();
        img.src = imageURL;

        img.onload = () => {
            canvas.width = Math.min(img.width, 1920);
            canvas.height = Math.min(img.height, 1080);

            ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
            ctx.drawImage(
                img,
                position.x,
                position.y,
                img.width * (zoom / 100),
                img.height * (zoom / 100)
            );

            if (isCropping && cropArea) {
                const { x, y, width, height } = cropArea;
                ctx.drawImage(img, x, y, width, height, 0, 0, canvas.width, canvas.height);
            }

            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "edited-image.png";
            link.click();
            alert("Image has been saved!");
        };
    };

    const handleCropComplete = (croppedArea, croppedAreaPixels) => {
        setCropArea(croppedAreaPixels);
    };

    const imageURL = image instanceof File ? URL.createObjectURL(image) : image;

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-gray-100">
            {/* Main Display */}
            <div
                className="flex-1 flex justify-center items-center p-4 transition-all duration-300"
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
                        image={imageURL}
                        crop={crop}
                        zoom={zoomCrop}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onCropComplete={handleCropComplete}
                        onZoomChange={setZoomCrop}
                    />
                ) : (
                    <img
                        src={imageURL}
                        alt="Editable Preview"
                        className="rounded-lg shadow-lg max-w-full max-h-full"
                        style={{ objectFit: "contain" }}
                    />
                )}
                <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>

            {/* Sidebar */}
            {image && (
                <aside className="w-64 h-screen bg-gray-800 text-white shadow-lg flex-shrink-0">
                    <div className="p-6 space-y-6">
                        <h2 className="text-xl font-semibold">Edit Image</h2>

                        {/* Brightness */}
                        <div className="flex items-center space-x-3">
                        <img
                            src="./brightness.svg" // Replace with the correct path or URL
                            alt="Brightness Icon"
                            className="w-6 h-6"
                        />
                        <div className="w-full">
                            <label className="block text-sm">Brightness</label>
                            <input
                                id="brightness"
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

                        {/* Contrast */}
                        <div className="flex items-center space-x-3">
                        <img
                            src="./contrast.svg" // Replace with the actual path to the contrast icon image
                            alt="Contrast Icon"
                            className="w-6 h-6"
                        />
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

                        {/* Zoom */}
                        <div className="flex items-center space-x-3">
                        <img
                            src="./search.svg" // Replace with the actual path to the zoom icon image
                            alt="Zoom Icon"
                            className="w-6 h-6"
                        />
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
                        {/* Cropping Toggle */}
                        <button
                            onClick={() => setIsCropping(!isCropping)}
                            className="bg-blue-500 px-4 py-2 w-full"
                        >
                            {isCropping ? "Finish Cropping" : "Start Cropping"}
                        </button>

                        {/* Reset */}
                        <button onClick={handleReset} className="bg-red-500 px-4 py-2 w-full">
                            Reset
                        </button>

                        {/* Save */}
                        <button onClick={handleSave} className="bg-green-500 px-4 py-2 w-full">
                            Save Image
                        </button>
                    </div>
                </aside>
            )}
        </div>
    );
};

export default ImageEditor;

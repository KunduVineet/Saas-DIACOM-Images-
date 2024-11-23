import React, { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Navbar from "./Navbar";
import ImageEditor from "./ImageEditor";

const Main = () => {
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null); // reference for the canvas

  // Handle image drop
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result); // Set the image in state
      reader.readAsDataURL(file);
    }
  };

  // Handlers for saving and resetting image
  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png"); // Convert canvas to image URL
      link.download = "edited-image.png"; // Download file
      link.click();
    }
  };

  const handleReset = () => {
    setImage(null); // Reset the image state
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="bg-gray-100 h-screen">
      <Navbar handleSave={handleSave} handleReset={handleReset} />

      {/* Image Upload or Editor */}
      {!image ? (
        <div
          {...getRootProps()}
          className="h-full flex items-center justify-center border-4 border-dashed border-gray-300 p-16 rounded-lg cursor-pointer text-center"
        >
          <input {...getInputProps()} />
          <div className="text-center">
            <img
              src="/drag-drop.svg"
              alt="Upload"
              className="mx-auto mb-4"
              width="450"
              height="450"
            />
            <p className="text-gray-600">Drag & Drop or Click to Upload</p>
          </div>
        </div>
      ) : (
        <ImageEditor image={image} canvasRef={canvasRef} />
      )}
    </div>
  );
};

export default Main;

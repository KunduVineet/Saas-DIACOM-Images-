import React, { useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import Navbar from './Navbar';
import ImageEditor from './ImageEditor';
import cornerstone from 'cornerstone-core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'; // Adjust path
import dicomParser from 'dicom-parser';

// Link dicomParser to cornerstoneWADOImageLoader
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

cornerstoneWADOImageLoader.configure({
  useWebWorkers: true,
  webWorkerPath: '/cornerstoneWADOImageLoaderWebWorker.js',
});

const Main = () => {
  const [image, setImage] = useState(null);
  const [dicomData, setDicomData] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    

    setLoading(true);
    setError(null);

    // Improved DICOM file detection
    const isDicom = file.type === 'application/dicom' || file.name.endsWith('.dcm');

    if (isDicom) {
      const fileReader = new FileReader();

      fileReader.onload = async (event) => {
        const arrayBuffer = event.target.result;

        // Ensure the file is read as a Uint8Array
        const byteArray = new Uint8Array(arrayBuffer);

        try {
          const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
          console.log('ImageId:', imageId); // Log the imageId

          const image = await cornerstone.loadAndCacheImage(imageId);
          console.log('Loaded Image:', image); // Log the loaded image

          setDicomData(image);
          setDimensions({ width: image.width, height: image.height });
          setLoading(false);
        } catch (error) {
          console.error('Failed to load DICOM image:', error);
          setError('Failed to load DICOM image. Please try again.');
          setLoading(false);
        }
      };

      fileReader.onerror = (event) => {
        console.error('File reading error:', event.target.error);
        setError('Error reading DICOM file. Please try again.');
        setLoading(false);
      };

      fileReader.readAsArrayBuffer(file); // This reads the file as an ArrayBuffer
    } else {
      // For non-DICOM images, load them directly
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result); // Make sure `setImage` is defined
        setLoading(false);
      };

      reader.onerror = (event) => {
        console.error('File reading error:', event.target.error);
        setError('Error reading image file. Please try again.');
        setLoading(false);
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setDimensions({ width: img.width, height: img.height });
      };
    }
  }, [image]);

  useEffect(() => {
    if (dicomData && canvasRef.current) {
      cornerstone.enable(canvasRef.current);
      console.log('Cornerstone initialized on canvas');
      try {
        cornerstone.displayImage(canvasRef.current, dicomData);

        // Optional: Apply windowing settings if available
        const { windowWidth, windowCenter } = dicomData;
        if (windowWidth && windowCenter) {
          const viewport = cornerstone.getViewport(canvasRef.current);
          viewport.voi.windowWidth = windowWidth;
          viewport.voi.windowCenter = windowCenter;
          cornerstone.setViewport(canvasRef.current, viewport);
          console.log('does the image reach till here');
        }
      } catch (err) {
        setError('Failed to display DICOM image. Please try again.');
        console.error('Error displaying DICOM:', err);
      }
    }
  }, [dicomData]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.dcm, image/*', // Accept DICOM and all image types
  });

  const handleReset = () => {
    setImage(null); // Reset the image state
  };

  return (
    <div className="bg-gray-100 h-screen">
      <Navbar width={dimensions.width} height={dimensions.height} handleReset={handleReset }/>

      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-600">{error}</p>
        </div>
      ) : !image && !dicomData ? (
        <div
          {...getRootProps()}
          className="h-full flex items-center justify-center border-4 border-dashed border-gray-300 p-16 rounded-lg cursor-pointer text-center"
        >
          <input {...getInputProps()} disabled={loading} />
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
      ) : dicomData ? (
        <div className="flex items-center justify-center h-full">
          <canvas
            ref={canvasRef}
            className="dicom-canvas"
            style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
          />
        </div>
      ) : (
        <ImageEditor image={image} canvasRef={canvasRef} />
      )}
    </div>
  );
};

export default Main;

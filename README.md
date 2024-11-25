# Image Editor Application  

## Table of Contents  
- [Project Overview](#project-overview)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Project Structure](#project-structure)  
- [Getting Started](#getting-started)  
- [Usage Guide](#usage-guide)  
- [Component Breakdown](#component-breakdown) 
- [Errors Faced ](#errors-faced)  
- [Troubleshooting](#troubleshooting)  

---

## Project Overview  

The **Image Editor Application** is a web-based tool designed for viewing, editing, and analyzing both standard image files and medical images in DICOM format. With features like brightness adjustment, zooming, cropping, and dimension conversion, this tool is a versatile platform for image manipulation and analysis.  

---

## Features  

### General Image Handling  
- Drag and drop image uploading.  
- Displays both standard and DICOM image formats.  
- Dynamically adjusts image brightness, contrast, and zoom.  

### DICOM-Specific Features  
- Support for loading and parsing DICOM files using Cornerstone.  
- Windowing and leveling adjustments for medical imaging analysis.  

### Image Editing  
- Cropping and saving edited images.  
- Sidebar controls for real-time parameter adjustments.  

### Dimension Conversion  
- Converts image dimensions from pixels to millimeters (mm), centimeters (cm), and meters (m).  

---

## Technologies Used  
- **React**: Frontend framework.  
- **Tailwind CSS**: Styling.  
- **cornerstone-core** and **cornerstone-wado-image-loader**: DICOM handling.  
- **react-dropzone**: File drag-and-drop functionality.  
- **react-easy-crop**: Cropping functionality.  

---

## Project Structure  

```  
src/  
│  
├── components/  
│   ├── Navbar.jsx              # Header and navigation bar  
│   ├── DimensionModal.jsx      # Converts dimensions to mm, cm, and m  
│   └── ImageEditor.jsx         # Core image editing logic  
│  
├── App.jsx                     # Main application file  
├── Main.jsx                    # Central file for image handling  
├── styles/  
│   └── index.css               # Tailwind configuration  
├── assets/                     # Static assets like icons and images  
└── index.js                    # Entry point  
```  

---

## Getting Started  

1. **Clone the Repository**  
   ```bash  
   git clone https://github.com/your-repo/image-editor.git  
   cd image-editor  
   ```  

2. **Install Dependencies**  
   ```bash  
   npm install  
   ```  

3. **Run the Application**  
   ```bash  
   npm start  
   ```  

4. **Access the Application**  
https://saas-diacom-images-8xun.vercel.app/
---

## Usage Guide  

### Uploading Images  
- Drag and drop any image (JPG, PNG, or DICOM) into the main window.  
- Alternatively, click the upload area to select a file.  

### Editing Images  
- Adjust brightness, contrast, zoom, and position using the sidebar controls.  
- Toggle cropping mode to define and save cropped areas.  

### DICOM Image Features  
- Upload a `.dcm` file to view medical images.  
- Use window and level sliders for better visibility of DICOM details.  

### Dimension Conversion  
- Click **Dimension Converter** on the Navbar to see converted dimensions.  

---

## Component Breakdown  

### 1. **Navbar**  
The `Navbar` component is a simple yet functional navigation bar that allows users to interact with the DICOM image viewer and editor. It includes a button to open a modal for dimension conversion and another button to reset the uploaded image. Below is a detailed breakdown of how it works:

## 1. **Imports**:
- **React and useState**: `useState` is used to manage the modal's open/close state.
- **DimensionModal**: This is a custom component that is used to display the dimension converter modal when triggered.

## 2. **State Management (`isModalOpen`)**:
- `isModalOpen`: A state variable used to control the visibility of the dimension converter modal. Initially, it's set to `false` (the modal is closed).
- **openModal**: A function that sets `isModalOpen` to `true`, thus opening the modal.
- **closeModal**: A function that sets `isModalOpen` to `false`, thus closing the modal.

## 3. **Navbar Structure**:
The navbar contains:
- **Title**: A heading (`DICOM Image Viewer & Editor`) styled using Tailwind CSS classes (`text-white`, `text-2xl`, `font-bold`).
- **Dimension Converter Button**: This button opens the dimension converter modal when clicked. It’s styled with a green background (`bg-green-500`) and changes color on hover (`hover:bg-green-400`).
- **Upload Other Image Button**: This button triggers the `handleReset` function passed as a prop to reset the uploaded image. It’s styled with a red background (`bg-red-500`) and changes color on hover (`hover:bg-red-400`).

## 4. **Modal (`DimensionModal`)**:
- **isOpen**: The `isOpen` prop controls whether the `DimensionModal` is shown or hidden. It is tied to the `isModalOpen` state.
- **onClose**: The `onClose` prop is passed the `closeModal` function, so the modal can be closed by clicking a close button or other close triggers inside the modal.
- **width and height**: These props are passed from the parent component (likely the `Main` component) and provide the dimensions of the image to the `DimensionModal` for conversion.

## 5. **Rendering**:
The navbar has two main actions:
- **Dimension Converter Button**: Opens the dimension conversion modal when clicked.
- **Upload Other Image Button**: Calls the `handleReset` function to reset the image being displayed, allowing the user to upload a new image.

## 6. **Styling**:
The navbar is styled using Tailwind CSS classes:
- `bg-blue-500`: A blue background for the navbar.
- `p-4`: Padding around the content.
- `shadow-md`: Adds a shadow effect to the navbar.
- `max-w-7xl mx-auto`: Centers the content and sets a maximum width for the navbar.
- Buttons are styled with padding, rounded corners, and color-changing effects on hover.

## How It Works:
- When the user clicks the **Dimension Converter** button, the `openModal` function is called, setting `isModalOpen` to `true`, which triggers the modal to appear.
- When the user clicks the **Upload Other Image** button, the `handleReset` function is called, which resets the uploaded image and allows the user to upload a new one.
- The `DimensionModal` component receives the image's `width` and `height` and can be used to convert these dimensions from pixels to other units like mm, cm, and meters (assuming this functionality is implemented inside the modal).

## Summary:
This `Navbar` component serves as a central control for image interactions:
- It lets users open the dimension converter modal to convert image dimensions.
- It provides a way to reset the image upload process by calling `handleReset`.
- It uses Tailwind CSS for easy and responsive styling.


### 2. **Main Component**  
In this section of code there's a React component that allows users to upload images (both DICOM and non-DICOM) and display them on a canvas using Cornerstone, a JavaScript library for **Medical Image Viewing**. It includes features like **Drag-and-Drop** file upload, dynamic image rendering, and error handling. Here's a detailed breakdown of each part:

## 1. **Imports**:
- `React, useState, useEffect, useRef`: React hooks are used for state management, side effects, and accessing DOM elements.
- `useDropzone`: A hook from the `react-dropzone` library that handles drag-and-drop file uploads.
- `Navbar`: A custom component for the navigation bar.
- `ImageEditor`: A custom component for editing images.
- `cornerstone-core`, `cornerstone-wado-image-loader`, `dicom-parser`: Libraries for handling medical DICOM images. They provide functionality to load and display DICOM files.

## 2. **Cornerstone Configuration**:
- **cornerstoneWADOImageLoader** is configured with a worker script (`cornerstoneWADOImageLoaderWebWorker.js`) to enable web worker processing for image loading. 
- **dicomParser** is used for parsing DICOM metadata (such as window width, window center for medical images).

## 3. **State Management**:
- `image`: Stores the image (for non-DICOM images).
- `dicomData`: Stores the loaded DICOM image data.
- `dimensions`: Stores the dimensions (width and height) of the image.
- `loading`: Tracks whether the image is being loaded.
- `error`: Stores any error messages related to loading the image.

## 4. **File Upload (`onDrop`)**:
The `onDrop` function is triggered when the user uploads a file via drag-and-drop or file picker.
- It checks whether the file is a DICOM file (by file type or extension).
- If it's a DICOM file, it uses a `FileReader` to read the file as an `ArrayBuffer` and then loads it with Cornerstone using `cornerstoneWADOImageLoader`.
- For non-DICOM images, it uses the `FileReader` to read the image file and stores it as a data URL (base64 encoded string).

## 5. **DICOM Image Processing**:
- For DICOM files, after reading the file as an `ArrayBuffer`, the image is loaded using `cornerstone.loadAndCacheImage`.
- `cornerstone.displayImage` is used to render the image on a `<canvas>` element.
- DICOM windowing settings (`windowWidth` and `windowCenter`) are applied to adjust the image's contrast/brightness based on the metadata.
  
## 6. **Image Dimensions**:
- After a non-DICOM image is loaded (via `FileReader`), the image’s dimensions (width and height) are extracted and stored in the `dimensions` state.
- The `useEffect` hook runs whenever the `image` state changes and updates the `dimensions` state accordingly.
- Similarly, for DICOM images, the `cornerstone` library provides the image dimensions, which are stored in `dimensions`.

## 7. **Canvas Setup**:
- A `canvasRef` is used to reference the `<canvas>` element where the image will be displayed.
- When the DICOM image is loaded, the `useEffect` hook enables Cornerstone on the canvas and displays the image.

## 8. **Dropzone (`react-dropzone`)**:
- `useDropzone` is used to manage the drag-and-drop file upload functionality. The `accept` option ensures only `.dcm` (DICOM) files and standard image files are accepted.
- The `getRootProps` and `getInputProps` functions are used to set up the drop zone area (where users can drag and drop files).
- If no image or DICOM data is available, a drag-and-drop UI is displayed to prompt the user to upload a file.

## 9. **Loading and Error States**:
- The `loading` state shows a loading indicator when the image is being processed.
- The `error` state displays error messages if the image fails to load or if there are issues with reading the file.

## 10. **Image Reset (`handleReset`)**:
- `handleReset` resets the `image` state, effectively clearing the current image and allowing the user to upload a new one.

## 11. **Rendering**:
The component renders different UI elements based on the current state:
- **Loading State**: Displays a loading message.
- **Error State**: Displays an error message.
- **Upload UI**: Displays a drag-and-drop area if no image or DICOM data is present.
- **Canvas Display**: Displays the DICOM image on a `<canvas>` element using Cornerstone.
- **Image Editor**: Displays the `ImageEditor` component for non-DICOM images.


### 3. **ImageEditor**  
The `ImageEditor` component you provided is a comprehensive image manipulation tool that allows users to adjust brightness, contrast, zoom, and window/level settings, crop images, and save their edits. Here's a breakdown of its core functionality:

## **State Management:**
1. **Image State**:
   - **`brightness`, `contrast`, `zoom`, `window`, `level`**: These states store the current values for various image adjustments (brightness, contrast, zoom, etc.).
   - **`zoomCrop`, `crop`**: These states control the cropping aspect of the image. The `crop` state holds the crop position, while `zoomCrop` controls the zoom for cropping.
   - **`isCropping`**: Boolean state to toggle cropping mode on or off.
   - **`isDragging`, `position`, `lastPosition`**: States for handling mouse dragging to reposition the image.
   - **`cropArea`**: Stores the final crop area dimensions when cropping is completed.
   - **`canvasRef`**: A reference to the `<canvas>` element used for saving the image.

## **Functions and Handlers:**
1. **Mouse Dragging:**
   - `handleMouseDown`: Initiates dragging when the user clicks on the image.
   - `handleMouseMove`: Moves the image as the mouse is dragged, updating the position.
   - `handleMouseUp`: Stops dragging when the mouse button is released.

2. **Reset Functionality:**
   - `handleReset`: Resets all transformations (brightness, contrast, zoom, window, level) and clears the crop area.

3. **Image Adjustments:**
   - `calculateBrightnessContrast`: Dynamically calculates brightness and contrast values based on the `level` and `window` state.
   - `handleSave`: Draws the image onto the canvas with applied transformations (brightness, contrast, zoom, crop) and allows the user to download the edited image.
   
4. **Cropping:**
   - **`Cropper` Component**: The `Cropper` component is conditionally rendered when `isCropping` is `true`. It allows the user to select a portion of the image to crop. The crop is applied based on the `cropArea` state.
   - `handleCropComplete`: Updates the crop area after the user completes the cropping action.

## **Rendering:**
- **Main Display:**
  - The image is displayed and can be adjusted (brightness, contrast, zoom, window) and dragged around using mouse events.
  - If cropping is enabled, the `Cropper` component is used to allow the user to select the crop area.
  - The `canvasRef` holds the `<canvas>` element used to create and download the edited image.

- **Sidebar:**
  - The sidebar provides controls to adjust the image settings like brightness, contrast, zoom, window, and level using input ranges (`<input type="range">`).
  - It also includes buttons to toggle cropping (`Start Cropping`/`Finish Cropping`), reset all adjustments (`Reset`), and save the edited image (`Save Image`).

## **Styling:**
- Tailwind CSS is used for styling, with classes like `bg-gray-100`, `bg-gray-800`, and `bg-green-500` to style the background, buttons, and layout.
- The layout is responsive, with the image editor occupying the remaining space and the sidebar fixed to the side for easy adjustments.

## **Image URL Handling:**
- The `imageURL` variable checks whether the `image` prop is a file (`File` object) and creates a URL using `URL.createObjectURL(image)` to display it. If the image is already a URL, it uses that directly.

## **Key Features:**
- **Zoom**: Users can zoom in/out of the image using a range input.
- **Brightness/Contrast**: Users can adjust the brightness and contrast of the image with sliders.
- **Window/Level**: These are likely advanced controls for medical image processing (e.g., for DICOM images). Window adjusts the contrast range, and Level adjusts the brightness level.
- **Cropping**: Users can start/finish cropping the image with a `Cropper` component.
- **Save**: The image can be saved with the applied adjustments, including cropping.

## **Next Steps:**
- **Improve the UI**: Ensure that the icons (brightness, contrast, zoom) are properly linked to actual image adjustments.
- **Handle Edge Cases**: Implement logic for cases where the crop area exceeds the image bounds or if the zoom level becomes too small or too large.
- **Save File Type**: Consider allowing the user to select the output file format (e.g., PNG, JPEG) when saving the image.


### 4. **DimensionModal**  
The `DimensionModal` component you provided is designed to display the dimensions of an image in various units (pixels, millimeters, centimeters, and meters). It uses a modal to show the dimensions and allows the user to close it. Here's a breakdown of the component:

## **Key Features:**

1. **Conversion Functions:**
   - The `convertToMM`, `convertToCM`, and `convertToM` functions convert pixel values to millimeters, centimeters, and meters respectively.
   - These functions are based on the following conversions:
     - 1 pixel = 0.264583 mm
     - 1 pixel = 0.0264583 cm
     - 1 pixel = 0.000264583 m

2. **Conditional Rendering:**
   - The modal only renders when `isOpen` is `true`. If `isOpen` is `false`, the component returns `null`, ensuring that the modal is not shown.

3. **Modal Layout:**
   - The modal is displayed in the center of the screen, with a semi-transparent dark background (`bg-opacity-50`) that prevents interaction with the rest of the page while the modal is open.
   - Inside the modal, the image dimensions are displayed in pixels, millimeters, centimeters, and meters, using the conversion functions to calculate the corresponding values.
   - The `toFixed()` method is used to limit the precision of the displayed values (2 decimal places for mm, cm, and 4 for meters).

4. **Styling:**
   - The modal and its contents are styled using Tailwind CSS, with classes like `bg-white`, `p-6`, `rounded-lg`, and `shadow-lg` to give the modal a clean and modern look.
   - The `Close` button is styled with a red background (`bg-red-500`) and changes to a slightly lighter shade on hover (`hover:bg-red-400`).

## **Props:**
- **`isOpen`**: A boolean that controls whether the modal is visible or not.
- **`onClose`**: A function to close the modal when the user clicks the close button.
- **`width` and `height`**: The dimensions of the image in pixels, passed as props, which are then converted to other units (mm, cm, m) for display.

## **Behavior:**
- When the modal is open, the width and height of the image are displayed in pixels, and the conversion functions calculate the corresponding values in millimeters, centimeters, and meters.
- The user can click the "Close" button to close the modal.

## **Improvements:**
1. **Handle Undefined or Zero Dimensions:**
   - If the `width` or `height` is not provided or is zero, it might be beneficial to handle those cases with a default message (e.g., "Dimensions not available").
   
2. **Responsiveness:**
   - Consider adding responsive classes to ensure the modal is displayed correctly on all screen sizes, especially for mobile views.

3. **Accessibility:**
   - You could improve accessibility by adding `aria` attributes to the modal elements, such as `aria-labelledby` for the title and `aria-describedby` for the content.

### **Example Usage:**
```jsx
<DimensionModal 
    isOpen={isModalOpen} 
    onClose={closeModal} 
    width={imageWidth} 
    height={imageHeight} 
/>
```

This modal is a nice feature to add to an image editing app or viewer, as it allows users to see the exact dimensions of their image in multiple units of measurement.

### ** Errors Faced **

## **Overview of the Project**
The project involves building a web application using React that allows users to upload and display DICOM (Digital Imaging and Communications in Medicine) files and regular image files. The app utilizes the `cornerstone-core` library for rendering medical images and `cornerstone-wado-image-loader` for handling DICOM file formats. Users can upload images via drag-and-drop functionality, and the application displays them using an HTML canvas.

## **Error Overview**
During the development process, I encountered several challenges related to handling DICOM files, rendering the images correctly, and managing various error scenarios that were not well-handled initially. Below are the key issues I faced and the steps taken to resolve them.

## **1. TypeError: Cannot read properties of undefined (reading 'catch')**

# **Error Description**
The error message `Uncaught TypeError: Cannot read properties of undefined (reading 'catch')` was logged in the console when trying to display the DICOM image using `cornerstone`. The error was traced to the asynchronous operation of loading the DICOM image and its subsequent rendering.

# **Root Cause**
The error stemmed from trying to use `.catch()` on an undefined object, specifically the result of the `cornerstone.displayImage()` function. This was likely because the image data (`dicomData`) wasn’t properly loaded or was undefined, making it impossible to apply `.catch()` for error handling.

# **Solution**
To solve this issue:
- I ensured that `dicomData` was properly set before attempting to display it.
- Added `try/catch` blocks for asynchronous functions like `cornerstone.loadAndCacheImage` to handle errors gracefully.
- I also added an error handler for the `cornerstone.displayImage` method to prevent uncaught errors.

```javascript
try {
  cornerstone.displayImage(canvasRef.current, dicomData);
} catch (err) {
  setError('Failed to display DICOM image. Please try again.');
  console.error('Error displaying DICOM:', err);
}
```

## **2. Incorrect Handling of DICOM Files**

# **Error Description**
At first, I had trouble identifying DICOM files correctly, leading to the inability to load and display DICOM images. Files with the `.dcm` extension were not being properly recognized as DICOM files.

# **Root Cause**
The issue was caused by insufficient checks for the file type. Initially, I only checked the `file.type` property for `application/dicom`, but some DICOM files lacked the correct MIME type. In addition, I wasn’t checking the file extension properly, which led to the problem when users uploaded DICOM files with the `.dcm` extension but without the correct MIME type.

# **Solution**
To address this issue:
- I updated the file type detection to check for both the MIME type (`application/dicom`) and the file extension (`.dcm`).
- This ensured that both types of DICOM files (those with the correct MIME type and those based on file extensions) were detected.

```javascript
const isDicom = file.type === 'application/dicom' || file.name.endsWith('.dcm');
```

## **3. Handling FileReader Errors**

# **Error Description**
I encountered issues with the `FileReader` when reading the files, particularly with the non-DICOM image files. Errors were not well-handled, which led to unclear error messages when the file failed to load.

# **Root Cause**
The issue was due to the lack of proper error handling on the `FileReader` object. While `FileReader` provides an `onerror` event handler, it wasn’t being utilized correctly, leading to unhandled errors when files failed to load.

# **Solution**
To fix this, I added error handlers (`onerror`) to all instances of `FileReader` used for loading DICOM and non-DICOM image files. This allowed for better logging and error messaging.

```javascript
fileReader.onerror = (event) => {
  console.error('File reading error:', event.target.error);
  setError('Error reading DICOM file. Please try again.');
  setLoading(false);
};
```

## **4. Incorrect Image Rendering on Canvas**

# **Error Description**
While rendering the DICOM images onto the HTML canvas, I encountered issues where the images wouldn’t display correctly or at all.

# **Root Cause**
This problem was linked to the incorrect initialization of the canvas, missing or incorrectly handled image loading, or issues with how `cornerstone.displayImage` was being called.

# **Solution**
- I ensured that the canvas was properly initialized and linked with the `cornerstone.enable()` function.
- I also made sure that the image data (`dicomData`) was fully loaded before attempting to render it, using the appropriate checks and event handlers.
- The DICOM rendering was done within a `useEffect` hook to ensure that the canvas updates only when the `dicomData` state changed.

```javascript
useEffect(() => {
  if (dicomData && canvasRef.current) {
    cornerstone.enable(canvasRef.current);
    try {
      cornerstone.displayImage(canvasRef.current, dicomData);
    } catch (err) {
      setError('Failed to display DICOM image. Please try again.');
      console.error('Error displaying DICOM:', err);
    }
  }
}, [dicomData]);
```

## **5. User Interface (UI) and User Experience (UX) Issues**

# **Error Description**
In the early stages of development, I faced UI issues such as loading states not being managed correctly, error messages not being displayed properly, and confusion around drag-and-drop functionality.

# **Root Cause**
These issues were caused by improper state management and lack of clear feedback to the user during the file upload and image loading processes.

# **Solution**
To resolve the UI issues:
- I added conditional rendering for loading states, error messages, and upload instructions.
- The user is now shown a loading indicator while files are being processed and an error message if something goes wrong.
- Additionally, I ensured that users receive clear feedback during the drag-and-drop file upload process.

```javascript
{loading ? (
  <div className="flex items-center justify-center h-full">
    <p className="text-gray-600">Loading...</p>
  </div>
) : error ? (
  <div className="flex items-center justify-center h-full">
    <p className="text-red-600">{error}</p>
  </div>
) : !image && !dicomData ? (
  <div {...getRootProps()} className="h-full flex items-center justify-center border-4 border-dashed border-gray-300 p-16 rounded-lg cursor-pointer text-center">
    <input {...getInputProps()} disabled={loading} />
    <div className="text-center">
      <img src="/drag-drop.svg" alt="Upload" className="mx-auto mb-4" width="450" height="450" />
      <p className="text-gray-600">Drag & Drop or Click to Upload</p>
    </div>
  </div>
) : dicomData ? (
  <div className="flex items-center justify-center h-full">
    <canvas ref={canvasRef} className="dicom-canvas" style={{ width: dimensions.width, height: dimensions.height }} />
  </div>
) : (
  <ImageEditor image={image} canvasRef={canvasRef} />
)}
```

# **Conclusion**

The development of this image handling and DICOM display project presented several challenges related to error handling, file type detection, and rendering. By carefully debugging the errors, improving the detection mechanisms for DICOM files, adding robust error handling, and refining the user interface, I was able to resolve the issues and create a smooth user experience. 

The key takeaways were:
- Proper error handling with `try/catch` blocks and `onerror` events is essential for debugging and user feedback.
- Detecting and managing different file types (DICOM vs. non-DICOM images) correctly is crucial for the app’s functionality.
- Providing users with real-time feedback (loading states, errors) improves overall user experience.

This project not only helped me learn more about DICOM handling but also deepened my understanding of React, error management, and asynchronous programming in JavaScript.

## Troubleshooting  

### Common Issues  
1. **DICOM Image Not Displaying**  
   - Ensure the uploaded file is a valid `.dcm` file.  
   - Check the console for Cornerstone-related errors.  

2. **Image Upload Fails**  
   - Verify the file format (supported formats: JPG, PNG, DICOM).  

3. **Cropping Not Working**  
   - Ensure the cropping area is defined and the image is visible.  

### Debugging Tips  
- Use the browser's developer console for detailed error logs.  
- Check the state updates in React DevTools for debugging component issues.  

## Contribution Guidelines  
We welcome contributions! Please fork the repository, make your changes, and submit a pull request. Ensure your code follows the existing structure and is well-documented.  

---

## License  
This project is licensed under the [MIT License](LICENSE).  



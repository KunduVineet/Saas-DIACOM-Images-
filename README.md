# Image Editor Application  

## Table of Contents  
- [Project Overview](#project-overview)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Project Structure](#project-structure)  
- [Getting Started](#getting-started)  
- [Usage Guide](#usage-guide)  
- [Component Breakdown](#component-breakdown)  
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
   Open [http://localhost:3000](http://localhost:3000) in your browser.  

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
- Displays the application title.  
- Contains buttons for resetting the image and accessing the dimension converter modal.  

### 2. **Main Component**  
- Handles image uploading and DICOM parsing.  
- Configures Cornerstone for DICOM rendering.  
- Manages the app's state, such as image dimensions and loading status.  

### 3. **ImageEditor**  
- Provides tools for adjusting image parameters like brightness, contrast, and zoom.  
- Includes cropping functionality with `react-easy-crop`.  

### 4. **DimensionModal**  
- Displays image dimensions in pixels, millimeters, centimeters, and meters.  
- Triggered by the **Dimension Converter** button in the Navbar.  

---

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

Happy editing! 😊

// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar'; // Updated import
import Main from './components/Main'; // Import the Main component (upload screen)

const App = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [activeTab, setActiveTab] = useState(''); // State to track active button

  // Toggle the display of the upload screen
  const toggleUploadScreen = () => {
    setShowUpload((prevState) => !prevState);
    setActiveTab('upload'); // Set 'upload' as the active tab when clicked
  };

  return (
    <div>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        toggleUploadScreen={toggleUploadScreen} 
      />
      <main>
        {/* Conditionally render the Upload Screen */}
        {showUpload ? <Main /> : <div> {/* Your main content goes here */} </div>}
      </main>
    </div>
  );
};

export default App;

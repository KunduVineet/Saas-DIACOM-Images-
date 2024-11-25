// cornerstone-wado-image-loader.js
const cornerstoneWADOImageLoader = {
    external: {
      cornerstone: {}, // Empty mock object, you can extend this with actual Cornerstone methods if necessary
      dicomParser: {}, // Mock the dicomParser if necessary
    },
    configure: (config) => {},  // Mock configure method
    wadouri: {
      fileManager: {
        add: (file) => '',  // Mock file manager method
      },
    },
    loadAndCacheImage: (imageId) => {
      return new Promise((resolve, reject) => {
        // Mock resolved image object (for testing purposes)
        resolve({
          width: 0,  // Mock image width
          height: 0, // Mock image height
        });
      });
    },
  };
  
  export default cornerstoneWADOImageLoader;
  
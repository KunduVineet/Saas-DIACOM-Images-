// src/components/Main.jsx
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Main = () => {
    const [image, setImage] = useState(null);

    // Handling the drop of an image
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Set the image to state
            };
            reader.readAsDataURL(file);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*', // only allow image files
    });

    // Handle image deletion
    const deleteImage = () => {
        setImage(null);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {/* Image Upload Area */}
            {!image ? (
                <div
                    {...getRootProps()}
                    className="border-4 border-dashed border-blue-400 p-16 rounded-lg text-center cursor-pointer hover:bg-blue-50 transition-all ease-in-out duration-300"
                >
                    <input {...getInputProps()} />
                    <p className="text-gray-600 text-lg">
                        <img
                            src="./drag-drop.svg"
                            alt=""
                            width={"300px"}
                            height={"300px"}
                        />
                    </p>
                </div>
            ) : (
                <div className="relative">
                    {/* Display uploaded image with delete option */}
                    <img
                        src={image}
                        alt="Preview"
                        className="w-full h-auto rounded-md max-w-[1000px] shadow-lg "
                    />
                    {/* Cross button to delete image */}
                    <button
                        onClick={deleteImage}
                        className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center text-xl"
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
};

export default Main;

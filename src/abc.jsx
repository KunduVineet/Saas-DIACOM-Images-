<img
    src="./brightness.svg" // Replace with the correct path or URL
    alt="Brightness Icon"
    className="w-6 h-6"
/>

return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-100">
        {/* Main Image Display Area */}
        <div
            className="flex-1 flex justify-center items-center p-4 transition-all duration-300"
            style={{
                filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom / 100})`,
                width: '100%',
                height: '100%',
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
                    aspect={4 / 3} // Adjust the cropping aspect ratio
                    onCropChange={setCrop}
                    onZoomChange={setZoomCrop}
                />
            ) : (
                <img
                    src={imageURL} // Ensure the image URL is correct
                    alt="Editable Preview"
                    className="rounded-lg shadow-lg max-w-full max-h-full"
                    style={{
                        display: 'block',
                        objectFit: 'contain', // Maintain aspect ratio
                    }}
                />
            )}
        </div>

        {/* Sidebar Panel */}
        {image && (
            <aside className="w-64 h-screen bg-gray-800 text-white shadow-lg flex-shrink-0">
                <div className="p-6 space-y-6">
                    <h2 className="text-xl font-semibold">Edit Image</h2>

                    {/* Brightness Control */}
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

                    {/* Contrast Control */}
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

                    {/* Zoom Control */}
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

                    {/* Cropping Section */}
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
                        Reset
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
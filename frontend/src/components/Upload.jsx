import React, { useState } from "react";

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Handle file selection via click
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (uploadedFiles) => {
    // Filter for PDF and TXT files only as specified in the UI
    const validFiles = Array.from(uploadedFiles).filter(
      (file) => file.type === "application/pdf" || file.type === "text/plain",
    );
    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  return (
    <div className="min-h-screen bg-[#0d1527] flex flex-col items-center justify-center p-4 font-sans selection:bg-[#cca43b]/30">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-serif text-[#cca43b] tracking-wide mb-3">
          Plagiarism Detector
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light">
          Upload multiple documents to analyze for similarities
        </p>
      </div>

      {/* Main Container Card */}
      <div className="w-full max-w-3xl bg-[#162235] border border-gray-800/60 rounded-2xl p-6 md:p-8 shadow-2xl">
        {/* Form / Dropzone Area */}
        <form
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className="relative"
        >
          <input
            type="file"
            id="file-upload"
            multiple
            accept=".pdf,.txt"
            className="hidden"
            onChange={handleChange}
          />

          <label
            htmlFor="file-upload"
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-12 md:p-16 cursor-pointer transition-all duration-200 group
              ${
                isDragActive
                  ? "border-[#cca43b] bg-[#1d2d44]"
                  : "border-gray-600/50 hover:border-gray-500 hover:bg-[#1a283d]"
              }`}
          >
            {/* Upload Icon */}
            <svg
              className="w-14 h-14 text-[#cca43b] mb-4 transform transition-transform duration-200 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              ></path>
            </svg>

            {/* Instruction Text */}
            <p className="text-white text-lg md:text-xl font-medium mb-1 tracking-wide">
              Drag and drop files here
            </p>
            <p className="text-gray-400 text-sm mb-4">
              or{" "}
              <span className="text-gray-300 underline group-hover:text-white">
                click to browse
              </span>
            </p>

            <p className="text-xs text-gray-500 font-mono tracking-wider">
              Accepts PDF and TXT files
            </p>
          </label>
        </form>

        {/* Optional: Show uploaded file names list if any exist */}
        {files.length > 0 && (
          <div className="mt-4 text-xs text-gray-400 max-h-20 overflow-y-auto space-y-1 bg-[#0d1527]/50 p-2 rounded border border-gray-800">
            <span className="font-semibold text-gray-300">Selected Files:</span>
            {files.map((file, idx) => (
              <div key={idx} className="truncate">
                • {file.name}
              </div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-6">
          <button
            disabled={files.length < 2}
            className={`w-full py-4 px-6 rounded-xl font-serif text-base tracking-wider transition-all duration-200
              ${
                files.length >= 2
                  ? "bg-[#cca43b] text-[#0d1527] font-bold hover:bg-[#e0b441] shadow-lg shadow-[#cca43b]/10 active:scale-[0.99]"
                  : "bg-[#243249] text-gray-500 font-medium cursor-not-allowed"
              }`}
          >
            Analyze Documents {files.length < 2 && "(2+ files required)"}
          </button>
        </div>
      </div>
    </div>
  );
}

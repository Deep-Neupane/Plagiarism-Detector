import React, { useState } from "react";
// Import icons to make the file list look highly professional
import { FileText, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { uploadFiles, checkPlagiarism } from '../services/api';

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
    const validFiles = Array.from(uploadedFiles).filter(
      (file) => file.type === "application/pdf" || file.type === "text/plain",
    );
    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  // NEW FUNCTION: Removes a specific file from the array by its index
  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, idx) => idx !== indexToRemove)
    );
  };

  // Helper to format bytes into KB/MB nicely
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleAnalyze = async () => {
    try {
      setIsLoading(true);

      // Step 1: Upload files
      const uploadResponse = await uploadFiles(files);
      const fileUploadId = uploadResponse.fileUploadId;

      // Step 2: Run plagiarism check
      await checkPlagiarism(fileUploadId);

      // Step 3: Redirect to results page
      navigate(`/comparision/${fileUploadId}`);

    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing documents: ' + error.message);
    } finally {
      setIsLoading(false);
    }
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
                path="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
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

        {/* ENHANCED: Beautiful & Interactive File List Area */}
        {files.length > 0 && (
          <div className="mt-6 space-y-2">
            <div className="text-sm font-medium text-gray-300 px-1">
              Attached Files ({files.length})
            </div>
            
            <div className="max-h-56 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
              {files.map((file, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between bg-[#1f2e44] border border-gray-700/40 rounded-xl p-3.5 group/file transition-all duration-150 hover:border-gray-600/60"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-[#162235] text-[#cca43b] rounded-lg">
                      <FileText size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-200 truncate pr-4">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-400 font-mono">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>

                  {/* Cancel Button */}
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 active:scale-95 transition-all duration-150 cursor-pointer"
                    title="Remove file"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-6">
          <button
            disabled={files.length < 2 || isLoading}
            onClick={handleAnalyze}
            className={`w-full py-4 px-6 rounded-xl font-serif text-base tracking-wider transition-all duration-200
              ${
                files.length >= 2 && !isLoading
                  ? "bg-[#cca43b] text-[#0d1527] font-bold hover:bg-[#e0b441] shadow-lg shadow-[#cca43b]/10 active:scale-[0.99] cursor-pointer"
                  : "bg-[#243249] text-gray-500 font-medium cursor-not-allowed"
              }`}
          >
            {isLoading ? 'Analyzing...' : `Analyze Documents ${files.length < 2 && "(2+ files required)"}`}
          </button>
        </div>
      </div>
    </div>
  );
}
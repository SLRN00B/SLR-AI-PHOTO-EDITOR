
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
      } else {
        alert('Please upload a valid image file.');
      }
    }
  };

  const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [onImageUpload]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files);
  };
  
  const dropzoneClasses = `relative flex flex-col items-center justify-center w-full max-w-2xl p-12 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 ${isDragging ? 'border-indigo-400 bg-gray-700' : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700/50'}`;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center p-4">
        <h2 className="text-4xl font-bold tracking-tight mb-2 text-white">Upload Your Photo</h2>
        <p className="text-lg text-gray-400 mb-8">Start by uploading an image to edit with AI.</p>
        <div 
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onClick={() => document.getElementById('file-input')?.click()}
            className={dropzoneClasses}
        >
            <input 
                id="file-input"
                type="file" 
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={onInputChange}
            />
            <div className="flex flex-col items-center justify-center gap-4">
                <UploadIcon className="w-12 h-12 text-gray-400" />
                <p className="text-gray-300"><span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 10MB)</p>
            </div>
        </div>
    </div>
  );
};

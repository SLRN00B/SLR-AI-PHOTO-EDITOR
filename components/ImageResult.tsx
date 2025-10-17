
import React from 'react';
import { PhotoIcon } from './icons/PhotoIcon';

interface ImageResultProps {
  editedImageUrl: string | null;
  isLoading: boolean;
}

export const ImageResult: React.FC<ImageResultProps> = ({ editedImageUrl, isLoading }) => {
  return (
    <div className="w-full lg:w-1/2">
      <div className="relative aspect-square w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 flex items-center justify-center">
        {editedImageUrl ? (
          <>
            <img src={editedImageUrl} alt="Edited" className="w-full h-full object-contain" />
            <div className="absolute top-3 left-3 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
              EDITED
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            <PhotoIcon className="w-16 h-16 mx-auto mb-4" />
            <p className="font-semibold">{isLoading ? 'Generating your image...' : 'Your edited image will appear here'}</p>
            <p className="text-sm">{isLoading ? 'This can take a few seconds.' : 'Describe your desired changes and click "Edit".'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

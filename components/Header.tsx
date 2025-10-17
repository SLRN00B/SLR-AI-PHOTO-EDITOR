
import React from 'react';
import { PhotoIcon } from './icons/PhotoIcon';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-7xl mx-auto flex items-center justify-center sm:justify-start">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-500 p-2 rounded-lg">
          <PhotoIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Nano Photo Editor
        </h1>
      </div>
    </header>
  );
};

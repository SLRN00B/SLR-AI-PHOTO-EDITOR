
import React from 'react';

export const Spinner: React.FC = () => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
  </div>
);

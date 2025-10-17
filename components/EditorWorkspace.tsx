
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { ArrowPathIcon } from './icons/ArrowPathIcon';

interface EditorWorkspaceProps {
  originalImageUrl: string;
  prompt: string;
  setPrompt: (prompt: string) => void;
  onEdit: () => void;
  onStartOver: () => void;
  isLoading: boolean;
}

export const EditorWorkspace: React.FC<EditorWorkspaceProps> = ({
  originalImageUrl,
  prompt,
  setPrompt,
  onEdit,
  onStartOver,
  isLoading,
}) => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-4">
      <div className="relative aspect-square w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
        <img src={originalImageUrl} alt="Original" className="w-full h-full object-contain" />
        <div className="absolute top-3 left-3 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
          ORIGINAL
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Add a spaceship in the sky' or 'make it a cyberpunk city'"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow text-gray-200 resize-none"
          rows={3}
          disabled={isLoading}
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onEdit}
            disabled={isLoading || !prompt.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 disabled:bg-indigo-900/50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            <SparklesIcon className="w-5 h-5" />
            {isLoading ? 'Editing...' : 'Edit Image'}
          </button>
          <button
            onClick={onStartOver}
            disabled={isLoading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors duration-300"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

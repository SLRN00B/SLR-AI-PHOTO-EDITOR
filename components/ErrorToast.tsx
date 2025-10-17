
import React, { useEffect } from 'react';
import { XCircleIcon } from './icons/XCircleIcon';

interface ErrorToastProps {
  message: string;
  onClose: () => void;
}

export const ErrorToast: React.FC<ErrorToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 bg-red-600 text-white py-3 px-5 rounded-lg shadow-xl flex items-center gap-3 animate-fade-in-up z-50">
      <XCircleIcon className="w-6 h-6" />
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-4 text-red-100 hover:text-white">&times;</button>
       <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

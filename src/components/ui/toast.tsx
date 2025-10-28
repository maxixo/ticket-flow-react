import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import type{ ToastProps } from './../../types/index';

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`}>
      {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2" aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
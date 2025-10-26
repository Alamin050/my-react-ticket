import React, { createContext, useState, useCallback } from 'react';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, duration);
  }, []);

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && <ToastNotification message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
};

const ToastNotification = ({ message, type }) => {
  const toastClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  };

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white z-50 ${toastClasses[type]}`}>
      {message}
    </div>
  );
};

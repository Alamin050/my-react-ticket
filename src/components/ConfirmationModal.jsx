import React from 'react';

const ConfirmationModal = ({ title, message, confirmButtonText, cancelButtonText, resolve, onClose }) => {
  const handleConfirm = () => {
    resolve(true);
    onClose();
  };

  const handleCancel = () => {
    resolve(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            {cancelButtonText}
          </button>
          <button onClick={handleConfirm} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

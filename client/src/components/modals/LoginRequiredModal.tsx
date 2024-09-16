import React from "react";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginRequiredModal({
  isOpen,
  onClose,
  onLogin,
}: LoginRequiredModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-sm w-full">
        <div className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-100 mb-3 sm:mb-4">
            Login Required
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
            You need to be logged in to access this feature. Would you like to
            log in now?
          </p>
          <div className="flex justify-end space-x-3 sm:space-x-4">
            <button
              onClick={onClose}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={onLogin}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
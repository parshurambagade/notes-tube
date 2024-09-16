import React from "react";
import { X } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: (e: React.MouseEvent) => void;
  onConfirm: () => void;
  noteTitle: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  noteTitle,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-100">Confirm Deletion</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X size={20} sm:size={24} />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <p className="text-sm sm:text-base text-gray-300 mb-6">
          Are you sure you want to delete the notes "{noteTitle}"?
        </p>
        <div className="flex justify-end space-x-3 sm:space-x-4">
          <button
            onClick={onClose}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-700 text-gray-300 rounded text-sm sm:text-base hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              onConfirm();
              onClose(e);
            }}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white rounded text-sm sm:text-base hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
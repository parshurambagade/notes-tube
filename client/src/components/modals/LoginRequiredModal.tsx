interface LoginRequiredModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}

export default function LoginRequiredModal({ isOpen, onClose, onLogin }: LoginRequiredModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Login Required</h2>
          <p className="text-gray-300 mb-6">
            You need to be logged in to access this feature. Would you like to log in now?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-3 text-sm py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={onLogin}
              className="px-3 text-sm py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
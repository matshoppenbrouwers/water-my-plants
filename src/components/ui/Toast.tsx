import React from 'react'

interface ToastProps {
  message: string
  onClose: () => void
}

export function Toast({ message, onClose }: ToastProps) {
  return (
    <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center shadow-lg">
      <span className="mr-2">{message}</span>
      <button 
        onClick={onClose}
        className="bg-transparent text-green-700 hover:text-green-900"
      >
        ×
      </button>
    </div>
  )
} 
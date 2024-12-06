import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full px-3 py-2 border rounded-md outline-none transition-colors
        border-[#a0c4a9] focus:border-[#2c7744] focus:ring-1 focus:ring-[#2c7744]
        ${className}`}
      {...props}
    />
  )
} 
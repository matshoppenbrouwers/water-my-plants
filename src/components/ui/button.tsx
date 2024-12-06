import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
  size?: 'default' | 'icon'
}

export function Button({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'default',
  ...props 
}: ButtonProps) {
  const baseStyles = "font-medium transition-colors"
  const variantStyles = {
    default: "bg-[#2c7744] hover:bg-[#1e5631] text-white",
    outline: "bg-transparent border hover:text-[#2c7744]"
  }
  const sizeStyles = {
    default: "px-4 py-2",
    icon: "p-2"
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
} 
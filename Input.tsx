import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({
  className,
  ...props
}) => (
  <input
    className={`w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-tv-blue ${className || ""}`}
    {...props}
  />
)
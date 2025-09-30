import React from 'react'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<SelectProps> = ({
  children,
  className,
  ...props
}) => (
  <select
    className={`w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-tv-blue ${className || ""}`}
    {...props}
  >
    {children}
  </select>
)
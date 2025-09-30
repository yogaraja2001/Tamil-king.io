import React from 'react'
import clsx from 'clsx'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "secondary"
  size?: "sm" | "md" | "lg"
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tv-blue"
  const variants = {
    primary: "bg-tv-blue hover:bg-blue-700 text-white",
    danger: "bg-tv-red hover:bg-red-700 text-white",
    secondary: "bg-gray-700 hover:bg-gray-800 text-white",
  }
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }
  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
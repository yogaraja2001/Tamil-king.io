import React from 'react'
import clsx from 'clsx'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={clsx("bg-tv-dark rounded-2xl shadow-lg p-6", className)}
    {...props}
  >
    {children}
  </div>
)
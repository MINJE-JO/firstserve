// components/Button.tsx

import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

const Button = ({ children, onClick, type = 'button', className = '' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-tennis-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
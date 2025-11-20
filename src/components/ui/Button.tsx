import React from 'react';
import { type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils.js';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    icon: Icon, 
    iconPosition = 'left',
    children, 
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-[#FF6B00] hover:bg-[#FF6B00] text-white focus:ring-[#FF6B00]',
      secondary: 'bg-white hover:bg-[#ffeee3] text-[#FF6B00] border border-[#ffeee3] focus:ring-[#FF6B00]',
      outline: 'border border-[#ffeee3] bg-transparent hover:bg-[#ffeee3] text-[#2E2E2E] focus:ring-gray-500',
      ghost: 'hover:bg-[#ffeee3] text-[#2E2E2E] focus:ring-gray-500',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {Icon && iconPosition === 'left' && <Icon className="w-5 h-5 mr-2" />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className="w-5 h-5 ml-2" />}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };











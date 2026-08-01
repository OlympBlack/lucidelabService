import React from 'react';

interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'orange' | 'dark' | 'blue' | 'outline';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  variant = 'orange',
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  let variantClass = '';
  if (variant === 'dark') variantClass = 'btn-dark';
  if (variant === 'blue') variantClass = 'btn-blue';
  if (variant === 'outline') variantClass = 'btn-outline';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`common-btn ${variantClass} ${className}`}
      {...props}
    >
      {children}
      <span className="btn-hover-bg"></span>
    </button>
  );
};

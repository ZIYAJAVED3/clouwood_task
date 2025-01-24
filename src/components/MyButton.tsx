import React from 'react';

interface MyButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const MyButton: React.FC<MyButtonProps> = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default MyButton;
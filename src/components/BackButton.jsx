import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <button
      onClick={handleGoHome}
      className={`
        fixed top-6 left-6 z-50 
        bg-white/10 backdrop-blur-sm border border-white/20 
        text-white hover:bg-white/20 
        px-4 py-2 rounded-xl 
        flex items-center gap-2 
        transition-all duration-200 
        hover:scale-105 active:scale-95
        ${className}
      `}
    >
      <ArrowLeft className="w-4 h-4" />
      <Home className="w-4 h-4" />
      <span className="text-sm font-medium">Home</span>
    </button>
  );
};

export default BackButton;

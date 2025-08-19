import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppCard = ({ 
  title, 
  description, 
  icon, 
  route, 
  preview: PreviewComponent,
  color = 'blue' 
}) => {
  const navigate = useNavigate();

  const colorClasses = {
    gray: 'border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/50',
    blue: 'border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/50',
    red: 'border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/50',
    green: 'border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/50',
    purple: 'border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/50',
    orange: 'border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/50',
  };

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div className={`
      bg-gray-800/50 rounded-2xl p-6 border transition-all duration-300 
      hover:scale-105 cursor-pointer group
      ${colorClasses[color]}
    `}
    onClick={handleClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{icon}</div>
          <div>
            <h3 className="text-xl font-bold text-gray-100">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
        </div>
        <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-gray-400 transition-colors" />
      </div>

      {/* Mini Preview */}
      <div className="relative overflow-hidden rounded-lg bg-gray-900/50 border border-gray-700">
        <div className="transform scale-[0.3] origin-top-left w-[333%] h-[250px] overflow-hidden">
          <div className="w-full h-full pointer-events-none">
            {PreviewComponent && <PreviewComponent />}
          </div>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <button className="w-full bg-gray-700/40 backdrop-blur-sm text-gray-200 py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:bg-gray-700/60">
              Open Full App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppCard;

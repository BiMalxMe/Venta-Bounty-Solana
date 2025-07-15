import React from 'react';
import { Check, X, Minus } from 'lucide-react';

interface FeatureBadgeProps {
  feature: string;
  value: boolean | string;
  label: string;
}

const FeatureBadge: React.FC<FeatureBadgeProps> = ({ feature, value, label }) => {
  const getStatusIcon = () => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-3 h-3 text-green-400" />
      ) : (
        <X className="w-3 h-3 text-red-400" />
      );
    }
    
    if (value === 'Yes') {
      return <Check className="w-3 h-3 text-green-400" />;
    } else if (value === 'No') {
      return <X className="w-3 h-3 text-red-400" />;
    } else {
      return <Minus className="w-3 h-3 text-yellow-400" />;
    }
  };

  const getStatusColor = () => {
    if (typeof value === 'boolean') {
      return value ? 'bg-green-900/30 border-green-800' : 'bg-red-900/30 border-red-800';
    }
    
    if (value === 'Yes') {
      return 'bg-green-900/30 border-green-800';
    } else if (value === 'No') {
      return 'bg-red-900/30 border-red-800';
    } else {
      return 'bg-yellow-900/30 border-yellow-800';
    }
  };

  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border transition-all duration-200 hover:scale-105 ${getStatusColor()}`}>
      {getStatusIcon()}
      <span className="text-xs text-gray-300 font-medium">{label}</span>
      {typeof value === 'string' && value !== 'Yes' && value !== 'No' && (
        <span className="text-xs text-gray-400">({value})</span>
      )}
    </div>
  );
};

export default FeatureBadge;
import React from 'react';
import { Monitor, Smartphone, HardDrive, Globe } from 'lucide-react';

interface PlatformBadgeProps {
  platform: string;
}

const PlatformBadge: React.FC<PlatformBadgeProps> = ({ platform }) => {
  const getPlatformIcon = () => {
    const platformLower = platform.toLowerCase();
    
    if (platformLower.includes('ios') || platformLower.includes('android')) {
      return <Smartphone className="w-3 h-3" />;
    } else if (platformLower.includes('chrome') || platformLower.includes('firefox')) {
      return <Globe className="w-3 h-3" />;
    } else if (platformLower.includes('hardware') || platformLower.includes('usb') || platformLower.includes('bluetooth')) {
      return <HardDrive className="w-3 h-3" />;
    } else {
      return <Monitor className="w-3 h-3" />;
    }
  };

  const getPlatformColor = () => {
    const platformLower = platform.toLowerCase();
    
    if (platformLower.includes('ios')) {
      return 'bg-blue-900/30 border-blue-800 text-blue-300';
    } else if (platformLower.includes('android')) {
      return 'bg-green-900/30 border-green-800 text-green-300';
    } else if (platformLower.includes('chrome')) {
      return 'bg-yellow-900/30 border-yellow-800 text-yellow-300';
    } else if (platformLower.includes('firefox')) {
      return 'bg-orange-900/30 border-orange-800 text-orange-300';
    } else if (platformLower.includes('hardware')) {
      return 'bg-purple-900/30 border-purple-800 text-purple-300';
    } else {
      return 'bg-slate-700/30 border-slate-600 text-slate-300';
    }
  };

  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border transition-all duration-200 hover:scale-105 ${getPlatformColor()}`}>
      {getPlatformIcon()}
      <span className="text-xs font-medium">{platform}</span>
    </div>
  );
};

export default PlatformBadge;
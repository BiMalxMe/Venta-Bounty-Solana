import React from 'react';
import { TrendingUp, Shield, Smartphone, Globe } from 'lucide-react';

interface StatsCardProps {
  totalWallets: number;
  selfCustodyCount: number;
  mobileWallets: number;
  qrSupportCount: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  totalWallets,
  selfCustodyCount,
  mobileWallets,
  qrSupportCount
}) => {
  const stats = [
    {
      label: 'Total Wallets',
      value: totalWallets,
      icon: TrendingUp,
      color: 'text-indigo-400'
    },
    {
      label: 'Self-Custody',
      value: selfCustodyCount,
      icon: Shield,
      color: 'text-green-400'
    },
    {
      label: 'Mobile Support',
      value: mobileWallets,
      icon: Smartphone,
      color: 'text-blue-400'
    },
    {
      label: 'QR Support',
      value: qrSupportCount,
      icon: Globe,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={stat.label} 
          className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 hover:border-slate-600 transition-all duration-300 animate-slideUp"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-slate-700/50 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
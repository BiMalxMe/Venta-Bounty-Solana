import React from 'react';
import { Calendar, Shield, Info } from 'lucide-react';
import { Wallet } from '../types/wallet';
import FeatureBadge from './FeatureBadge';
import PlatformBadge from './PlatformBadge';

interface WalletCardProps {
  wallet: Wallet;
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet }) => {
  const featureLabels = {
    in_app_dex_swap: 'DEX Swap',
    nft_gallery: 'NFT Gallery',
    in_app_staking: 'Staking',
    fiat_on_ramp: 'Fiat On-Ramp',
    fiat_off_ramp: 'Fiat Off-Ramp',
    push_notifications: 'Push Notifications',
    solana_pay_qr: 'Solana Pay QR'
  };

  const getCustodyColor = () => {
    if (wallet.custody_model.toLowerCase().includes('self')) {
      return 'bg-green-900/30 border-green-800 text-green-300';
    } else if (wallet.custody_model.toLowerCase().includes('custodial')) {
      return 'bg-orange-900/30 border-orange-800 text-orange-300';
    } else {
      return 'bg-purple-900/30 border-purple-800 text-purple-300';
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 hover:scale-[1.02] animate-fadeIn">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center overflow-hidden">
          <img 
            src={wallet.image_url} 
            alt={`${wallet.name} logo`}
            className="w-8 h-8 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center text-white font-bold text-sm">
            {wallet.name.charAt(0)}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{wallet.name}</h3>
          <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-medium ${getCustodyColor()}`}>
            <Shield className="w-3 h-3" />
            {wallet.custody_model}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Platforms</h4>
        <div className="flex flex-wrap gap-2">
          {wallet.platforms.map((platform) => (
            <PlatformBadge key={platform} platform={platform} />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Features</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(wallet.features).map(([key, value]) => (
            <FeatureBadge
              key={key}
              feature={key}
              value={value}
              label={featureLabels[key as keyof typeof featureLabels]}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-700 pt-4">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Tested: {wallet.test_date}</span>
          </div>
          <span>v{wallet.version_tested}</span>
        </div>
        
        {wallet.notes && (
          <div className="flex items-start gap-2 bg-slate-700/30 rounded-md p-2">
            <Info className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-300">{wallet.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletCard;
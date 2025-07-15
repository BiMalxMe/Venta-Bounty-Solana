import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
  selectedCustody: string;
  setSelectedCustody: (custody: string) => void;
  selectedFeature: string;
  setSelectedFeature: (feature: string) => void;
  platforms: string[];
  custodyModels: string[];
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedPlatform,
  setSelectedPlatform,
  selectedCustody,
  setSelectedCustody,
  selectedFeature,
  setSelectedFeature,
  platforms,
  custodyModels,
  clearFilters,
  hasActiveFilters
}) => {
  const features = [
    { key: 'in_app_dex_swap', label: 'DEX Swap' },
    { key: 'nft_gallery', label: 'NFT Gallery' },
    { key: 'in_app_staking', label: 'Staking' },
    { key: 'fiat_on_ramp', label: 'Fiat On-Ramp' },
    { key: 'fiat_off_ramp', label: 'Fiat Off-Ramp' },
    { key: 'push_notifications', label: 'Push Notifications' },
    { key: 'solana_pay_qr', label: 'Solana Pay QR' }
  ];

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-8 animate-slideDown">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-semibold text-white">Filter Wallets</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto flex items-center gap-1 px-3 py-1 bg-red-900/30 border border-red-800 text-red-300 rounded-md hover:bg-red-900/50 transition-colors text-sm"
          >
            <X className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search wallets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Platform</label>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          >
            <option value="">All Platforms</option>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Custody Model</label>
          <select
            value={selectedCustody}
            onChange={(e) => setSelectedCustody(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          >
            <option value="">All Models</option>
            {custodyModels.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Features</label>
          <select
            value={selectedFeature}
            onChange={(e) => setSelectedFeature(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          >
            <option value="">All Features</option>
            {features.map((feature) => (
              <option key={feature.key} value={feature.key}>{feature.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
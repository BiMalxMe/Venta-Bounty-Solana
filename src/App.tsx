import React, { useState, useMemo } from 'react';
import { Wallet as WalletIcon, Calendar, Github, Twitter, FileText, ExternalLink } from 'lucide-react';
import { WalletData } from './types/wallet';
import WalletCard from './components/WalletCard';
import FilterBar from './components/FilterBar';
import StatsCard from './components/StatsCard';
import LoadingSpinner from './components/LoadingSpinner';

const walletData: WalletData = {
  "last_updated": "2025-07-15",
  "wallets": [
    {
      "name": "Phantom",
      "image_url": "https://phantom.app/favicon.ico",
      "platforms": ["iOS","Android","Chrome","Firefox"],
      "custody_model": "Self-custody",
      "features": {
        "in_app_dex_swap": true,
        "nft_gallery": true,
        "in_app_staking": true,
        "fiat_on_ramp": true,
        "fiat_off_ramp": false,
        "push_notifications": true,
        "solana_pay_qr": "Partial"
      },
      "version_tested": "24.1.5",
      "test_date": "2025-07-10",
      "notes": "QR support works but only for direct Solana Pay links, not custom invoices."
    },
    {
      "name": "Solflare",
      "image_url": "https://solflare.com/favicon.ico",
      "platforms": ["iOS","Android","Chrome","Firefox"],
      "custody_model": "Self-custody",
      "features": {
        "in_app_dex_swap": true,
        "nft_gallery": true,
        "in_app_staking": true,
        "fiat_on_ramp": true,
        "fiat_off_ramp": true,
        "push_notifications": true,
        "solana_pay_qr": "Yes"
      },
      "version_tested": "3.2.0",
      "test_date": "2025-07-10",
      "notes": "Full QR support; seamless checkout flow."
    },
    {
      "name": "Backpack",
      "image_url": "https://backpack.app/favicon.ico",
      "platforms": ["iOS","Android","Chrome"],
      "custody_model": "Self-custody",
      "features": {
        "in_app_dex_swap": true,
        "nft_gallery": true,
        "in_app_staking": false,
        "fiat_on_ramp": false,
        "fiat_off_ramp": false,
        "push_notifications": true,
        "solana_pay_qr": "No"
      },
      "version_tested": "1.5.2",
      "test_date": "2025-07-10",
      "notes": "Does not support Solana Pay QR currently."
    },
    {
      "name": "Glow",
      "image_url": "https://glow.app/favicon.ico",
      "platforms": ["iOS","Android"],
      "custody_model": "Self-custody",
      "features": {
        "in_app_dex_swap": false,
        "nft_gallery": true,
        "in_app_staking": false,
        "fiat_on_ramp": true,
        "fiat_off_ramp": true,
        "push_notifications": true,
        "solana_pay_qr": "Yes"
      },
      "version_tested": "2.0.8",
      "test_date": "2025-07-11",
      "notes": "Supports QR; UI is intuitive for payments."
    },
    {
      "name": "Decaf",
      "image_url": "https://decaf.so/favicon.ico",
      "platforms": ["iOS","Android"],
      "custody_model": "Custodial",
      "features": {
        "in_app_dex_swap": false,
        "nft_gallery": false,
        "in_app_staking": false,
        "fiat_on_ramp": true,
        "fiat_off_ramp": true,
        "push_notifications": false,
        "solana_pay_qr": "Partial"
      },
      "version_tested": "0.9.4",
      "test_date": "2025-07-11",
      "notes": "Partial QR support; only via linked web checkout."
    },
    {
      "name": "Jupiter Wallet",
      "image_url": "https://jup.ag/favicon.ico",
      "platforms": ["Chrome","Firefox"],
      "custody_model": "Self-custody",
      "features": {
        "in_app_dex_swap": true,
        "nft_gallery": false,
        "in_app_staking": false,
        "fiat_on_ramp": false,
        "fiat_off_ramp": false,
        "push_notifications": false,
        "solana_pay_qr": "No"
      },
      "version_tested": "1.1.3",
      "test_date": "2025-07-12",
      "notes": "No QR support. Focus on DEX trading."
    },
    {
      "name": "Bitget Wallet",
      "image_url": "https://web3.bitget.com/favicon.ico",
      "platforms": ["iOS","Android"],
      "custody_model": "Custodial",
      "features": {
        "in_app_dex_swap": true,
        "nft_gallery": true,
        "in_app_staking": true,
        "fiat_on_ramp": true,
        "fiat_off_ramp": true,
        "push_notifications": true,
        "solana_pay_qr": "Yes"
      },
      "version_tested": "6.7.0",
      "test_date": "2025-07-12",
      "notes": "Supports QR; payment flow is slightly slower."
    },
    {
      "name": "OKX Wallet",
      "image_url": "https://www.okx.com/favicon.ico",
      "platforms": ["iOS","Android","Chrome"],
      "custody_model": "Custodial",
      "features": {
        "in_app_dex_swap": true,
        "nft_gallery": true,
        "in_app_staking": true,
        "fiat_on_ramp": true,
        "fiat_off_ramp": true,
        "push_notifications": true,
        "solana_pay_qr": "Partial"
      },
      "version_tested": "5.8.1",
      "test_date": "2025-07-13",
      "notes": "Partial support; Solana Pay works for some merchants."
    },
    {
      "name": "Slope",
      "image_url": "https://slope.finance/favicon.ico",
      "platforms": ["iOS","Android"],
      "custody_model": "Self-custody",
      "features": {
        "in_app_dex_swap": false,
        "nft_gallery": false,
        "in_app_staking": false,
        "fiat_on_ramp": false,
        "fiat_off_ramp": false,
        "push_notifications": false,
        "solana_pay_qr": "No"
      },
      "version_tested": "1.3.7",
      "test_date": "2025-07-13",
      "notes": "No Solana Pay support."
    },
    {
      "name": "Exodus",
      "image_url": "https://www.exodus.com/favicon.ico",
      "platforms": ["iOS","Android","Windows","macOS","Linux"],
      "custody_model": "Self-custody",
      "features": {
        "in_app_dex_swap": false,
        "nft_gallery": false,
        "in_app_staking": true,
        "fiat_on_ramp": true,
        "fiat_off_ramp": true,
        "push_notifications": true,
        "solana_pay_qr": "No"
      },
      "version_tested": "24.3.0",
      "test_date": "2025-07-14",
      "notes": "No QR support but offers staking and fiat ramps."
    },
    {
      "name": "TokenPocket",
      "image_url": "https://www.tokenpocket.pro/favicon.ico",
      "platforms": ["iOS","Android","Chrome","Firefox"],
      "custody_model": "Self-custody",
      "features": {
        "in_app_dex_swap": true,
        "nft_gallery": true,
        "in_app_staking": false,
        "fiat_on_ramp": true,
        "fiat_off_ramp": false,
        "push_notifications": true,
        "solana_pay_qr": "Partial"
      },
      "version_tested": "5.4.2",
      "test_date": "2025-07-15",
      "notes": "Supports QR via extension; mobile UI needs extra steps."
    },
    {
      "name": "Guarda Wallet",
      "image_url": "https://guarda.com/favicon.ico",
      "platforms": ["iOS","Android","Chrome","Firefox","Windows","macOS"],
      "custody_model": "Self-custody",
      "features": {
        "in_app_dex_swap": true,
        "nft_gallery": true,
        "in_app_staking": false,
        "fiat_on_ramp": true,
        "fiat_off_ramp": true,
        "push_notifications": false,
        "solana_pay_qr": "No"
      },
      "version_tested": "3.8.0",
      "test_date": "2025-07-15",
      "notes": "No QR support in checkout."
    },
    {
      "name": "Fuse Wallet",
      "image_url": "https://fuse.io/favicon.ico",
      "platforms": ["Android","iOS"],
      "custody_model": "Self-custody (seedless via 2FA)",
      "features": {
        "in_app_dex_swap": false,
        "nft_gallery": false,
        "in_app_staking": false,
        "fiat_on_ramp": false,
        "fiat_off_ramp": false,
        "push_notifications": true,
        "solana_pay_qr": "No"
      },
      "version_tested": "2.1.0",
      "test_date": "2025-07-15",
      "notes": "Focus on 2FA UX, no Solana Pay."
    },
    {
      "name": "Cake Wallet",
      "image_url": "https://cakewallet.com/favicon.ico",
      "platforms": ["iOS","Android"],
      "custody_model": "Self-custody",
      "features": {
        "in_app_dex_swap": true,
        "nft_gallery": false,
        "in_app_staking": false,
        "fiat_on_ramp": true,
        "fiat_off_ramp": false,
        "push_notifications": false,
        "solana_pay_qr": "Partial"
      },
      "version_tested": "4.2.5",
      "test_date": "2025-07-15",
      "notes": "Mobile only; QR works via share payment link."
    },
    {
      "name": "Para",
      "image_url": "https://para.space/favicon.ico",
      "platforms": ["Chrome","Firefox"],
      "custody_model": "Self-custody",
      "features": {
        "in_app_dex_swap": false,
        "nft_gallery": true,
        "in_app_staking": false,
        "fiat_on_ramp": false,
        "fiat_off_ramp": false,
        "push_notifications": false,
        "solana_pay_qr": "Yes"
      },
      "version_tested": "1.0.3",
      "test_date": "2025-07-15",
      "notes": "Desktop extension with full QR support."
    },
    {
      "name": "Coinbase Wallet",
      "image_url": "https://www.coinbase.com/wallet/favicon.ico",
      "platforms": ["iOS","Android","Chrome","Firefox"],
      "custody_model": "Self-custody",
      "features": {
        "in_app_dex_swap": true,
        "nft_gallery": false,
        "in_app_staking": false,
        "fiat_on_ramp": true,
        "fiat_off_ramp": false,
        "push_notifications": true,
        "solana_pay_qr": "Partial"
      },
      "version_tested": "2025.06",
      "test_date": "2025-07-15",
      "notes": "QR works but cash‑out slower."
    },
    {
      "name": "Trezor",
      "image_url": "https://trezor.io/favicon.ico",
      "platforms": ["Hardware (USB)"],
      "custody_model": "Self-custody (hardware)",
      "features": {
        "in_app_dex_swap": false,
        "nft_gallery": false,
        "in_app_staking": false,
        "fiat_on_ramp": false,
        "fiat_off_ramp": false,
        "push_notifications": false,
        "solana_pay_qr": "No"
      },
      "version_tested": "Model T firmware 2.4",
      "test_date": "2025-07-15",
      "notes": "Hardware only, no QR support."
    },
    {
      "name": "Ledger Nano X",
      "image_url": "https://www.ledger.com/favicon.ico",
      "platforms": ["Hardware (Bluetooth/USB)"],
      "custody_model": "Self-custody (hardware)",
      "features": {
        "in_app_dex_swap": false,
        "nft_gallery": false,
        "in_app_staking": true,
        "fiat_on_ramp": true,
        "fiat_off_ramp": false,
        "push_notifications": false,
        "solana_pay_qr": "No"
      },
      "version_tested": "Live App 2.7",
      "test_date": "2025-07-15",
      "notes": "Staking works via mobile companion, but no QR."
    },
    {
      "name": "SafePal X1",
      "image_url": "https://www.safepal.com/favicon.ico",
      "platforms": ["Hardware (Bluetooth)"],
      "custody_model": "Self-custody (hardware)",
      "features": {
        "in_app_dex_swap": false,
        "nft_gallery": false,
        "in_app_staking": false,
        "fiat_on_ramp": false,
        "fiat_off_ramp": false,
        "push_notifications": false,
        "solana_pay_qr": "No"
      },
      "version_tested": "1.0",
      "test_date": "2025-07-15",
      "notes": "Air-gapped hardware, no QR."
    },
    {
      "name": "Tangem",
      "image_url": "https://tangem.com/favicon.ico",
      "platforms": ["Hardware (NFC card)","Mobile App"],
      "custody_model": "Self-custody (hardware)",
      "features": {
        "in_app_dex_swap": false,
        "nft_gallery": false,
        "in_app_staking": false,
        "fiat_on_ramp": true,
        "fiat_off_ramp": false,
        "push_notifications": false,
        "solana_pay_qr": "No"
      },
      "version_tested": "Card FW 1.2",
      "test_date": "2025-07-15",
      "notes": "NFC card; payments via link only."
    }
  ]
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedCustody, setSelectedCustody] = useState('');
  const [selectedFeature, setSelectedFeature] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const platforms = useMemo(() => {
    const allPlatforms = walletData.wallets.flatMap(wallet => wallet.platforms);
    return [...new Set(allPlatforms)].sort();
  }, []);

  const custodyModels = useMemo(() => {
    const allModels = walletData.wallets.map(wallet => wallet.custody_model);
    return [...new Set(allModels)].sort();
  }, []);

  const filteredWallets = useMemo(() => {
    return walletData.wallets.filter(wallet => {
      const matchesSearch = wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           wallet.notes.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPlatform = !selectedPlatform || wallet.platforms.includes(selectedPlatform);
      
      const matchesCustody = !selectedCustody || wallet.custody_model === selectedCustody;
      
      const matchesFeature = !selectedFeature || 
                            (typeof wallet.features[selectedFeature as keyof typeof wallet.features] === 'boolean' && 
                             wallet.features[selectedFeature as keyof typeof wallet.features]) ||
                            (typeof wallet.features[selectedFeature as keyof typeof wallet.features] === 'string' && 
                             wallet.features[selectedFeature as keyof typeof wallet.features] === 'Yes');

      return matchesSearch && matchesPlatform && matchesCustody && matchesFeature;
    });
  }, [searchTerm, selectedPlatform, selectedCustody, selectedFeature]);

  const stats = useMemo(() => {
    const totalWallets = walletData.wallets.length;
    const selfCustodyCount = walletData.wallets.filter(w => w.custody_model.toLowerCase().includes('self')).length;
    const mobileWallets = walletData.wallets.filter(w => 
      w.platforms.some(p => p.toLowerCase().includes('ios') || p.toLowerCase().includes('android'))
    ).length;
    const qrSupportCount = walletData.wallets.filter(w => w.features.solana_pay_qr === 'Yes').length;
    
    return { totalWallets, selfCustodyCount, mobileWallets, qrSupportCount };
  }, []);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedPlatform('');
    setSelectedCustody('');
    setSelectedFeature('');
  };

  const hasActiveFilters = searchTerm || selectedPlatform || selectedCustody || selectedFeature;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Profile Links Bar */}
      <div className="bg-slate-900/80 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://www.notion.so/23146ae3d78c80faa4c9d84f06d3c4b7?v=23146ae3d78c80da96fd000cf7dbf461"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 rounded-lg transition-all duration-300 hover:scale-105 group"
            >
              <FileText className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
              <span className="text-sm text-gray-300 group-hover:text-white font-medium">View Notion Page</span>
              <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-gray-300" />
            </a>
            
            <a
              href="https://twitter.com/BiMalxMe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 rounded-lg transition-all duration-300 hover:scale-105 group"
            >
              <Twitter className="w-4 h-4 text-sky-400 group-hover:text-sky-300" />
              <span className="text-sm text-gray-300 group-hover:text-white font-medium">@BiMalxMe</span>
              <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-gray-300" />
            </a>
            
            <a
              href="https://github.com/BiMalxMe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 rounded-lg transition-all duration-300 hover:scale-105 group"
            >
              <Github className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
              <span className="text-sm text-gray-300 group-hover:text-white font-medium">BiMalxMe</span>
              <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-gray-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                <WalletIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Solana Wallet Comparison
                </h1>
                <p className="text-gray-400 text-sm">Compare features and find your perfect Solana wallet</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {walletData.last_updated}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <StatsCard {...stats} />

        {/* Filter Bar */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          selectedCustody={selectedCustody}
          setSelectedCustody={setSelectedCustody}
          selectedFeature={selectedFeature}
          setSelectedFeature={setSelectedFeature}
          platforms={platforms}
          custodyModels={custodyModels}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">
            {filteredWallets.length} Wallet{filteredWallets.length !== 1 ? 's' : ''} Found
          </h2>
          {hasActiveFilters && (
            <p className="text-gray-400 text-sm">
              Showing filtered results. <button onClick={clearFilters} className="text-indigo-400 hover:text-indigo-300">Clear filters</button> to see all wallets.
            </p>
          )}
        </div>

        {/* Wallet Grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWallets.map((wallet, index) => (
              <div key={wallet.name} style={{ animationDelay: `${index * 0.1}s` }}>
                <WalletCard wallet={wallet} />
              </div>
            ))}
          </div>
        )}

        {filteredWallets.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-8 max-w-md mx-auto">
              <WalletIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No wallets found</h3>
              <p className="text-gray-400 mb-4">
                Try adjusting your filters or search terms to find more wallets.
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-800/50 border-t border-slate-700 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              Built with React, TypeScript, and Tailwind CSS
            </p>
            <div className="flex items-center gap-4">
              <Github className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Open Source</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
export interface WalletFeatures {
  in_app_dex_swap: boolean;
  nft_gallery: boolean;
  in_app_staking: boolean;
  fiat_on_ramp: boolean;
  fiat_off_ramp: boolean;
  push_notifications: boolean;
  solana_pay_qr: string;
}

export interface Wallet {
  name: string;
  image_url: string;
  platforms: string[];
  custody_model: string;
  features: WalletFeatures;
  version_tested: string;
  test_date: string;
  notes: string;
}

export interface WalletData {
  last_updated: string;
  wallets: Wallet[];
}
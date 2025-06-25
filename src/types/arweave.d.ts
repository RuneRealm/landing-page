import { ArweaveWalletApi } from '@arweave-wallet-kit/core/dist/wallet/types';

declare global {
  interface Window {
    arweaveWallet: ArweaveWalletApi;
  }
}

export {};

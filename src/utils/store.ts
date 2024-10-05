import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface crypto {
    name : string,
    symbol : string,
    image : string,
    current_price : number,
    market_cap : number,
    market_cap_change_24h : number,
    price_change_24h : number,
    total_supply : number,
    low_24h : number
    market_cap_rank : number,
    high_24h : number
    total_volume : number
    circulating_supply : number
}

interface cryptoStoreState {
    selectedCrypto : crypto | null,
    setSelectedCrypto : (crypto : crypto) => void
}

export const useCryptoStore = create<cryptoStoreState>(
    (persist as any)(
      (set : any) => ({
        selectedCrypto: null,
        setSelectedCrypto: (crypto: Crypto) => set({ selectedCrypto: crypto }), 
      }),
      {
        name: 'crypto-storage', 
        getStorage: () => localStorage,
      }
    )
  );

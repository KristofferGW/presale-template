import React from 'react';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '../config/wagmi';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}

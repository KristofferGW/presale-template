import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet } from 'viem/chains';

export const config = getDefaultConfig({
  appName: 'Presale Template',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet],
  ssr: false,
});

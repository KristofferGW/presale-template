import { createConfig, configureChains } from 'wagmi';
import { mainnet } from 'viem/chains';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';

// Configure chains and providers
export const { chains, publicClient, webSocketPublicClient } = configureChains([
  mainnet,
], [publicProvider()]);

const connectors = [new InjectedConnector({ options: {} })];

export const wagmiConfig = createConfig({
  publicClient,
  webSocketPublicClient,
  connectors,
});

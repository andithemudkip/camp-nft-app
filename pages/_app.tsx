import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import {
  getDefaultConfig,
  RainbowKitProvider,
  Chain,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../apollo-client";

const camp = {
  id: 325000,
  name: "Camp Network Testnet V2",
  iconUrl:
    "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/tent.png",
  iconBackground: "#FFFF",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.camp-network-testnet.gelato.digital"] },
  },
  blockExplorers: {
    default: {
      name: "Camp Testnet",
      url: "https://explorer.camp-network-testnet.gelato.digital",
    },
  },
  contracts: {},
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    camp,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
});

const client = new QueryClient();
const apolloCliet = createApolloClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <ApolloProvider client={apolloCliet}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider theme={darkTheme()}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </WagmiProvider>
  );
}

export default MyApp;

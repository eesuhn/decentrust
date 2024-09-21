import { EthereumWalletConnectors } from "@dynamic-labs/ethereum"
import { DynamicContextProvider, DynamicWidget, mergeNetworks } from "@dynamic-labs/sdk-react-core"

const gnosisChiadoNetwork = {
  blockExplorerUrls: ["https://gnosisscan.io"],
  chainId: 10200, // Gnosis testnet chain ID
  chainName: "Gnosis Chiado",
  iconUrls: ["https://app.dynamic.xyz/assets/networks/gnosis.svg"],
  name: "Gnosis",
  nativeCurrency: {
    decimals: 18,
    name: "xDAI",
    symbol: "XDAI",
  },
  networkId: 10200,
  rpcUrls: ["https://rpc.chiado.gnosis.gateway.fm"],
}

const Dynamic = () => (
  <DynamicContextProvider
    settings={{
      environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID!,
      walletConnectors: [EthereumWalletConnectors],
      overrides: {
        evmNetworks: (dashboardNetworks) => mergeNetworks([gnosisChiadoNetwork], dashboardNetworks), // Handle network merging here
      },
    }}
  >
    <DynamicWidget />
  </DynamicContextProvider>
)

export default Dynamic

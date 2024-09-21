import { EthereumWalletConnectors } from "@dynamic-labs/ethereum"
import { FlowWalletConnectors } from "@dynamic-labs/flow"
import { DynamicContextProvider, DynamicWidget, mergeNetworks } from "@dynamic-labs/sdk-react-core"

const evmChains = [
  {
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
  },
  {
    blockExplorerUrls: ["https://localhost:8545"],
    chainId: 31337, // Hardhat default local chain ID
    chainName: "Localhost",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/gnosis.svg"],
    name: "Localhost",
    nativeCurrency: {
      decimals: 18,
      name: "Ethereum",
      symbol: "ETH",
    },
    networkId: 31337,
    rpcUrls: ["http://localhost:8545"],
  },
]

const flowNetwork = {
  name: "Flow Testnet",
  networkId: "flow-testnet",
  nodeUrl: "https://rest-testnet.onflow.org",
  iconUrls: ["https://app.dynamic.xyz/assets/networks/flow.svg"],
}

const Dynamic: React.FC = () => (
  <DynamicContextProvider
    settings={{
      environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID!,
      walletConnectors: [EthereumWalletConnectors, FlowWalletConnectors],
      overrides: {
        evmNetworks: (dashboardNetworks) => mergeNetworks(evmChains, dashboardNetworks),
        flowNetwork: flowNetwork,
      },
    }}
  >
    <DynamicWidget />
  </DynamicContextProvider>
)

export default Dynamic

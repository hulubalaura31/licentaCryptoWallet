const chains = {
  "0x1": "ETH - Mainnet",
  "0x4": "ETH - Kovan",
  "0x2a": "ETH - Rinkeby",
  "0x5": "ETH - Goerli",
  "0x3":"ETH - Ropsten",
  "0xa86a": "AVAX - Avalanche Fuji",
  "0x61": "BNB - Smart Chain - Testnet",
  "0x13881": "MATIC - Mumbai",
};

export const getNativeByChain = (chain) => chains[chain];

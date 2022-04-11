export const networkConfigs = {
  "0x1": { symbol: "ETH", explorer: "https://etherscan.io/" },
  "0x3": { symbol: "ETH", explorer: "https://ropsten.etherscan.io/", buyURL: "https://faucet.metamask.io/" },
  "0x4": { symbol: "ETH", explorer: "https://kovan.etherscan.io/", buyURL: "https://faucet.kovan.network/" },
  "0x2a": { symbol: "ETH", explorer: "https://rinkeby.etherscan.io/", buyURL: "https://www.rinkeby.io/#faucet" },
  "0x5": { symbol: "ETH", explorer: "https://goerli.etherscan.io/", buyURL: "https://goerli-faucet.slock.it/" },
  "0xa86a": {
    chainId: 43113,
    chain: "Avalanche Fuji",
    currency: "AVAX",
    symbol: "AVAX",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    explorer: "https://cchain.explorer.avax.network/",
    buyURL: "https://faucet.avax-test.network/"
  },
  "0x61": {
    chainId: 97,
    chain: "Smart Chain - Testnet",
    currency: "BNB",
    symbol: "BNB",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    explorer: "https://testnet.bscscan.com",
    buyURL: "https://testnet.binance.org/faucet-smart"
  },
  "0x13881": {
    chainId: 80001,
    chain: "Mumbai",
    currency: "MATIC",
    symbol: "MATIC",
    rpcUrl: "https://rpc-mumbai.matic.today",
    explorer: "https://rpc-mumbai.matic.today",
    buyURL: "https://faucet.polygon.technology/"
  },
};

export const getNativeByChain = (chain) => networkConfigs[chain]?.symbol || "NATIVE";

export const getTransactions = (chain) => networkConfigs[chain]?.explorer;

export const getFaucet = (chain) => networkConfigs[chain]?.buyURL;

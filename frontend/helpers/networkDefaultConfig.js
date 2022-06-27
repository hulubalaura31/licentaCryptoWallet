export const defaultConfig = {
  "0x1": { symbol: "ETH", scanner: "https://etherscan.io/", chain:"Ethereum Mainnet" },
  "0x3": { symbol: "ETH", scanner: "https://ropsten.etherscan.io/", faucet: "https://faucet.dimensions.network/" , chain:"Ropsten"},
  "0x4": { symbol: "ETH", scanner: "https://kovan.etherscan.io/", faucet: "https://faucet.kovan.network/" , chain:"Kovan"},
  "0x2a": { symbol: "ETH", scanner: "https://rinkeby.etherscan.io/", faucet: "https://www.rinkeby.io/#faucet" , chain:"Rinkeby"},
  "0x5": { symbol: "ETH", scanner: "https://goerli.etherscan.io/", faucet: "https://goerli-faucet.slock.it/" , chain:"Goerli"},
  "0xa86a": {chainId: 43113, chain: "Avalanche Fuji", symbol: "AVAX", scanner: "https://cchain.scanner.avax.network/", faucet: "https://faucet.avax-test.network/"},
  "0x61": {chainId: 97, chain: "Smart Chain - Testnet", symbol: "BNB", scanner: "https://testnet.bscscan.com", faucet: "https://testnet.binance.org/faucet-smart"},
  "0x13881": {chainId: 80001, chain: "Mumbai", symbol: "MATIC", scanner: "https://polygonscan.com/", faucet: "https://faucet.polygon.technology/"},
};

export const getNativeByChain = (chain) => defaultConfig[chain]?.symbol;

export const getChain = (chain) => defaultConfig[chain]?.chain;

export const getTransactions = (chain) => defaultConfig[chain]?.scanner;

export const getFaucet = (chain) => defaultConfig[chain]?.faucet;

export const defaultConfig = {
    "0x1": { url: "https://mainnet.infura.io/v3/ffc5617974314cec831f5b1810e40590" },
    "0x3": { url: "https://ropsten.infura.io/v3/58238a3ee8aa4e27931f16cc886aad39"},
    "0x4": { url: "https://kovan.infura.io/v3/ffc5617974314cec831f5b1810e40590" },
    "0x2a": { url: "https://rinkeby.infura.io/v3/ffc5617974314cec831f5b1810e40590"},
    "0x5": { url: "https://goerli.infura.io/v3/ffc5617974314cec831f5b1810e40590" },
    "0xa86a": {chainId: 43113, chain: "Avalanche Fuji", symbol: "AVAX", scanner: "https://cchain.scanner.avax.network/", faucet: "https://faucet.avax-test.network/"},
    "0x61": {chainId: 97, chain: "Smart Chain - Testnet", symbol: "BNB", scanner: "https://testnet.bscscan.com", faucet: "https://testnet.binance.org/faucet-smart"},
    "0x13881": {chainId: 80001, chain: "Mumbai", symbol: "MATIC", scanner: "https://rpc-mumbai.matic.today", faucet: "https://faucet.polygon.technology/"},
  };
  
  export const getNodeProvider = (chain) => defaultConfig[chain]?.url;

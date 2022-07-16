
import axios from 'axios';




export const getETHTransactions = async (address, chainId) => {
    try {
        const rpcURLforRopsten = "https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=";
        const rpcURLforKovan = "https://api-kovan.etherscan.io/api?module=account&action=txlist&address=";
        const rpcURLforRinkeby = "https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=";
        console.log(address);
        console.log(chainId)
        let URL = "";
        if (chainId == '0x2a') {
            URL = rpcURLforRinkeby + address ;
        } else if (chainId == '0x3') {
            URL =  rpcURLforRopsten + address ;
        } else if (chainId == '0x4') {
            URL = rpcURLforKovan + address ;
        }
        console.log(URL)
        const response = await axios.get(URL);
        const data = response.data.result;
        return data;
    } catch (error) {
        console.error(error);
    }
}
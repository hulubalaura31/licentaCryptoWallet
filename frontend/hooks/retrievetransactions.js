
   import axios from 'axios';

   export const getETHTransactions = async (address) => {
       try {
           console.log(address);
           const URL = "https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=" + address + "&sort=asc"
           const response = await axios.get(URL);
           const data = response.data.result;
           return data;
       } catch (error) {
           console.error(error);
       }
   }
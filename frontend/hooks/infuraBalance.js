const Web3 = require('web3')
const rpcURL = "https://ropsten.infura.io/v3/ffc5617974314cec831f5b1810e40590"

const web3 = new Web3(rpcURL)

export const getBalance = async (address) => {
    try {
        var balance;
        await web3.eth.getBalance(address, (error, wei) => {
            balance =  web3.utils.fromWei(wei, 'ether')
            console.log("account2 = ",  typeof balance)           
        })
        return balance;
    } catch (error) {
        console.error(error);
    }
}
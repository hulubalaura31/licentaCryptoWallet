const Web3 = require('web3')
const rpcURLforRopsten = "https://ropsten.infura.io/v3/ffc5617974314cec831f5b1810e40590"
const rpcURLforKovan = "https://kovan.infura.io/v3/9b6c4ef0857b450880c0d2dfe8770967"
const rpcURLforMumbai = "https://rpc-mumbai.maticvigil.com/"


export const getBalance = async (address, chainId) => {
    try {
        console.log(address)
        var web3;
        if (chainId == '0x13881') {
            web3 = new Web3(rpcURLforMumbai)
        } else if (chainId == '0x3') {
            web3 = new Web3(rpcURLforRopsten);
        } else if (chainId == '0x4') {
            web3 = new Web3(rpcURLforKovan);
        }

        var balance;
        await web3.eth.getBalance(address, (error, wei) => {
            console.log(wei)
            balance = web3.utils.fromWei(wei, 'ether')
        })
        return balance;
    } catch (error) {
        console.error(error);
    }
}

var Tx = require("ethereumjs-tx").Transaction
export const sendCrypto = async (receiver, amount) => {
    try {
        // const account1 = '0x373e5BE61CA80B1eac9696b8A9A7bB438fb643Af' 
        // const account2 = '0xc0bA89aF7C7c98C4Beb2a1f00d2502CF433BFdE0' 
        if(amount.includes(",")){
            amount = amount.replace(",", ".");
            console.log(amount)
        }
        const privateKey = '0489c85523d91433aff3e82de608f0717558c9657b885cdda9d5fd40c1ef4a12' //'269d1b34000ce38be472eaeb4c40bf04d67c2348e86fc1fbef5134fa9c940cfa' (269 accpunt 2)
        var web3 = new Web3(rpcURLforRopsten);
        const SingedTransaction = await web3.eth.accounts.signTransaction({
            to:  receiver,
            value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
            gas: web3.utils.toHex(21000)
       },  privateKey  );
       var rasponseToSend;
       web3.eth.sendSignedTransaction(SingedTransaction.rawTransaction).then((receipt) => {
             console.log(receipt);
             rasponseToSend = receipt;
       }).catch(err => console.log(err.message));
       return rasponseToSend;
    } catch (error) {
        console.error(error);
    }
}
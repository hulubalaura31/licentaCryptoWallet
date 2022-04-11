import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { c2, tokenValueTxt } from "../helpers/formatters";

const useTokenPrice = (options) => {
  //console.log(options)
  const { token } = useMoralisWeb3Api();
  //console.log(token)
  const { isInitialized } = useMoralis();
  const [tokenPrice, setTokenPrice] = useState();

  useEffect(() => {
    if (isInitialized) {
      fetchTokenPrice(options)
        .then((price) => {
          price.usdPrice = c2.format(price.usdPrice);
          const { value, decimals, symbol } = price.nativePrice;
          price.nativePrice = tokenValueTxt(value, decimals, symbol);
          setTokenPrice(price);
        })
        .catch((e) => setTokenPrice(0));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  const fetchTokenPrice = async (options) => {
    /* replace method to work with fetch*/ 
    
    const { chain, address } = options;
    const ethChains = ["0x3", "0x4", "0x2a", "0x5", "0x1"]
    const mainChain = ethChains.indexOf(chain) > -1 ? "0x1" : chain == " 0xa86a" ? "43114" : chain == '0x61' ? '56' : '137';
    console.log(mainChain)
    return await token
      .getTokenPrice({ mainChain, address })
      .then((result) => result)
      .catch((e) => console.log("Fetch Price error", e.message));
  };
  return { fetchTokenPrice, tokenPrice };
};

export default useTokenPrice;

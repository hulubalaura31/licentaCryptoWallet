  export const balanceFormatter = new Intl.NumberFormat("en-us", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  });
  
  export const c2 = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  

  export const getEllipsisTxt = (str, n = 6) => {
    return `${str.substr(0, n)}...${str.substr(str.length - n, str.length)}`;
  };
  
  export const tokenValue = (value, decimals) => (decimals ? value / Math.pow(10, decimals) : value);
  
  export const tokenValueTxt = (value, decimals, symbol) => `${n4.format(tokenValue(value, decimals))} ${symbol}`;

  export const formatMarketCapForGraphs = (mCap) => {
    if (mCap > 1e12) {
        return `${(mCap / 1e12).toFixed(3)} T`;
    }
    if (mCap > 1e9) {
        return `${(mCap / 1e9).toFixed(3)} B`;
    }
    if (mCap > 1e6) {
        return `${(mCap / 1e6).toFixed(3)} M`;
    }
    if (mCap > 1e3) {
        return `${(mCap / 1e3).toFixed(3)} K`;
    }
    return mCap;
}
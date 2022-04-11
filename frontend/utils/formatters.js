  export const n4 = new Intl.NumberFormat("en-us", {
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
import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable
} from "react-native";
import useERC20Balance from "../../hooks/useERC20balance";
import { Divider } from "@ui-kitten/components";
import { useMoralisDapp } from '../../providers/MoralisDappProvider/MoralisDappProvider';
import useNativeBalance from '../../hooks/useNativeBalance';


const ChainsLogo = ({ chain }) => {
  const { walletAddress, chainId } = useMoralisDapp();
  if (["0x3", "0x4", "0x2a", "0x5"].indexOf(chainId) > -1)
    return (
      <Image
        source={{
          uri:
            "https://www.seekpng.com/png/small/193-1936896_bitseven-ethereum-balance-blue-ethereum-logo.png",
        }}
        style={styles.logo}></Image>
    );
  else if (chainId == "0xa86a")
    return (
      <Image
        source={{
          uri:
            "https://cryptologos.cc/logos/avalanche-avax-logo.png",
        }}
        style={styles.logo}></Image>
    );
  else if (chainId == "0x61")
    return (
      <Image
        source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png" }}
        style={styles.logo}></Image>
    );
  else
    return (
      <>
      <Image
        source={{
          uri:
            "https://cdn.freelogovectors.net/wp-content/uploads/2021/10/polygon-token-logo-freelogovectors.net_.png",
        }}
        style={styles.logo}></Image><Text>{chain}</Text></>
    );
};


const Item = ({ name, logo, balance, symbol, tokenAddress, chain }) => {
  console.log("item " + tokenAddress)
  const balanceFormatted = Math.round(balance * 100) / 100;
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemView}>
        <View style={{ flex: 1 }}>
          {logo ? (
            <Image source={{ uri: logo }} style={styles.logo} />
          ) : (
            <ChainsLogo chain={chain} />
          )}
        </View>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.balance} ellipsizeMode={"tail"}>
            {balanceFormatted} {symbol}
          </Text>
        </View>
      </View>

      <Divider style={{ width: "95%" }} />
    </View>
  );
};

function ERC20Balance(props) {
  const { assets } = useERC20Balance(props);
  const { Moralis } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();
  const {nativeBalance} = useNativeBalance(props?.chain || chainId);
  //console.log("nativeAAAA" + nativeBalance)
  const renderItem = ({ item }) => {
    // console.log("a " + props.chain)
    item.balance = nativeBalance.split(' ')[0];
    item.token_address=walletAddress
    if(["0x3", "0x4", "0x2a", "0x5"].indexOf(chainId) > -1){
      item.symbol="ETH";
      item.name="ETH"
    }else if(chainId == '0xa86a'){
      item.symbol="AVAX";
      item.name="AVAX"
    }else if(chainId == '0x61'){
      item.symbol="BNB";
      item.name="BNB"
    }else{
      item.symbol="MATIC";
      item.name="MATIC"
    }
    return (
      <Pressable onPress={() => (props.setToken ? props.setToken(item) : null)}>
        <Item
          name={item.name}
          logo={item.logo}
          balance={item.balance}
          symbol={item.symbol}
          tokenAddress={item.token_address}
          chain={chainId}
        />
      </Pressable>
    );
  };

  return (
    <FlatList
      style={styles.assetsViewer}
      scrollEnabled={false}
      data={assets}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  itemView: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 2,
    flex: 1,
    flexDirection: "row",
  },
  balance: {
    fontSize: 15,
    color: "grey",
    fontWeight: "400",
  },
  name: {
    fontSize: 15,
    color: "black",
    fontWeight: "500",
  },
  logo: {
    height: 40,
    width: 40,
  },
  assetsViewer: {
    borderRadius: 10,
  },
});

export default ERC20Balance;

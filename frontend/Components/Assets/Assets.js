import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, Image, TouchableOpacity, View, Linking, Button } from "react-native";
import { useMoralisDapp } from '../../providers/MoralisDappProvider/MoralisDappProvider';
import eth from './eth-blue.png'
import coins from './coins.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoneyCheck, faPaperPlane, faRetweet, faInfo } from '@fortawesome/free-solid-svg-icons';
import Balance from "./Balance";
import Popover from 'react-native-popover-view';
import { getFaucet } from "../../helpers/networks";
import { useNavigation } from "@react-navigation/native";

export default function Assets() {
  const { walletAddress, chainId } = useMoralisDapp();
  const [color, setColor] = useState("white");
  const picture = chainId == "0x1" || "0x3" ? eth : coins;
  const allChains = ["0x3", "0x4", "0x2a", "0x5", "0xa86a", "0x61", "0x13881"]
  const enableSwap = allChains.indexOf(chainId) > -1 ? false : true
  const swapColor = enableSwap ? "#0B3066" : "#7495c5"
  const onPressGoToFaucet = () => {
    Linking.openURL(
      `${getFaucet(chainId)}`
    )
  }

  const navigation = useNavigation();

  const handleSendCrypto = () => {
    navigation.navigate("Send")
  }

  const handleGoToNews = () => {
    navigation.navigate("News")
  }


  return (
    <SafeAreaView style={styles.areaContainer}>
      <Image source={picture} style={{ width: 180, alignSelf: 'center', marginTop: 30 }} />
      <Balance chain={chainId} />
      <View style={styles.buttonsContainer}>
        <Popover popoverStyle={{ width: 250, height: 150, borderRadius: 30 }}
          from={(
            <TouchableOpacity style={styles.buttons} >
              <FontAwesomeIcon icon={faMoneyCheck} size={40} color={color} style={{ alignSelf: 'center' }} />
              <Text style={{ alignSelf: 'center', color: 'white' }} >BUY</Text>
            </TouchableOpacity>
          )} >
          <Text style={styles.faucetText}>Get coins directly from the primarly faucet</Text>
          <TouchableOpacity onPress={() => onPressGoToFaucet()} style={styles.faucetButton}>
            <Text style={{ alignSelf: 'center', color: 'white', paddingTop: 5 }}>Faucet</Text>
          </TouchableOpacity>
        </Popover>
        <TouchableOpacity style={styles.buttons} onPress={() => handleSendCrypto()}>
          <FontAwesomeIcon icon={faPaperPlane} size={40} color={color} style={{ alignSelf: 'center' }} />
          <Text style={{ alignSelf: 'center', color: 'white' }}>SEND</Text>
        </TouchableOpacity>
        <Popover popoverStyle={{ width: 260, height: 100, borderRadius: 30 }}
          from={(
            <TouchableOpacity style={styles.buttonSwap} enable={enableSwap} backgroundColor={swapColor}>
              <FontAwesomeIcon icon={faRetweet} size={40} color={color} style={{ alignSelf: 'center' }} />
              <Text style={{ alignSelf: 'center', color: 'white' }}>SWAP</Text>
            </TouchableOpacity>
          )} >
          <Text style={styles.faucetText}>Swap is available only on Mainnets</Text>
        </Popover>
      </View>
      <View style={styles.newsContainer}>
      <TouchableOpacity style={styles.infoButton} enable={enableSwap} backgroundColor={swapColor} onPress={handleGoToNews}>
              <FontAwesomeIcon icon={faInfo} size={40} color={color} style={{ alignSelf: 'center' }} />
              <Text style={{ alignSelf: 'center', color: 'white' }}>News</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingBottom: 30
  },
  buttons: {
    backgroundColor: "#0B3066",
    width: 100,
    borderRadius: 50
  },
  buttonSwap: {
    backgroundColor: "#7495c5",
    width: 100,
    borderRadius: 50
  },
  faucetText: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingBottom: 20,
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  faucetButton: {
    backgroundColor: "#0B3066",
    color: "#0B3066",
    height: 30,
    borderRadius: 30,
    width: 150,
    alignSelf: 'center'
  },
  newsContainer:{
    flex: 1,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 150,
    paddingBottom: 100
  },
  infoButton:{
    backgroundColor: "#4c8ce8",
    width: 100,
    borderRadius: 50
  }
});

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Modal } from 'react-native';
import { useMoralis, useWeb3Transfer } from "react-moralis";
import { useMoralisDapp } from '../../providers/MoralisDappProvider/MoralisDappProvider';
import { Button } from "@ui-kitten/components";
import { TextInput } from "react-native-paper";
import { faAddressBook, faCoins, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ScrollView } from "react-native-gesture-handler";

const color = "#0B3066";
export default function Transfer() {

  const { walletAddress, chainId } = useMoralisDapp();
  const [receiver, setReceiver] = useState();
  const [token, setToken] = useState();
  const [amount, setAmount] = useState();

  const [transferOptionsState, setTransferOptionsState] = useState();
  const { fetch, error, isFetching } = useWeb3Transfer(transferOptionsState);

  const { Moralis, web3 } = useMoralis();
  const tokenAddress = token ? token.token_address : "";
  const ethChains = ["0x3", "0x4", "0x2a", "0x5", "0x1"]
  const tokenValue = ethChains.indexOf(chainId) > -1 ? "ETH" : chainId == " 0xa86a" ? "AVAX" : chainId == '0x61' ? 'BNB' : 'MATIC';


  useEffect(() => {
    if (amount && receiver) {
      setTransferOptionsState({
        amount: Moralis.Units.ETH(0.5),
        receiver: receiver,
        type: "native",
        contractAddress: tokenAddress,
      });
    }
  }, [token, amount, receiver]);

  const [showModal, setShowModal] = useState(false);
  const sendTransaction = () => {
    try {
      fetch();
    } catch (err) {
      console.log(err)
    }
  }

  const resetInput = () => {
    setAmount("");
    setReceiver("")
  }

  function openAlertBox() {
    setShowModal(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.scrollViewContainer}>
          <View style={styles.viewContainer}>
            <Text style={styles.headerText} category="h4">
              Transfer
            </Text>
            <FontAwesomeIcon icon={faPaperPlane} size={30} color={color} style={{ marginLeft: 10 }} />
          </View>

          <View style={[styles.flex1, styles.inputView]}>
            <View style={styles.viewContainer}>
              <View style={{ flex: 1 }}>
                <Text style={styles.labelText}>Asset:</Text>
              </View>
              <View style={{ flex: 4 }}>
                <Text style={styles.labelText}>
                  {tokenValue}
                </Text>
              </View>
            </View>
            <View style={styles.viewContainer}>
              <View style={[styles.flex1, { marginTop: 22 }]}>
                <FontAwesomeIcon icon={faAddressBook} size={40} color={color} />
              </View>
              <View style={styles.flex4}>
                <TextInput
                  label="Receiver (Address):"
                  value={receiver}
                  onChangeText={(text) => setReceiver(text)}
                  style={{ backgroundColor: "white" }}
                  maxLength={42}
                />
              </View>
            </View>

            <View style={styles.viewContainer}>
              <View style={[styles.flex1, { marginTop: 22 }]}>
                <FontAwesomeIcon icon={faCoins} size={40} color={color} />
              </View>
              <View style={styles.flex4}>
                <TextInput
                  label="Amount"
                  value={amount}
                  keyboardType="numeric"
                  onChangeText={(text) => setAmount(text)}
                  style={{ backgroundColor: "white" }}
                />
              </View>
            </View>
          </View>
          <View>
          </View>
          <View style={[styles.flex1, styles.justifyCenter]}>
            <Button
              mode="contained"
              disabled={!(receiver && amount)}
              style={
                receiver && amount
                  ? styles.button
                  : styles.diabledButton
              }
              labelStyle={{ color: "white", fontSize: 20 }}
              onPress={openAlertBox}>
              Transfer
            </Button>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  viewContainer: {
    flexDirection: "row",
  },
  headerText: {
    color: "black",
    fontWeight: "600",
    fontSize: 30,
  },
  inputView: {
    borderColor: "grey",
    borderRadius: 15,
    borderWidth: 0.5,
    justifyContent: "space-around",
    // shadowOffset: "5",
    elevation: 10,
    marginTop: 10,
    padding: 20,
    shadowColor: "grey",
  },
  scrollView: {
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  labelText: {
    fontSize: 20,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "green",
    elevation: 5,
  },
  diabledButton: {
    backgroundColor: "grey",
  },
  justifyCenter: {
    justifyContent: "space-around",
    marginTop: 20
  },
  flex1: {
    flex: 1,
  },
  flex4: {
    flex: 4,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  }
});
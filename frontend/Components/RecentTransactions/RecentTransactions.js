import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  StatusBar,
  ScrollView
} from "react-native";
import { getEllipsisTxt } from "../../utils/formatters";
import { useMoralisDapp } from '../../providers/MoralisDappProvider/MoralisDappProvider';
import { Divider, Modal, Button, Card } from "@ui-kitten/components";
import {
  TouchableOpacity,
} from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { getETHTransactions } from '../../hooks/retrievetransactions';
import Popover from 'react-native-popover-view';
const Item = ({ Moralis, hash, }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemView}>
      <View style={{ flex: 3, justifyContent: "center" }}>
        <Text style={styles.textHash}>🔵  Hash: {getEllipsisTxt(hash, 7)}</Text>
      </View>
    </View>
    <Divider />

  </View>
);


function RecentTransactions() {
  const { Moralis } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getTransactions = async () => {
      const transactionData = await getETHTransactions(walletAddress);
      setData(transactionData);
      console.log(transactionData[0])
    }
    getTransactions();
  }, [])


  const renderItem = ({ item }) => {
    //console.log(item.blockHash)
    return (
      <Popover popoverStyle={{ width: 250, height: 190, borderRadius: 30 }}
        from={(
          <TouchableOpacity>
            <Item
              Moralis={Moralis}
              hash={item.hash}
            />
          </TouchableOpacity>
        )} >
          <Text style={styles.info}>Transaction details</Text>
          <View style={styles.itemView}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.text}>Block Hash: {getEllipsisTxt(item.blockHash, 7)}</Text>
          <Text style={styles.text}>Block No: {item.blockNumber}</Text>
          <Text style={styles.text}>Gas Used: {parseFloat(Moralis.Units.FromWei(item.gasUsed, 9))}</Text>
          <Text style={styles.text}>Gas Price: {parseFloat(Moralis.Units.FromWei(item.gasPrice, 9))}</Text>
        </View>
        </View>
        </Popover>
    );
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.viewContainer}>
          <Text style={styles.headerText} category="h4">
            Recent transactions
          </Text>
          {data ? (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          ) : (
            <ActivityIndicator />
          )}
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
  viewContainer: {
    paddingHorizontal: 20,
    paddingTop: 7,
  },
  headerText: {
    color: "black",
    fontWeight: "600",
    fontSize: 30,
    textAlign: 'center',
    textDecorationColor: "black",
    textDecorationLine: "underline"
  },
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  itemView: {
    backgroundColor: "white",
    padding: 7,
    marginHorizontal: 2,
    flex: 1,
    flexDirection: "row",
    height: 70
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
  text: {
    fontSize: 15,
    color: "#0B3066",
    fontWeight: "500",
  },
  textHash: {
    fontSize: 25,
    color: "#0B3066",
    fontWeight: "500",
    fontWeight: 'bold'
  },
  info: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingBottom: 10,
    fontStyle: 'italic',
    fontWeight: 'bold'
  }
});

export default RecentTransactions;

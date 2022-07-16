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
import {
  TouchableOpacity,
} from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { getETHTransactions } from '../../hooks/retrievetransactions';
import Popover from 'react-native-popover-view';
import { SearchBar } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

const Item = ({ hash }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemView}>
      <View style={{ flex: 3, justifyContent: "center" }}>
        <Text style={styles.textHash}>🔵  Hash: {getEllipsisTxt(hash, 7)}</Text>
      </View>
    </View>
  </View>
);

function RecentTransactions() {
  const { Moralis } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const getTransactions = async () => {
      const transactionData = await getETHTransactions(walletAddress, chainId);
      setData(transactionData);
      setFilteredData(transactionData)
      console.log(transactionData[0])
    }
    getTransactions();
  }, [])



  updateSearch = (event) => {
    setSearch(event);
    if (event) {
      setFilteredData(data.filter(x => x.blockHash.includes(event)))
    } else if (event == '' || event == null || event == undefined) {
      setFilteredData(data)
    }
  };


  const refreshTransactions = async () => {
    const transactionData = await getETHTransactions(walletAddress, chainId);
    setData(transactionData);
    setFilteredData(transactionData)
  }

  const TransactionItem = ({ item }) => {
    return (
      <Popover popoverStyle={{ width: 250, height: 190, borderRadius: 30 }}
        from={(
          <TouchableOpacity>
            <Item
              hash={item.blockHash}
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
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.headerText} category="h4">
              Transactions
            </Text>
            <TouchableOpacity style={styles.iconRefresh} onPress={refreshTransactions}>
              <FontAwesomeIcon icon={faRedo} size={15} color="#0B3066" />
            </TouchableOpacity>
          </View>
          <SearchBar
            placeholder="Search by block hash..."
            onChangeText={updateSearch}
            placeholderTextColor={'#g5g5g5'}
            inputStyle={{ backgroundColor: 'white' }}
            containerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5 }}
            value={search}
            style={styles.searchbarStyle}
          />
          {data ? (
            <FlatList
              data={filteredData}
              renderItem={TransactionItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={true}
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
  },
  iconRefresh: {
    paddingTop: 10,
    paddingLeft: 30
  }
});

export default RecentTransactions;

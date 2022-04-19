import React, { useState, useRef, useMemo, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Image, FlatList, Button } from 'react-native';
import CoinItem from './CoinItem';
import dummy1 from './testData/dummy2Cryptocurrencies.json'
import { getMarketData } from '../../hooks/retrieveCryptoPrices';
import { SearchBar } from 'react-native-elements';


const GraphsAssets = (props) => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [search, setSearch] = useState(null);
  const bottomSheetModalRef = useRef(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
      setFilteredData(marketData);
    }

    fetchMarketData();
  }, []);


  updateSearch = (event) => {
    setSearch(event);
    console.log(event)
    if(event){
      setFilteredData(data.filter(x => x.name.includes(event)))
    }else if(event == '' || event == null || event == undefined){
      setFilteredData(data)
    }
  };

    /* replace dummy with fetched data  */
  return (
    
    <SafeAreaView style={styles.itemContainer}>
        <SearchBar
        placeholder="Search by name..."
        onChangeText={updateSearch}
        value={search}
        style={styles.searchbarStyle}
      />
      <FlatList data={filteredData} renderItem={({item}) => <CoinItem marketCoin={item} /> } />
    </SafeAreaView>

  );
};
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: '#fff8f8'
  },
  searchbarStyle: {
    backgroundColor: "white"
  }
})

export default GraphsAssets;

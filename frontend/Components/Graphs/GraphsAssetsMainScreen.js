import React, { useState, useRef, useMemo, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Image, FlatList } from 'react-native';
import CoinItem from './CoinItem';
import dummy1 from './testData/dummy2Cryptocurrencies.json'
import { getMarketData } from '../../hooks/retrieveCryptoPrices';

const GraphsAssets = (props) => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const bottomSheetModalRef = useRef(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    }

    fetchMarketData();
  }, [])
    /* replace dummy with fetched data  */
  return (

    <SafeAreaView style={styles.itemContainer}>
      <FlatList data={dummy1} renderItem={({item}) => <CoinItem marketCoin={item} /> } />
    </SafeAreaView>

  );
};
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: '#fff8f8'
  }
})

export default GraphsAssets;

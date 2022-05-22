import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Image, FlatList } from 'react-native';
import { getMarketNews } from '../../hooks/retrieveNews';
import NewsItem from './NewsItem'


const News = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
      const fetchMarketData = async () => {
        const marketData = await getMarketNews();
        setData(marketData.results);
      }
      
      fetchMarketData();
    }, [])
  //console.log(data)
  return (
    <SafeAreaView style={styles.itemContainer}>
      <FlatList data={data} renderItem={({item}) => <NewsItem marketNews={item} /> } />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: '#fff8f8'
  }
})

export default News;

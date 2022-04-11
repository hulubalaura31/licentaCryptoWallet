import React from "react";
import { View, StyleSheet, Text, Image } from 'react-native';

const GraphHeader = (props) => {
    const { coinId, image, symbol, marketCapRank } = props;
    return(
        <View style={styles.headerContainer}>
        <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            #{marketCapRank}
          </Text>
        </View>
      </View>
      </View>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    tickerContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    tickerTitle: {
      fontWeight: 'bold',
      marginHorizontal: 5,
      fontSize: 17
    },
    rankContainer: {
      backgroundColor: "#f3e9e9",
      paddingHorizontal: 5,
      paddingVertical: 2,
      borderRadius: 5
    }
  });
    

export default GraphHeader;
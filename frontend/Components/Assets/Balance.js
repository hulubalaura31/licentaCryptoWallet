import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import useNativeBalance from '../../hooks/useNativeBalance';

function Balance(props) {
  const {nativeBalance} = useNativeBalance(props?.chain || chainId);

  return (
    <View style={styles.itemView}>
      <Text style={styles.name}>💰 {nativeBalance} </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  itemView: {
    backgroundColor: "white",//#d2a56d
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 25,
    color: 'black',
    fontWeight: '500',
    alignSelf: 'center',
    paddingTop: 30
  },
});

export default Balance;
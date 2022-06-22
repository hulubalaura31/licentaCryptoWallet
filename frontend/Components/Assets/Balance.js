import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { getBalance } from "../../hooks/infuraBalance";
import { useMoralisDapp } from '../../providers/MoralisDappProvider/MoralisDappProvider';
import { getChain, getNativeByChain } from '../../helpers/networkDefaultConfig';

function Balance(props) {
  const [balance, setBalance] = useState(0);
  const { walletAddress, chainId } = useMoralisDapp();

  useEffect(() => {
    const fetchBalance = async () => {
      const sold = await getBalance(walletAddress);
      setBalance(sold);
      console.log(sold);
    }
     fetchBalance();
  }, [])

  return (
    <View style={styles.itemView}>
      <Text style={styles.name}>💰 {parseFloat(balance).toFixed(4)} {getNativeByChain(props.chain)} - {getChain(props.chain)} </Text>
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
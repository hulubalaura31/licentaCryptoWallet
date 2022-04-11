import React, {useState, createRef} from 'react';
import {Text, View, StyleSheet, Clipboard, TouchableOpacity} from 'react-native';
import {useMoralisDapp} from '../providers/MoralisDappProvider/MoralisDappProvider';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import {Tooltip} from '@ui-kitten/components';


export default function Address() {
  const {walletAddress, chainId} = useMoralisDapp();
  const [tipVisible, setTipVisible] = useState(false);

  const copyToClipboard = () => {
    Clipboard.setString(walletAddress);
    setTipVisible(true);
  };

  const renderAddress = () => (
    <View style={styles.viewContainer}>
      <TouchableOpacity
        style={styles.viewContainer}
        onPress={() => copyToClipboard()}>
        <Text
          style={styles.headerText}
          ellipsizeMode={'middle'}
          numberOfLines={1}>
           {walletAddress}
        </Text>

        <FontAwesomeIcon icon={faCopy} size={15} color="#0B3066" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Tooltip
      anchor={renderAddress}
      visible={tipVisible}
      onBackdropPress={() => setTipVisible(false)}>
      Copied Address ✅
    </Tooltip>
  );
}
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: "#0B3066",
    alignItems: 'center',
  },
  imageContainer: {
    height: 20,
    width: 20,
    borderRadius: 20,
  },
  headerText: {
    width: 180,
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#0B3066',
    fontWeight: '600',
  },
});

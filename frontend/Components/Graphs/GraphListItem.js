import React, { useState, useEffect } from 'react';
import EthLogo from './ethereum-icon-20.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Popover from 'react-native-popover-view';
import {
    LineChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;


const CoinItem = ({ marketCoin }) => {
    const { id, name, current_price, market_cap_rank, price_change_percentage_24h, symbol, market_cap, image, sparkline_in_7d, price_change_percentage_7d_in_currency } = marketCoin;
    const [data, setData] = useState(null);
    const [rsi, setRsi] = useState(null);
    //console.log(sparkline_in_7d)
    const formatMarketCap = (mCap) => {
        if (mCap > 1e12) {
            return `${(mCap / 1e12).toFixed(3)} T`;
        }
        if (mCap > 1e9) {
            return `${(mCap / 1e9).toFixed(3)} B`;
        }
        if (mCap > 1e6) {
            return `${(mCap / 1e6).toFixed(3)} M`;
        }
        if (mCap > 1e3) {
            return `${(mCap / 1e3).toFixed(3)} K`;
        }
        return mCap;
    }

    const transformData = (data) => {
        let x = [];
        data.map((each, index) => {
            x.push(each)
        })
        var copy = [...x];
        useEffect(() => {
            setData(copy)
        }, [])

        var RSIvalues = [];
        for (var i = x.length; i >= 0; i--) {
            var result = calculateRSI(x, 100);
            RSIvalues.push(result);
            x.splice(0, 1);
        }
        //console.log(RSIvalues);
        useEffect(() => {
            setRsi(RSIvalues);
        }, [])
        return copy;
    }

    const calculateRSI = (prices, Tolerance) => {
        var sumGain = 0;
        var sumLoss = 0;
        for (var i = 1; i < prices.length; i++) {
            var difference = prices[i] - prices[i - 1];
            if (difference >= 0) {
                sumGain += difference;
            }
            else {
                sumLoss -= difference;
            }
        }

        if (sumGain == 0) return 0;
        if (Math.abs(sumLoss) >= Tolerance) return 100;

        var relativeStrength = sumGain / sumLoss;

        return 100.0 - (100.0 / (1 + relativeStrength));
    }



    return (
        <View style={styles.coinContainer}>
            <Popover popoverStyle={{ width: 450, height: 420, borderRadius: 30 }}
                from={(
                    <TouchableOpacity
                        key={id}
                        style={styles.coinContainer}
                    >
                        <Image source={{ uri: image }} style={{ height: 55, width: 55, marginLeft: 10, alignSelf: 'center' }}></Image>
                        <View>
                            <Text style={styles.nameAndSymbol}>{name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.nameAndSymbol}>{symbol.toUpperCase()}</Text>
                            </View>
                        </View>
                        <View style={{ marginLeft: 'auto', display: "flex", alignItems: "flex-end" }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.coin}>{current_price}$</Text>
                                <FontAwesomeIcon icon={price_change_percentage_24h < 0 ? faArrowDown : faArrowUp} size={15} color={price_change_percentage_24h < 0 ? 'red' : 'green'}  />
                                <Text style={styles.priceChange} >{price_change_percentage_24h.toFixed(2)}%</Text>
                            </View>
                            <Text style={{ display: "flex", alignItems: "flex-end" }}>M. Cap:{formatMarketCap(market_cap)}</Text>
                        </View>
                    </TouchableOpacity>
                )} >
                <View style={{ paddingHorizontal: 10 }} >
                    <View>
                        <Text style={{ paddingTop: 10, fontWeight: 'bold' }}>{name}  -  Price: {current_price}</Text>
                        <LineChart
                            data={{
                                datasets: [
                                    {
                                        data: transformData(sparkline_in_7d.price)
                                    }
                                ]
                            }}
                            width={370}
                            height={220}
                            chartConfig={{
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 18
                                },
                                propsForDots: {
                                    r: "0",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            bezier
                            style={{
                                paddingRight: 8,
                                borderRadius: 0
                            }}
                        />
                        <Text style={{ paddingTop: 10, fontWeight: 'bold' }}>Relative Strength Index (RSI)</Text>
                        <LineChart
                            data={{
                                datasets: [
                                    {
                                        data: rsi
                                    }
                                ]
                            }}
                            width={370}
                            height={120}
                            chartConfig={{
                                backgroundColor: "#ffffff",
                                backgroundGradientFrom: "#f3f6f4",
                                backgroundGradientTo: "#eeeeee",
                                color: (opacity = 1) => `rgba(20, 13, 17, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                withVerticalLabels: false,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "0",
                                    strokeWidth: "0",
                                    stroke: "#ffa726"
                                }
                            }}
                            bezier
                            style={{
                                paddingRight: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>
                </View>
            </Popover>
        </View>
    );
}


const styles = StyleSheet.create({
    coin: {
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 5,
        alignSelf: 'center'
    },
    coinContainer: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#bcbcbc',
        padding: 15
    },
    number: {
        fontWeight: 'bold',
        marginLeft: 5
    },
    priceChange:{
        fontSize: 15,
        fontWeight: 'bold',
        //marginLeft: 5,
    },
    nameAndSymbol:{
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 30,
        alignSelf: 'center'
    }
})


export default CoinItem;
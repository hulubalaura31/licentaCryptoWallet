import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import {formatMarketCapForGraphs} from '../../utils/formatters';
import Popover from 'react-native-popover-view';
import {
    LineChart
} from "react-native-chart-kit";


const GraphItem = ({ marketCoin }) => {
    const { id, name, current_price, price_change_percentage_24h, symbol, market_cap, image, sparkline_in_7d } = marketCoin;
    const [data, setData] = useState(null);
    const [rsi, setRsi] = useState(null);

    const formatData = (data) => {
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
        
        useEffect(() => {
            setRsi(RSIvalues);
        }, [])
        return copy;
    }

    const calculateRSI = (prices, Tolerance) => {
        var totalGain = 0;
        var totalLoss = 0;
        for (var i = 1; i < prices.length; i++) {
            var difference = prices[i] - prices[i - 1];
            if (difference >= 0) {
                totalGain += difference;
            }
            else {
                totalLoss -= difference;
            }
        }

        if (totalGain == 0) {
            return 0;
        }
        if (Math.abs(totalLoss) >= Tolerance) return 100;

        var relativeStrength = totalGain / totalLoss;

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
                            <Text style={{ display: "flex", alignItems: "flex-end" }}>M. Cap:{formatMarketCapForGraphs(market_cap)}</Text>
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
                                        data: formatData(sparkline_in_7d.price)
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


export default GraphItem;
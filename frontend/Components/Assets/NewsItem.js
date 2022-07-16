import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, Linking } from 'react-native';
import Popover from 'react-native-popover-view';
const screenWidth = Dimensions.get("window").width;


const NewsItem = ({ marketNews }) => {
    const { category, country, description, link, title } = marketNews;

    const onPressGoToNews = () => {
        console.log(link)
        console.log("aaaaaaa")
        Linking.openURL(
            `${link}`
        )
    }
    return (
        <View style={styles.coinContainer}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.newsDetails}>{category.join(",")} - </Text>
                        <Text style={styles.newsDetails}>{country.join(",")}</Text>
                    </View>
                    <Text style={styles.coin} >{description}</Text>
                    <Popover popoverStyle={{ width: 200, height: 80, borderRadius: 30 }}
                        from={(
                            <Text style={styles.coin} >Click for more</Text>
                        )} >
                        <TouchableOpacity onPress={() => onPressGoToNews()} style={styles.faucetButton}>
                            <Text style={{ alignSelf: 'center', color: 'white', paddingTop: 5 }}>Open article in browser</Text>
                        </TouchableOpacity>
                    </Popover>
                </View>
            </View>
            {/* </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    newsDetails: {
        fontSize: 11,
        fontStyle: 'italic',
        marginLeft: 10
    },
    coinContainer: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#bcbcbc',
        padding: 15
    },
    title: {
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 20
    },
  faucetButton: {
    backgroundColor: "#0B3066",
    color: "#0B3066",
    height: 30,
    borderRadius: 30,
    width: 170,
    alignSelf: 'center',
    marginTop: 30
  }
})


export default NewsItem;
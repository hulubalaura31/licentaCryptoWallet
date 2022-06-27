import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, Linking } from 'react-native';

const screenWidth = Dimensions.get("window").width;


const NewsItem = ({ marketNews }) => {
    const { category, country, description, link, title} = marketNews;

    const onPressGoToNews = (link) => {
        Linking.openURL(
          `${link}`
        )
      }
    return (
        <View style={styles.coinContainer}>
            <TouchableOpacity
                style={styles.coinContainer}
                onPress={onPressGoToNews(link)}
            >
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.newsDetails}>{category.join(",")} - </Text>
                        <Text style={styles.newsDetails}>{country.join(",")}</Text>
                        </View>
                        <Text style={styles.coin} >{description}</Text>
                    </View>
                </View>             
            </TouchableOpacity>
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
    }
})


export default NewsItem;
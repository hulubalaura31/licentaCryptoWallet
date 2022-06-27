import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView, SafeAreaView, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { Card } from '@ui-kitten/components';
import VideoPlayer from "react-native-video-player";
import { getVideos } from '../../helpers/learningVideoConfig';

const Learn = () => {
  const [data, setData] = useState([]);
  const AMRurl = 'https://www.youtube.com/c/AMRinvest';
  const BrianURL = 'https://www.youtube.com/playlist?list=PLhPAemPIv_qtvPuDgOYnnsJfAFrKprTRs';
  const JackUrl = 'https://www.youtube.com/c/CryptoJackk';
  const investopediaUrl = 'https://www.investopedia.com/';

  const goToURL = (id) => {
    if(id == 'amr'){
      Linking.openURL(AMRurl)
    }else if(id == 'brian'){
      Linking.openURL(BrianURL)
    }else if(id == 'jack'){
      Linking.openURL(JackUrl)
    }else{
      Linking.openURL(investopediaUrl)
    }
    
  }

  useEffect(() => {
    const fetchVideos = () => {
      const videoData = getVideos();
      setData(videoData);
    }
    fetchVideos();
  }, [])

  return (
    <SafeAreaView>
      <ScrollView style={{ marginTop: 10 }} >
        <FlatList data={data} keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => {
            return (
              <ScrollView style={{ marginTop: 10 }} >
                <Card header={
                  () => (
                    <View>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }} >{item.title}</Text>
                    </View>
                  )}
                  footer={() => (
                    <View>
                      <Text style={{ fontStyle: 'italic', paddingLeft: 5 }}>Time duration: {item.time} min </Text>
                    </View>
                  )}></Card>
                <VideoPlayer
                  video={{ uri: item.url }}
                  autoplay={false}
                  defaultMuted={false}
                  thumbnail={require("./assets/coins.png")}
                />

              </ScrollView>
            )
          }} />
        <View style={styles.areaContainer}>
          <Text style={{ alignSelf: 'center', color: 'black', fontWeight: 'bold', fontSize: 20 }}>More tutorials on Youtube</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.buttons} onPress={() => goToURL('amr')}>
              <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold' }} >AMR Invest</Text>
              </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={() => goToURL('brian')}>
              <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold' }} >Brian Jung</Text>
              </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={() => goToURL('jack')}>
              <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold' }}>CryptoJack</Text>
              </TouchableOpacity>
          </View>
          <Text style={{ alignSelf: 'center', color: 'black', fontWeight: 'bold', fontSize: 20 }}>Grow your knowledge by learning</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.InvestopediaButton} onPress={() => goToURL('investopedia')}>
              <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold' }} >Investopedia</Text>
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  areaContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingBottom: 30
  },
  buttons: {
    backgroundColor: "#0B3066",
    width: 100,
    borderRadius: 50
  },
  InvestopediaButton: {
    backgroundColor: "#0B3066",
    color: "#0B3066",
    height: 20,
    borderRadius: 30,
    width: 150,
    alignSelf: 'center',
    marginLeft: 90
  }
});

export default Learn;
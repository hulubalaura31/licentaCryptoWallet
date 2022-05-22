import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView } from "react-native";
import { faAddressBook, faCoins, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Card } from '@ui-kitten/components';
import VideoPlayer from "react-native-video-player";
import { getVideos } from '../../helpers/learningVideoConfig';

const Learn = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchVideos = () => {
      const videoData = getVideos();
      setData(videoData);
      console.log(videoData)
    }

    fetchVideos();
  }, [])
  return (
    <SafeAreaView>
      <FlatList data={data} keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => {
          return (
            <ScrollView style={{ marginTop: 10 }} >
              <Card header={
                () => (
                  <View styles={{alignItems: 'center'}} >
                    <Text style={Styles.title} >{item.title}</Text>
                  </View>
                )}
                footer={() => (
                  <View>
                    <Text>Time duration: {item.time} min </Text>
                  </View>
                )}></Card>
                <VideoPlayer 
                video={{uri: item.url}}
                autoplay={false}
                defaultMuted={false}
                />
            </ScrollView>
          )
        }} />
    </SafeAreaView>
  );
};


export default Learn;

const Styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
})
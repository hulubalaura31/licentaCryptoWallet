import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView, SafeAreaView } from "react-native";
import { Card } from '@ui-kitten/components';
import VideoPlayer from "react-native-video-player";
import { getVideos } from '../../helpers/learningVideoConfig';

const Learn = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchVideos = () => {
      const videoData = getVideos();
      setData(videoData);
    }
    fetchVideos();
  }, [])

  return (
    <SafeAreaView>
      <FlatList data={data} keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => {
          return (
            <ScrollView style={{ marginTop: 10 }} >
              <Card header={
                () => (
                  <View>
                    <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}} >{item.title}</Text>
                  </View>
                )}
                footer={() => (
                  <View>
                    <Text style={{fontStyle: 'italic', paddingLeft: 5}}>Time duration: {item.time} min </Text>
                  </View>
                )}></Card>
                <VideoPlayer 
                video={{uri: item.url}}
                autoplay={false}
                defaultMuted={false}
                thumbnail={require("./assets/coins.png")}
                />
            </ScrollView>
          )
        }} />
    </SafeAreaView>
  );
};


export default Learn;
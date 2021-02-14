import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Avatar} from 'react-native-paper';

function SplashScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Avatar.Image
        source={{
          uri: 'https://en.pimg.jp/058/954/148/1/58954148.jpg',
        }}
        size={100}
      />
      <ActivityIndicator color="red" size="large" />
    </View>
  );
}
export default SplashScreen;

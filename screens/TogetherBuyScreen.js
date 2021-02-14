import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {AuthContext} from '../Context';

import styled from 'styled-components/native';

function TogetherBuyScreen() {
  const {loginState} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(loginState)}</Text>
      <Button title="click" />
    </View>
  );
}

export default TogetherBuyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

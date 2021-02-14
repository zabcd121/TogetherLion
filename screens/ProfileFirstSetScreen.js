import React from 'react';
import {View, Text, Image} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  align-items: center;
  background: #fff;
  flex-direction: row;
`;
const ImageBlock = styled.View`
  flex: 1;
  width: 58%;
  padding: 0 0 20px 0;
`;
const InputBlock = styled.View`
  flex: 3;
  background: #fadf;
`;

export default function ProfileFirstSetScreen() {
  return (
    <Container>
      <ImageBlock>
        <Image style={{}} source={require('../assets/userIcon.png')} />
      </ImageBlock>
      <InputBlock>
        <Text></Text>
      </InputBlock>
    </Container>
  );
}

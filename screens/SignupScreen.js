import React, {useState} from 'react';
import styled from 'styled-components/native';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
// import Axios from 'axios';
import {axiosInstance} from '../api';
import {AuthContext} from '../Context';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  align-items: center;
  background: #fff;
`;

const Text = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export default function SignupScreen({navigation}) {
  const [data, setData] = useState({
    phone_number: '',
    auth_number: '',
    check_textInputChange: false,
  });

  const {authContext} = React.useContext(AuthContext);
  const {signIn} = authContext;

  const sendPhoneNumHandler = (phone_number) => {
    let dataToSend = {phone_number: phone_number};
    axiosInstance
      .post('/v1/accounts/auth/', dataToSend)
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const AuthNumberHandler = (phone_number, auth_number) => {
    let dataToSend = {phone_number: phone_number, auth_number: auth_number};
    axiosInstance
      .post('/v1/accounts/auth/verify/', dataToSend)
      .then((response) => {
        const {is_signed, user} = response.data;
        if (is_signed) {
          navigation.navigate('Home');
          signIn(user);
        } else {
          navigation.navigate('FirstProfile');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        phone_number: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        phone_number: val,
        check_textInputChange: false,
      });
    }
  };

  const handleAuthNumberChange = (val) => {
    setData({
      ...data,
      auth_number: val,
    });
  };

  return (
    <Container>
      <TextInput
        style={{marginBottom: 15}}
        placeholder="휴대폰 번호를 입력해주세요"
        onChangeText={(val) => textInputChange(val)}
      />
      <Button onPress={() => sendPhoneNumHandler(data.phone_number)}>
        <Text>인증문자 받기</Text>
      </Button>
      <TextInput
        style={{marginTop: 15, marginBottom: 15}}
        placeholder="인증번호를 입력해주세요"
        onChangeText={(val) => handleAuthNumberChange(val)}
      />
      <Button
        color="#81d4fa"
        onPress={() => AuthNumberHandler(data.phone_number, data.auth_number)}>
        <Text>동의하고 시작 !</Text>
      </Button>
    </Container>
  );
}

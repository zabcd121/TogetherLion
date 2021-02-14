import React, {useEffect, useMemo, useReducer} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import RootStackScreen from './screens/RootStackScreen';
import BottomTabScreen from './screens/BottomTabScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from './Context';
import Axios from 'axios';
import ProfileFirstSetScreen from './screens/ProfileFirstSetScreen';

export default function App() {
  const initialLoginState = {
    username: '',
    gender: '',
    access_token: null,
    refresh_token: null,
    isLoading: false,
  };

  const loginReucer = (prevState, action) => {
    switch (action.type) {
      //이전에 로그인한적있으면 토큰 검색하는것
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          access_token: action.access_token,
          refresh_token: action.refresh_token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          ...action.user,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          username: null,
          access_token: null,
          refresh_token: null,
          isLoading: false,
        };
      // case 'REGISTER':
      //   return {
      //     ...prevState,
      //     userName: action.id,
      //     userToken: action.token,
      //     isLoading: false,
      //   };
    }
  };
  const [loginState, dispatch] = useReducer(loginReucer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (user) => {
        try {
          dispatch({type: 'LOGIN', user});
          await AsyncStorage.setItem('userInfo', user);
        } catch (e) {
          console.log(e);
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userInfo');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: (username, password) => {
        // setUserToken('tkasd');
        // setIsLoading(false);
        // let dataToSend = { username: username, password: password };
        // Axios.post('http://192.168.0.8:8080/accounts/signup/', dataToSend)
        //   .then((response) => navigate('SignInScreen'))
        //   .catch((error) => {
        //     console.error(error);
        //   });
      },
    }),
    [],
  );

  // useEffect(() => {
  //   setTimeout(async () => {
  //     let userToken;
  //     userToken = null;
  //     try {
  //       console.log(userToken);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     // console.log('user token', userToken);
  //     dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
  //   }, 1000);
  // }, []);

  if (loginState.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={{authContext, loginState}}>
      <NavigationContainer>
        {loginState.access_token !== null ? (
          <BottomTabScreen />
        ) : (
          <ProfileFirstSetScreen />
          // <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

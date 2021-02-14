import React from 'react';
import {Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatScreen from './ChatScreen';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import TopTabScreen from './TopTabScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';

const BottomTab = createBottomTabNavigator();

function BottomTabScreen() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#1ABC9C',
        style: {height: 48},
        showLabel: false,
        headerTitle: true,
      }}>
      <BottomTab.Screen
        name="Home"
        component={BuyStackScreen}
        options={{
          title: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <Icon name="home-outline" color={color} size={28} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatStackScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarColor: '#d02860',
          tabBarIcon: ({color}) => (
            <Icon name="chatbubble-ellipses-outline" color={color} size={28} />
          ),
          title: '홈',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center',
            fontSize: 21,
          },
        }}
      />
      <BottomTab.Screen
        name="MyProfile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <Icon name="person-outline" color={color} size={28} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabScreen;

const BuyStack = createStackNavigator();

function BuyStackScreen({navigation}) {
  return (
    <BuyStack.Navigator>
      <BuyStack.Screen
        name="TopTab"
        component={TopTabScreen}
        options={{
          title: '홈',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 21,
            alignSelf: 'center',
          },
        }}
      />
    </BuyStack.Navigator>
  );
}

const ChatStack = createStackNavigator();

function ChatStackScreen({navigation}) {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: '채팅',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 21,
            alignSelf: 'center',
          },
        }}
      />
    </ChatStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen({navigation}) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profiles"
        component={ProfileScreen}
        options={{
          title: '마이 페이지',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 21,
            alignSelf: 'center',
          },
        }}
      />
    </ProfileStack.Navigator>
  );
}

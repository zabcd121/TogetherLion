import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TogetherBuyScreen from './TogetherBuyScreen';
import TogetherTaxiScreen from './TogetherTaxiScreen';
import {createStackNavigator} from '@react-navigation/stack';

const TopTab = createMaterialTopTabNavigator();

export default function TopTabScreen() {
  return (
    <TopTab.Navigator
      initialRouteName="TogetherBuy"
      tabBarOptions={{
        labelStyle: {fontSize: 20},
        activeTintColor: '#fff',
        inactiveTintColor: '#424242',
        indicatorStyle: {
          height: null,
          top: '0%',
          bottom: '0%',
          width: '50%',
          left: '0%',
          backgroundColor: '#1ABC9C',
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        },
        style: {
          fontWeigth: 'bold',
          width: '100%',
          height: 48,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        },
        tabStyle: {},
      }}>
      <TopTab.Screen
        name="TogetherBuy"
        component={TogetherBuyScreen}
        options={{tabBarLabel: '같이사자'}}
      />
      <TopTab.Screen
        name="TogetherTaxi"
        component={TogetherTaxiScreen}
        options={{tabBarLabel: '같이타자'}}
      />
    </TopTab.Navigator>
  );
}

// const BuyStack = createStackNavigator();

// function BuyStackScreen({navigation}) {
//   return (
//     <BuyStack.Navigator>
//       <BuyStack.Screen name="BuyStack" component={TogetherBuyScreen} />
//     </BuyStack.Navigator>
//   );
// }

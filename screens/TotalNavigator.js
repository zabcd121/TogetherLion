import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabScreen from "./BottomTabScreen";
import BuyDetail from "./BuyDetail";

const totalStack = createStackNavigator();

function TotalNavigator() {
  return (
    <totalStack.Navigator>
      <totalStack.Screen
        name="Home1"
        component={BottomTabScreen}
        options={{
          headerShown: false,
          headerLeft: null,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 21,
            alignSelf: "center",
          },
        }}
      />
      <totalStack.Screen
        name="BuyDetail"
        component={BuyDetail}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 21,
            alignSelf: "center",
          },
        }}
      />
    </totalStack.Navigator>
  );
}

export default TotalNavigator;

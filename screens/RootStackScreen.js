import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "./SignupScreen";
import ProfileFirstSetScreen from "./ProfileFirstSetScreen";

const RootStack = createStackNavigator();

function RootStackScreen({ navigation }) {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          title: "회원가입/로그인",
          headerLeft: null,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 21,
            alignSelf: "center",
          },
        }}
      />
      <RootStack.Screen
        name="FirstProfile"
        component={ProfileFirstSetScreen}
        options={{
          title: "프로필 설정",
          headerLeft: null,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 21,
            alignSelf: "center",
          },
        }}
      />
    </RootStack.Navigator>
  );
}

export default RootStackScreen;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabScreen from "./BottomTabScreen";
import BuyDetail from "./BuyDetail";
import TaxiDetail from "./TaxiDetail";
import CreateBuyPost from "./CreateBuyPost";

const totalStack = createStackNavigator();

function TotalNavigator() {
  return (
    <totalStack.Navigator
		initialRouteName="Home1">
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
			<totalStack.Screen
        name="CreateBuyPost"
        component={CreateBuyPost}
        options={{
          headerShown: true,
					title:"같이사자 글쓰기",
					headerStyle: {
						
					},
					headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 21,
            alignSelf: "center",
          },
        }}
      />
			

      <totalStack.Screen
        name="TaxiDetail"
        component={TaxiDetail}
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

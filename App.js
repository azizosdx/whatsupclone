import { View, Text } from "react-native";
import React from "react";
import Auth from "./Screens/Auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import CreateAccount from "./Screens/CreateAccount";
import Chat from "./Screens/Chat";
import MyAccount from "./Screens/Home/MyAccount";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={Auth}></Stack.Screen>
        <Stack.Screen name="Home" component={Home} headerShown={true}></Stack.Screen>
        <Stack.Screen
          headerShown={true}
          name="CreateAccount"
          component={CreateAccount}
        ></Stack.Screen>
        <Stack.Screen name="Chat" component={Chat}></Stack.Screen>
        <Stack.Screen name="MyAccount" component={MyAccount}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Forum from './Home/Forum'
import MyAccount from './Home/MyAccount'
import ListUsers from './Home/ListUsers'
const Tab = createMaterialBottomTabNavigator()

export default function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ListUsers" component={ListUsers}></Tab.Screen>
      <Tab.Screen name="MyAccount" component={MyAccount}></Tab.Screen>
      <Tab.Screen name="Forum" component={Forum}></Tab.Screen>
    </Tab.Navigator>
  )
}
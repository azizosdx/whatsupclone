import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Forum from './Home/Forum'
import MyAccount from './Home/MyAccount'
import ListUsers from './Home/ListUsers'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createMaterialBottomTabNavigator()

export default function Home(props) {
  const userId = props.route.params.userId

  return (
    <Tab.Navigator
      initialRouteName="ListUsers"
      activeColor="#ffffff"         // Couleur des icônes actives (blanc)
      inactiveColor="#b2dfdb"       // Couleur des icônes inactives (vert/gris clair)
      barStyle={{ backgroundColor: '#075E54' }}  // Vert WhatsApp
    >
      <Tab.Screen 
        name="ListUsers" 
        component={ListUsers}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" color={color} size={22} />
          ),
        }}
        initialParams={{ userId }}
      />

      <Tab.Screen 
        name="MyAccount" 
        component={MyAccount}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={22} />
          ),
        }}
        initialParams={{ userId }}
      />

      <Tab.Screen 
        name="Forum" 
        component={Forum}
        options={{
          tabBarLabel: 'Forum',
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubbles" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

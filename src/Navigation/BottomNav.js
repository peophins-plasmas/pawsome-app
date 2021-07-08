import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeScreen } from '../screens';
import CalendarScreen from '../screens/CalendarScreen/CalendarScreen';
import {colors} from "../screens/combinedStyles.js"

// function Feed() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <HomeScreen />
//       </View>
//     );
//   }
  
  function Profile() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>
    );
  }
  
  function Notifications() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications!</Text>
      </View>
    );
  }
  
  const Tab = createMaterialBottomTabNavigator();
  
  export default function BottomNav(props) {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor={colors.yellow}
        inactiveColor={'black'}
        labelStyle={{ fontSize: 12 }}
        barStyle={{ backgroundColor: colors.pawsomeblue }}
      >
        <Tab.Screen
          name="Home"
          children={() => <HomeScreen extraData={props.extraData} />}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          children={() => <CalendarScreen extraData={props.extraData} />}
          options={{
            tabBarLabel: 'Calendar',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
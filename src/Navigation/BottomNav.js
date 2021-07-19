import * as React from 'react';
import { Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens';
import {colors} from "../screens/combinedStyles.js"


//future feature placeholder
function CaredForPets() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Future cared for pets feature coming soon!</Text>
      </View>
    );
  }
  
  const Tab = createMaterialBottomTabNavigator();
  //renders the My Pets screen and the Cared For Pets future feature placeholder
  export default function BottomNav(props) {
    return (
      <Tab.Navigator
        shifting={true}
        initialRouteName="Home"
        activeColor={colors.yellow}
        inactiveColor={'black'}
        labelStyle={{ fontSize: 12 }}
        barStyle={{ backgroundColor: colors.pawsomeblue }}>
        <Tab.Screen
          name="Home"
          children={() => <HomeScreen extraData={props.extraData} />}
          options={{
            tabBarLabel: 'My Pets',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-paw-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={CaredForPets}
          options={{
            tabBarLabel: 'Pets I Sit',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-heart-outline" color={color} size={26} />
            ),
          }}
        /> 
      </Tab.Navigator>
    );
  }
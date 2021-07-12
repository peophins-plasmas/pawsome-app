import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { firebase } from "./src/firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, Text, View } from "react-native";
import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  CalendarScreen,
  UserScreen,
  PetScreen,
} from "./src/screens";
import { decode, encode } from "base-64";
import { set } from "react-native-reanimated";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNav from "./src/Navigation/BottomNav";
import { navigationRef } from "./src/Navigation/RootNavigator";
import { Provider as PaperProvider } from "react-native-paper";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
            setIsSignedIn(true);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
        setIsSignedIn(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <Text>Starting up</Text>
      </SafeAreaView>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer ref={navigationRef}>
        {isSignedIn ? (
          <>
            <Stack.Navigator>
              <Stack.Screen name="Home">
                {(props) => <HomeScreen {...props} extraData={user} />}
              </Stack.Screen>
              <Stack.Screen name="Calendar">
                {(props) => <CalendarScreen {...props} extraData={user} />}
              </Stack.Screen>
              {/* <BottomNav extraData={user} /> */}
              <Stack.Screen name="User">
                {(props) => <UserScreen {...props} extraData={user} />}
              </Stack.Screen>
              <Stack.Screen name="Pet">
                {(props) => <PetScreen {...props} extraData={user} />}
              </Stack.Screen>
            </Stack.Navigator>
          </>
        ) : (
          <Stack.Navigator>
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
              />
              {/* <Stack.Screen name="User" component={UserScreen} /> */}
            </>
          </Stack.Navigator>
        )}
        {/* <BottomNav/> */}
      </NavigationContainer>
    </PaperProvider>
  );
}

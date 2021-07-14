import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
import { firebase } from "./src/firebase/config";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, Text, View, Button, Image, Alert } from "react-native";
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
import BottomNav from "./src/Navigation/BottomNav";
import { navigationRef } from "./src/Navigation/RootNavigator";
import {
  Provider as PaperProvider,
  Drawer as PaperDrawer,
} from "react-native-paper";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import styles, { colors } from "./src/screens/combinedStyles";
import { Avatar } from "react-native-elements";
import Splash from "./src/Splash";
import * as SplashScreen from "expo-splash-screen";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const ProfileStack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(null);

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          icon={() => (
            <Ionicons name="ios-exit-outline" size={32} color={colors.yellow} />
          )}
          onPress={() => {
            firebase
              .auth()
              .signOut()
              .then(() =>
                Alert.alert(
                  "Logged Out",
                  "You are now logged out"
                  // [
                  //   {
                  //     text: "Return to login page",
                  //     onPress: () => props.navigation.navigate("Login"),
                  //   },
                  // ]
                )
              )
              .catch((error) => {
                alert(error);
              });
          }}
        />
      </DrawerContentScrollView>
    );
  }
  function LogoTitle() {
    return (
      <Image
        style={{ width: 300, height: 40, resizeMode: "contain" }}
        source={require("./assets/pawsome_logo.png")}
      />
    );
  }

  function UserProfileStack() {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="My Profile"
          options={{
            safeAreaInsets: { top: 0 },
            headerTitleStyle: { alignSelf: "center" },
            headerStyle: { backgroundColor: "transparent" },
          }}
        >
          {(props) => (
            <UserScreen
              {...props}
              extraData={user}
              navigation={props.navigation}
            />
          )}
        </ProfileStack.Screen>
        <ProfileStack.Screen
          name="Pet"
          options={{
            safeAreaInsets: { top: 0 },
            headerStyle: { backgroundColor: "transparent" },
          }}
        >
          {(props) => <PetScreen {...props} navigation={props.navigation} />}
        </ProfileStack.Screen>
      </ProfileStack.Navigator>
    );
  }

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="All Pets"
          options={{
            safeAreaInsets: { top: 0 },
            headerTitleStyle: { alignSelf: "center" },
            headerStyle: { backgroundColor: "transparent" },
          }}
        >
          {(props) => (
            <HomeScreen
              {...props}
              extraData={user}
              navigation={props.navigation}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Pet"
          options={{
            safeAreaInsets: { top: 0 },
            headerStyle: { backgroundColor: "transparent" },
          }}
        >
          {(props) => <PetScreen {...props} navigation={props.navigation} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  function MyDrawer() {
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: colors.yellow,
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerType="slide"
        drawerStyle={{
          backgroundColor: colors.pawsomeblue,
          width: 200,
        }}
      >
        {/* <Drawer.Screen
          name="Profile"
          options={{
            drawerLabel: () => <Text>Me</Text>,
            headerStyle: {
              backgroundColor: colors.pawsomeblue,
            },
            headerTitle: LogoTitle,
            headerShown: true,
            drawerIcon: () => (
              <Avatar  avatarStyle={{ padding: 30 }}
              activeOpacity={0.2}
              containerStyle={{ backgroundColor: "#BDBDBD" }}
              onPress={() => alert("onPress")}
              rounded
              size="large"
              source={{ uri: user.image }} />
            ),
          }}
        >
          {(props) => (
            <UserScreen
              {...props}
              extraData={user}
              navigation={props.navigation}
            />
          )}
        </Drawer.Screen> */}

        <Drawer.Screen
          name="Profile"
          component={Splash}
          options={{
            headerTitle: LogoTitle,
            headerStyle: {
              backgroundColor: colors.pawsomeblue,
            },
            headerShown: true,
            drawerIcon: () => (
              <Avatar
                activeOpacity={0.2}
                containerStyle={{ backgroundColor: "#BDBDBD" }}
                onPress={() => alert("onPress")}
                rounded
                size="medium"
                source={{ uri: user.image }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="All Pets"
          component={HomeStack}
          options={{
            headerTitle: LogoTitle,
            headerStyle: {
              backgroundColor: colors.pawsomeblue,
            },
            headerShown: true,
            drawerIcon: () => (
              <Ionicons
                name="ios-paw-outline"
                size={32}
                color={colors.yellow}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Tasks"
          options={{
            headerStyle: {
              backgroundColor: colors.pawsomeblue,
            },
            headerTitle: LogoTitle,
            headerShown: true,
            drawerIcon: () => (
              <Ionicons
                name="ios-calendar-outline"
                size={32}
                color={colors.yellow}
              />
            ),
          }}
        >
          {(props) => (
            <CalendarScreen
              {...props}
              extraData={user}
              navigation={props.navigation}
            />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    );
  }

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
        {/* <Splash /> */}
        {isSignedIn ? (
          <>
            <MyDrawer />
          </>
        ) : (
          <Stack.Navigator>
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerStyle: { backgroundColor: colors.pawsomeblue },
                }}
              />
              <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
              />
            </>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}

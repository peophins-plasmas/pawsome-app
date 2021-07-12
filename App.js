import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { firebase } from "./src/firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, Text, View, Button, Image } from "react-native";
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
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import styles, { colors } from "./src/screens/combinedStyles";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
  // function HomeStack() {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name="Pet">
  //         {(props) => <PetScreen {...props} pet={chosenPet} navigation={props.navigation}/>}
  //       </Stack.Screen>
  //     </Stack.Navigator>
  //   );
  // }

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
        <Drawer.Screen
          name="Home"
          options={{
            headerTitle: LogoTitle,
            headerStyle: {
              backgroundColor: colors.pawsomeblue,
            },
            headerShown: true,
            drawerIcon: () => (
              <Ionicons
                name="ios-home-outline"
                size={32}
                color={colors.yellow}
              />
            ),
          }}
        >
          {(props) => (
            <HomeScreen
              {...props}
              extraData={user}
              navigation={props.navigation}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Profile"
          options={{
            headerStyle: {
              backgroundColor: colors.pawsomeblue,
            },
            headerTitle: LogoTitle,
            headerShown: true,
            drawerIcon: () => (
              <Ionicons
                name="ios-person-outline"
                size={32}
                color={colors.yellow}
              />
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
        </Drawer.Screen>

        <Drawer.Screen
          name="Calendar"
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

        <Drawer.Screen
          name="Pet"
          options={{
            styles: { color: "red" },
            headerStyle: {
              backgroundColor: colors.pawsomeblue,
            },
            headerTitle: LogoTitle,
            headerShown: true,
            drawerLabel: () => null,
            title: "",
            drawerIcon: () => null,
          }}
        >
          {(props) => (
            <PetScreen
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
        {isSignedIn ? (
          <>
            <MyDrawer />
          </>
        ) : (
          <Stack.Navigator>
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
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

import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { firebase } from "./src/firebase/config";
import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
  DefaultTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, Text, View, Button, Alert } from "react-native";
import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  CalendarScreen,
  UserScreen,
  PetScreen,
  TouchableOpacity,
} from "./src/screens";
import { Image } from "react-native-elements";
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
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const ProfileStack = createStackNavigator();
const CalStack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [pushToken, setPushToken] = useState("");

  const usersRef = firebase.firestore().collection("users");

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fdf9f1",
    },
  };

  useEffect(() => {
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
    return () => console.log("Set user after auth: ", user);
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("token type of data: ", typeof token);

        if (user) {
          console.log(
            "user in register for push notifications async function",
            user
          );
          console.log("token string stored as pushToken", pushToken);
          usersRef
            .doc(user.id)
            .update({ pushToken: `${pushToken}` })
            .then(() => {
              console.log(`Updated ${user.firstName} with push token.`);
            });
        }
        // setPushToken(token);
        // return console.log("push token: ", pushToken);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("push token outside of useEffect", pushToken);

  const registerForPushNotificationsAsync = async () => {
    //1. can only send notifications to physical devices so check if app is being accessed from device with Constants.isDevice
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      //2. check notification permission
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        //3. if permission is not granted, request permission
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        //3b. if still not granted, send message
        alert("Failed to get push token for push notification!");
        return;
      }
      try {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        //4. token is obtained
        console.log("token>>>", token);
        setPushToken(token);
        //5. create token state and set state to token or save to server?

        //POST token to server
        // console.log("user in notification token>>>", user);
        // usersRef
        //   .doc(user.id)
        //   .update({ pushToken: token })
        //   .then(() => {
        //     console.log(`Updated ${user.firstName} with push token.`);
        //   });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    //additional logic for android devices:
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  //6. take expo push token from user record and send to Expo API using post request
  //7. may need node sdk ??
  //8. can send notifications with sendPushNotification()

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
  function LogoTitle(props) {
    return (
      <Image
        style={{ width: 200, height: 40, resizeMode: "contain" }}
        source={require("./assets/pawsome_logo.png")}
        onPress={() => props.navigation.jumpTo("My Pets")}
      />
    );
  }

  function UserProfileStack() {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="My Profile"
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: colors.pawsomeblue },
            headerTitle: <LogoTitle navigation={navigation} />,
            headerLeft: () => (
              <Ionicons
                name="ios-menu"
                size={32}
                color={colors.yellow}
                onPress={() => navigation.toggleDrawer()}
              />
            ),
            headerLeftContainerStyle: { paddingLeft: 10 },
          })}
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
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: colors.pawsomeblue },
            headerTitle: <LogoTitle navigation={navigation} />,
            headerLeft: () => (
              <Ionicons
                name="ios-menu"
                size={32}
                color={colors.yellow}
                onPress={() => navigation.toggleDrawer()}
              />
            ),
            headerLeftContainerStyle: { paddingLeft: 10 },
          })}
        >
          {(props) => <PetScreen {...props} navigation={props.navigation} />}
        </ProfileStack.Screen>
      </ProfileStack.Navigator>
    );
  }

  // safeAreaInsets: { top: 0 },
  //         headerTitleStyle: { alignSelf: 'center'},
  //         headerStyle:{ backgroundColor: 'transparent' }
  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="My Pets"
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: colors.pawsomeblue },
            headerTitle: <LogoTitle navigation={navigation} />,
            headerLeft: () => (
              <Ionicons
                name="ios-menu"
                size={32}
                color={colors.yellow}
                onPress={() => navigation.toggleDrawer()}
              />
            ),
            headerLeftContainerStyle: { paddingLeft: 10 },
          })}
        >
          {(props) => <BottomNav {...props} extraData={user} />}
        </Stack.Screen>
        <Stack.Screen
          name="Pet"
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: colors.pawsomeblue },
            headerTitle: <LogoTitle navigation={navigation} />,
            headerLeft: () => (
              <Ionicons
                name="ios-menu"
                size={32}
                color={colors.yellow}
                onPress={() => navigation.toggleDrawer()}
              />
            ),
            headerLeftContainerStyle: { paddingLeft: 10 },
          })}
        >
          {(props) => <PetScreen {...props} navigation={props.navigation} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  function CalendarStack() {
    return (
      <CalStack.Navigator>
        <CalStack.Screen
          name="Tasks"
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: colors.pawsomeblue },
            headerTitle: <LogoTitle navigation={navigation} />,
            headerLeft: () => (
              <Ionicons
                name="ios-menu"
                size={32}
                color={colors.yellow}
                onPress={() => navigation.toggleDrawer()}
              />
            ),
            headerLeftContainerStyle: { paddingLeft: 10 },
          })}
        >
          {(props) => <CalendarScreen {...props} extraData={user} />}
        </CalStack.Screen>
      </CalStack.Navigator>
    );
  }

  function MyDrawer() {
    return (
      <Drawer.Navigator
        initialRouteName="My Pets"
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
          component={UserProfileStack}
          options={{
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
          name="My Pets"
          component={HomeStack}
          options={{
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
          component={CalendarStack}
          options={{
            drawerIcon: () => (
              <Ionicons
                name="ios-calendar-outline"
                size={32}
                color={colors.yellow}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }

  if (loading) {
    return (
      <SafeAreaView>
        <Text>Starting up</Text>
      </SafeAreaView>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer theme={MyTheme} ref={navigationRef}>
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
                options={{
                  headerStyle: { backgroundColor: colors.pawsomeblue },
                }}
              />
            </>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}

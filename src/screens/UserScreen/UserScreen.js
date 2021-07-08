import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import styles from "../HomeScreen/styles"
import { firebase } from "../../firebase/config";

export default function UserScreen(props) {
  const [entityText, setEntityText] = useState("");
  const [users, setUsers] = useState([]);
  //make single pet state to access specific pet to pass through as props to upload image component

  const usersRef = firebase.firestore().collection("users");
  const userId = props.extraData.id;

  const onLogoutPress = () => {
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
  };

  useEffect(() => {
    usersRef.where("id", "==", userId).onSnapshot(
      (querySnapshot) => {
        const userInfo = [];
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          console.log('USER>>>>>>>>>>>>>>', user)
          user.id = doc.id;
          userInfo.push(user)
        });
        setUsers(userInfo)
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const renderEntity = ({ item, index }) => {
    return (
      <View>
        <View style={styles.entityContainer}>
          <Text style={styles.entityText}>Name:</Text>
          <Text style={styles.entityText}>{item.firstName} {item.lastName}</Text>
        </View>
        <View style={styles.entityContainer}>
          <Text style={styles.entityText}>Email:</Text>
          <Text style={styles.entityText}>{item.email}</Text>
        </View>
        <View style={styles.entityContainer}>
          <Text style={styles.entityText}>Address:</Text>
         <Text style={styles.entityText}>{item.address}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.button} onPress={onLogoutPress}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          title="User"
          onPress={() => props.navigation.navigate("User")}
        >
          <Text style={styles.buttonText}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          title="Calendar View"
          onPress={() => props.navigation.navigate("Calendar")}
        >
          <Text style={styles.buttonText}>To Calendar</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>
          Hello!
        </Text>
      </View>

      {users && (
        <View style={styles.listContainer}>
          <FlatList
            //or put upload image component in render entity so each pet entity will render name and photo
            data={users}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
    </View>
  );
}

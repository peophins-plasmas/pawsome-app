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
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function HomeScreen(props) {
  //console.log("PROPS on HOMESCREEN", props);
  const [entityText, setEntityText] = useState("");
  const [pets, setPets] = useState([]);


  const petsRef = firebase.firestore().collection("pets");
  const userID = props.extraData.id;

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
    petsRef
      .where("ownerId", "==", userID)
      .onSnapshot(
        (querySnapshot) => {
          const newPets = [];
          querySnapshot.forEach((doc) => {
            const pet = doc.data();
            console.log('PET>>>>>>>>>>>>', pet)
            pet.id = doc.id;
            newPets.push(pet);
          });
          setPets(newPets);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        petName: entityText,
        ownerId: userID,
        createdAt: timestamp,
      };
      petsRef
        .add(data)
        .then((_doc) => {
          setEntityText("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>
          {item.petName}
        </Text>
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
          title='Calendar View'
          onPress={() => props.navigation.navigate("Calendar")}
        >
          <Text style={styles.buttonText}>To Calendar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder='Add new pet'
          placeholderTextColor='#aaaaaa'
          onChangeText={(text) => setEntityText(text)}
          value={entityText}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />
        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {pets && (
        <View style={styles.listContainer}>
          <FlatList
            data={pets}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
          {/* <Text>
            {pets[0].petName}
          </Text> */}
        </View>
      )}
    </View>
  );
}

import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import UploadImage from "../../Components/UploadImage";
import BottomNav from "../../Navigation/BottomNav";
import UserScreen from "../UserScreen/UserScreen";
import { Image } from "react-native-elements";

export default function HomeScreen(props) {
  const [entityText, setEntityText] = useState("");
  const [pets, setPets] = useState([]);
  //make single pet state to access specific pet to pass through as props to upload image component

  const petsRef = firebase.firestore().collection("pets");
  const userID = props.extraData.id;

  const onLogoutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => Alert.alert("Logged Out", "You are now logged out"))
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    petsRef.where("ownerId", "array-contains", userID).onSnapshot(
      (querySnapshot) => {
        const newPets = [];
        querySnapshot.forEach((doc) => {
          const pet = doc.data();
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
        ownerId: [userID],
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
        <Image
          source={{ uri: item.image }}
          style={{ width: 200, height: 200 }}
          onPress={() => {
            props.navigation.navigate("Pet", { pet: item });
          }}
        />
        <Text style={styles.entityText}>{item.petName}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity style={styles.button} onPress={onLogoutPress}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <UploadImage user={props.extraData} />
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
        </View>
      )}
    </SafeAreaView>
  );
}

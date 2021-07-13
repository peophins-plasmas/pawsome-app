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
  Button,
  ScrollView
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import UploadImage from "../../Components/UploadImage";
import BottomNav from "../../Navigation/BottomNav";
import { UserScreen, PetScreen } from "../";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native-elements";
import * as RootNavigator from "../../Navigation/RootNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { styles as moreStyles } from "../combinedStyles"

export default function HomeScreen(props) {
  const [entityText, setEntityText] = useState("");
  const [pets, setPets] = useState([]);
  const [chosenPet, setChosenPet] = useState({});

  const petsRef = firebase.firestore().collection("pets");
  const userID = props.extraData.id;

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
        image:
          "https://res.cloudinary.com/dx5gk8aso/image/upload/v1625860768/1200px-Paw-print.svg_hmqdd7.png",
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

  // const petStack = createStackNavigator();

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Image
          source={{ uri: item.image }}
          style={{ width: 200, height: 200 }}
          onPress={() => {
            // return
            // (<petStack.Navigator>
            //       <petStack.Screen name="Pet">
            //        {() => <PetScreen pet={item}/>}
            //      </petStack.Screen>
            //      </petStack.Navigator>);

            RootNavigator.navigate("Pet", { pet: item });
          }}
        />
        <Text style={styles.entityText}>{item.petName}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style={{ fontSize: 20 }}>All Pets</Text>
        </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new pet"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEntityText(text)}
          value={entityText}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
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
      <View style={{ height: 100 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

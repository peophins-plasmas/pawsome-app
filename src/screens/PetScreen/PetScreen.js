import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import UploadImage from "../../Components/UploadImage";
import { Card, Title, Paragraph } from "react-native-paper";
import { Avatar } from "react-native-elements";

export default function PetScreen(props) {
  const [pets, setPets] = useState([]);
  const [owners, setOwners] = useState([]);
  const [vets, setVets] = useState([]);
  const [caretakers, setCaretakers] = useState([]);

  const usersRef = firebase.firestore().collection("users");
  const vetsRef = firebase.firestore().collection("vets");

  let pet = props.route.params.pet;
  useEffect(() => {
    const petInfo = [];
    petInfo.push(pet);
    setPets(petInfo);
  });
  console.log("pets array>>>>", pets);

  //to find pet's owners
  useEffect(() => {
    usersRef.where("id", "in", pet.ownerId).onSnapshot(
      (querySnapshot) => {
        const ownerInfo = [];
        querySnapshot.forEach((doc) => {
          const owner = doc.data();
          ownerInfo.push(owner);
        });
        setOwners(ownerInfo);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  //to find pet's caretakers
  useEffect(() => {
    usersRef.where("id", "in", pet.caretakerId).onSnapshot(
      (querySnapshot) => {
        const caretakerInfo = [];
        querySnapshot.forEach((doc) => {
          const caretaker = doc.data();
          caretakerInfo.push(caretaker);
        });
        setCaretakers(caretakers);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    vetsRef.where("id", "array-contains", pet.vetId).onSnapshot(
      (querySnapshot) => {
        const vets = [];
        querySnapshot.forEach((doc) => {
          const vet = doc.data();
          vets.push(vet);
        });
        setVets(vets);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const renderPetEntity = ({ item, index }) => {
    return (
      <View>
        <Text>{item.petName}</Text>
        <View style={styles.petContainer}>
          <UploadImage pet={item} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {pets && (
        <View style={styles.listContainer}>
          <FlatList
            data={pets}
            renderItem={renderPetEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

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
import styles from "../combinedStyles";
import { firebase } from "../../firebase/config";
import UploadImage from "../../Components/UploadImage";
import { Title, Paragraph } from "react-native-paper";
import { Avatar, Card } from "react-native-elements";

export default function PetScreen(props) {
  const [owners, setOwners] = useState([]);
  const [vets, setVets] = useState([]);
  const [caretakers, setCaretakers] = useState([]);

  const usersRef = firebase.firestore().collection("users");
  const vetsRef = firebase.firestore().collection("vets");

  let pet = props.route.params.pet;
  console.log("pet obj>>>>", pet);

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
    usersRef.where("id", "array-contains", pet.caretakerId).onSnapshot(
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {pet ? (
          <View style={styles.container}>
            <UploadImage pet={pet} functionType={"petImg"} />
            <View style={styles.introContainer}>
              <Text style={styles.nameText}>{pet.petName}</Text>
              <View style={[styles.stack]}>
                <Text style={styles.stackHeaderText}>Species</Text>
                <Text>{pet.species ? pet.species : "animal"}</Text>
              </View>
            </View>

            <Card style={styles.introContainer}>
              <View style={styles.stack}>
                <Text style={styles.stackHeaderText}>Birthday</Text>
                <Text>{pet.birthday ? pet.birthday : "I was born!"}</Text>
              </View>
              <View style={styles.stack}>
                <Text style={styles.stackHeaderText}>Weight</Text>
                <Text>{pet.weight ? pet.weight : "Feed me more."}</Text>
              </View>
              <View style={styles.stack}>
                <Text style={styles.stackHeaderText}>Sex</Text>
                <Text>
                  {pet.sex ? pet.sex : "It does't matter; I am cute."}
                </Text>
              </View>
            </Card>

            <Card style={styles.introContainer}>
              <View style={styles.stack}>
                <Text style={styles.stackHeaderText}>Likes</Text>
                <Text>{pet.likes ? pet.likes : "I like you!"}</Text>
              </View>
              <View style={styles.stack}>
                <Text style={styles.stackHeaderText}>Dislikes</Text>
                <Text>
                  {pet.dislikes ? pet.dislikes : "Being home alone :("}
                </Text>
              </View>
            </Card>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <Text>Pet does not exist</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

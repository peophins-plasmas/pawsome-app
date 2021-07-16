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
import * as RootNavigator from "../../Navigation/RootNavigator";

export default function PetScreen(props) {
  const [owners, setOwners] = useState([]);
  const [vet, setVet] = useState({});
  const [caretakers, setCaretakers] = useState([]);

  const usersRef = firebase.firestore().collection("users");
  const vetRef = firebase.firestore().collection("vets");

  let pet = props.route.params.pet;

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
        setCaretakers(caretakerInfo);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    vetRef.where("id", "in", pet.vetId).onSnapshot(
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const vetInfo = doc.data();
          setVet(vetInfo);
        });
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
            <View style={styles.userContainer}>
              <UploadImage pet={pet} functionType={"petImg"} />
            </View>
            <View style={styles.introContainer}>
              <Text style={styles.nameText}>{pet.petName}</Text>
              <View style={[styles.stack]}>
                <Text style={styles.stackHeaderText}>SPECIES</Text>
                <Text>{pet.species ? pet.species : "animal"}</Text>
              </View>
            </View>

            <Card borderRadius={50} style={styles.stackContainer}>
              <View style={styles.stack}>
                <Text style={styles.stackHeaderText}>BIRTHDAY</Text>
                <Text>{pet.birthday ? pet.birthday : "I was born!"}</Text>
              </View>
              <View style={styles.stack}>
                <Text style={styles.stackHeaderText}>WEIGHT</Text>
                <Text>{pet.weight ? pet.weight : "Feed me more."}</Text>
              </View>
              <View style={styles.stack}>
                <Text style={styles.stackHeaderText}>SEX</Text>
                <Text>
                  {pet.sex ? pet.sex : "It does't matter; I am cute."}
                </Text>
              </View>
              <View style={styles.stack}>
                <Text style={styles.stackHeaderText}>LIKES</Text>
                <Text>{pet.likes ? pet.likes : "I like you!"}</Text>
              </View>
              <View style={styles.stack}>
                <Text style={styles.stackHeaderText}>DISLIKES</Text>
                <Text>
                  {pet.dislikes ? pet.dislikes : "Being home alone :("}
                </Text>
              </View>
              <View style={styles.stack}>
                <Text style={styles.cautionHeaderText}>ALLERGIES</Text>
                <Text>{pet.allergies ? pet.allergies : "None"}</Text>
              </View>
              <View style={styles.stack}>
                <Text style={styles.cautionHeaderText}>MEDICATIONS</Text>
                {pet.medications.map((medication, index) => {
                  return (
                    <Text key={index}>
                      {medication.medicationName
                        ? medication.medicationName
                        : "None"}
                    </Text>
                  );
                })}
              </View>
              <View style={styles.stack}>
                <Text style={styles.stackHeaderText}>
                  DISTINGUISHING FEATURES
                </Text>
                <Text>{pet.features ? pet.features : "Lovable face"}</Text>
              </View>
              <View style={styles.stack}>
                <Text style={styles.stackHeaderText}>BEHAVIOR</Text>
                <Text>
                  {pet.behavior ? pet.behavior : "Adorable all the time"}
                </Text>
              </View>
              <View style={styles.stack}>
                <Text style={styles.stackHeaderText}>FEEDING INFO</Text>
                <Text>
                  Dry food: {pet.dryFoodBrand ? pet.dryFoodBrand : "None"}
                </Text>
                <Text>
                  Wet food: {pet.wetFoodBrand ? pet.wetFoodBrand : "None"}
                </Text>
              </View>

              <View style={styles.stack}>
                <Text style={styles.cautionHeaderText}>TOXICITY NOTICE</Text>
                <Text>list of items that are toxic to {pet.species}s</Text>
              </View>

              <View style={styles.stack}>
                <Text style={styles.cautionHeaderText}>
                  MESSAGE FOR CARETAKERS
                </Text>
                <Text>
                  {pet.additionalInfo
                    ? pet.additionalInfo
                    : `Please take good care of ${pet.petName}!`}
                </Text>
              </View>

              <View style={styles.stack}>
                <Text style={styles.stackHeaderText}>VET CONTACT INFO</Text>
                <Text>{vet.vetName ? vet.vetName : `No assigned vet`}</Text>
              </View>

              <View style={styles.stack}>
                <Text style={styles.stackHeaderText}>HUMANS</Text>
                {owners.map((owner) => {
                  return (
                    <View key={owner.id} style={styles.stack}>
                      <View style={styles.smallAvatarImage}>
                        <View style={{ alignItems: "center" }}>
                          <Avatar
                            avatarStyle={{ padding: 30 }}
                            activeOpacity={0.2}
                            containerStyle={{ backgroundColor: "#BDBDBD" }}
                            onPress={() =>
                              alert(`Go to ${owner.firstName}'s profile`)
                            }
                            rounded
                            size="large"
                            source={{ uri: owner.image }}
                          />
                          <Text>{owner.firstName}</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>

              <View style={styles.stack}>
                <Text style={styles.stackHeaderText}>CARETAKERS</Text>
                {caretakers.map((caretaker) => {
                  return (
                    <View key={caretaker.id} style={styles.stack}>
                      <View style={styles.smallAvatarImage}>
                        <View style={{ alignItems: "center" }}>
                          <Avatar
                            avatarStyle={{ padding: 30 }}
                            activeOpacity={0.2}
                            containerStyle={{ backgroundColor: "#BDBDBD" }}
                            onPress={() =>
                              alert(`Go to ${caretaker.firstName}'s profile`)
                            }
                            rounded
                            size="large"
                            source={{ uri: caretaker.image }}
                          />
                          <Text>{caretaker.firstName}</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
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

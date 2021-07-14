import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Alert,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import styles, { colors } from "../screens/combinedStyles";

export default function AddCaretaker(props) {
  //props = pass signed in user data, their owned pets, their current caretakers

  //from the owner's POV:
  //1. we need their owned pets (from userscreen)
  //2. their current caretakers (also from userscreen) (caretakersArr)
  //UPDATE: (1) caretakers field on owner

  //for each pet:
  //1. we need their current caretakers
  //UPDATE: (1) caretakersId field on pet

  //find caretakers with usersRef via email (foundCaretaker)
  //select a pet (from the owner's pets) and add to this caretaker's caredPetId
  //UPDATE (1) caretaker's sitterForUser field & (2) caretaker's caredPetId field

  const [caretakersArr, setCaretakersArr] = useState([]);
  const [foundCaretaker, setFoundCaretaker] = useState({});
  const usersRef = firebase.firestore().collection("users");
  const petsRef = firebase.firestore().collection("pets");
  const userId = props.extraData.id;

  //find each pet's caretakers

  async function findCaretakerByEmail(emailSearch) {
    await usersRef
      .where("email", "==", emailSearch)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const caretaker = doc.data();
          setFoundCaretaker(caretaker);
        });
      })
      .catch((error) => {
        console.error("Caretaker id not found");
      });
  }

  return (
    <View style={styles.containerForm}>
      <Formik
        initialValues={{
          petName: "",
          species: "",
          weight: "",
          ownerId: [userId],
          image:
            "https://res.cloudinary.com/dx5gk8aso/image/upload/v1625860768/1200px-Paw-print.svg_hmqdd7.png",
          birthday: "",
          sex: "",
          likes: "",
          dislikes: "",
          allergies: "",
          medications: "",
          features: "",
          behavior: "",
          dryFoodBrand: "",
          wetFoodBrand: "",
          additionalInfo: "",
        }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          petsRef.update({
            caretakerId: ["none"],
          });
          Alert.alert("Pet Submitted!");
        }}
      >
        {(props) => (
          <View style={styles.button}>
            <Text style={styles.header}>Congrats to your new pet!</Text>
            <TextInput
              style={styles.inputForm}
              placeholder="What is my name?"
              onChangeText={props.handleChange("petName")}
              value={props.values.petName}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="Dog? Cat? Bird?"
              onChangeText={props.handleChange("species")}
              value={props.values.species}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="How much do I weigh?"
              onChangeText={props.handleChange("weight")}
              value={props.values.weight}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.inputForm}
              placeholder="When was I born?"
              onChangeText={props.handleChange("birthday")}
              value={props.values.birthday}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="What sex am I?"
              onChangeText={props.handleChange("sex")}
              value={props.values.sex}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="What do I like?"
              onChangeText={props.handleChange("likes")}
              value={props.values.likes}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="What do I dislike?"
              onChangeText={props.handleChange("dislikes")}
              value={props.values.dislikes}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="What am I allergic to?"
              onChangeText={props.handleChange("allergies")}
              value={props.values.allergies}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="What meds do I need?"
              onChangeText={props.handleChange("medications")}
              value={props.values.medications}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="What are my unique features?"
              onChangeText={props.handleChange("features")}
              value={props.values.features}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="How do I act? Playful? Shy?"
              onChangeText={props.handleChange("behavior")}
              value={props.values.behavior}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="Do I eat dry food? What brand?"
              onChangeText={props.handleChange("dryFoodBrand")}
              value={props.values.dryFoodBrand}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="Do I eat wet food? What brand?"
              onChangeText={props.handleChange("wetFoodBrand")}
              value={props.values.wetFoodBrand}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="Any other notes?"
              onChangeText={props.handleChange("additionalInfo")}
              value={props.values.additionalInfo}
            />
            <Button
              color={colors.dkblue}
              title="Submit"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

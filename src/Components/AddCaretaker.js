import React, { useEffect, useState, useLayoutEffect } from "react";
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
  const [selectedPet, setSelectedPet] = useState({});
  const [selectedPetCaretakers, setSelectedPetCaretakers] = useState([]);
  const [didFindCaretaker, setDidFindCaretaker] = useState(true);
  const usersRef = firebase.firestore().collection("users");
  const petsRef = firebase.firestore().collection("pets");
  const userId = props.user.id;

  //find selectedPet's caretakers
  // useEffect(() => {
  //   usersRef.where("id", "in", selectedPet.caretakerId).onSnapshot(
  //     (querySnapshot) => {
  //       const caretakerInfo = [];
  //       querySnapshot.forEach((doc) => {
  //         const caretaker = doc.data();
  //         caretakerInfo.push(caretaker);
  //       });
  //       setSelectedPetCaretakers(caretakerInfo);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }, [selectedPet]);

  //in onpress, setState rerender, when rerender is triggered, useEffect which will call findCaretaker
  //after findCaretaker, run alert based on what caretaker is

  //   useLayoutEffect(() => {
  //     Alert.alert("Could Not Find Caretaker");
  //   }, [didFindCaretaker]);

  async function findCaretakerByEmail(emailSearch) {
    await usersRef
      .where("email", "==", emailSearch)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const caretaker = doc.data();
          setFoundCaretaker(caretaker);
          if (!caretaker.id) {
            setDidFindCaretaker(false);
          }
        });
      })
      .catch((error) => {
        console.log("Caretaker id not found");
      });
  }

  //   console.log("found caretaker>>>>", foundCaretaker);

  if (!foundCaretaker.id) {
    return (
      <View style={styles.containerForm}>
        <Formik
          initialValues={{}}
          onSubmit={(values, actions) => {
            async function waitForAlert() {
              await findCaretakerByEmail(values.emailSearch);
            }
            waitForAlert();
            console.log("after email search>>>>", foundCaretaker.firstName);
            let caretakerName = foundCaretaker.firstName || "none";
            console.log("caretaker name", caretakerName);
            // if (caretakerName === "none") {
            //   Alert.alert("Could Not Find Caretaker");
            // }
          }}
        >
          {(props) => (
            <View style={styles.addButton}>
              <Text style={styles.header}>Add a caretaker for your pet</Text>
              <TextInput
                style={styles.inputForm}
                autoCapitalize="none"
                placeholder="Search for caretaker by email"
                placeholderTextColor="#909090"
                onChangeText={props.handleChange("emailSearch")}
                value={props.values.emailSearch}
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
  } else {
    return (
      <View style={styles.containerForm}>
        <Formik
          initialValues={{}}
          onSubmit={(values, actions) => {
            // findCaretakerByEmail(values.emailSearch)
            Alert.alert("Caretaker selected");
          }}
        >
          {(props) => (
            <View style={styles.addButton}>
              <Text style={styles.header}>Select Pet</Text>
              <TextInput
                style={styles.inputForm}
                placeholder="Choose a pet"
                placeholderTextColor="#909090"
                //   onChangeText={props.handleChange("additionalInfo")}
                //   value={props.values.emailSearch}
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
}

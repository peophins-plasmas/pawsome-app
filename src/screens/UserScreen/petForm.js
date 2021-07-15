import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/config";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Alert,
  Keyboard,
} from "react-native";
import styles from "./styles";
import { Formik } from "formik";
import colors from "../combinedStyles";

export default function PetForm(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const petsRef = firebase.firestore().collection("pets");
  const userId = props.extraData.id;

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
          petsRef.add({
            ownerId: [userId],
            image: values.image,
            petName: values.petName,
            species: values.species,
            weight: values.weight,
            sex: values.sex,
            medications: [values.medications],
            additionalInfo: values.additionalInfo,
            allergies: values.allergies,
            amountDryFood: "",
            amountWetFood: "",
            behavior: values.behavior,
            birthday: values.birthday,
            caretakerId: ["none"],
            vetId: ["none"],
            dailyTreatLimit: null,
            dislikes: values.dislikes,
            dryFoodBrand: values.dryFoodBrand,
            features: values.features,
            wetFoodBrand: values.wetFoodBrand,
            feedingScheduleDry: "",
            feedingScheduleWet: "",
            likes: values.likes,
            tasks: ["none"],
          });
          props.closeForm();
          Alert.alert("Pet Submitted!");
        }}/>
        {(props) => (
          <View style={styles.button}>
            <Text style={styles.titleTextForm}>Congrats to your new pet!</Text>
            <TextInput
              style={styles.inputForm}
              placeholder="What is my name?"
              placeholderTextColor="#909090"
              onChangeText={props.handleChange("petName")}
              value={props.values.petName}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="Dog? Cat? Bird?"
              placeholderTextColor="#909090"
              onChangeText={props.handleChange("species")}
              value={props.values.species}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="How much do I weigh?"
              placeholderTextColor="#909090"
              onChangeText={props.handleChange("weight")}
              value={props.values.weight}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.inputForm}
              placeholder="When was I born?"
              placeholderTextColor="#909090"
              onChangeText={props.handleChange("birthday")}
              value={props.values.birthday}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="What sex am I?"
              placeholderTextColor="#909090"
              onChangeText={props.handleChange("sex")}
              value={props.values.sex}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="What do I like?"
              placeholderTextColor="#909090"
              onChangeText={props.handleChange("likes")}
              value={props.values.likes}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="What do I dislike?"
              placeholderTextColor="#909090"
              onChangeText={props.handleChange("dislikes")}
              value={props.values.dislikes}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="What am I allergic to?"
              placeholderTextColor="#909090"
              onChangeText={props.handleChange("allergies")}
              value={props.values.allergies}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="What meds do I need?"
              placeholderTextColor="#909090"
              onChangeText={props.handleChange("medications")}
              value={props.values.medications}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="What are my unique features?"
              placeholderTextColor="#909090"
              onChangeText={props.handleChange("features")}
              value={props.values.features}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="How do I act? Playful? Shy?"
              placeholderTextColor="#909090"
              onChangeText={props.handleChange("behavior")}
              value={props.values.behavior}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="Do I eat dry food? What brand?"
              placeholderTextColor="#909090"
              onChangeText={props.handleChange("dryFoodBrand")}
              value={props.values.dryFoodBrand}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="Do I eat wet food? What brand?"
              placeholderTextColor="#909090"
              onChangeText={props.handleChange("wetFoodBrand")}
              value={props.values.wetFoodBrand}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="Any other notes?"
              placeholderTextColor="#909090"
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

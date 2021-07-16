import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/config";
import {
  ScrollView,
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Alert,
  Keyboard,
} from "react-native";
import styles from "./styles";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import colors from "../combinedStyles";
import { FormValidation } from "../formValidation"

export default function PetForm(props) {

  const petsRef = firebase.firestore().collection("pets");
  const userId = props.extraData.id;
  console.log("PROPS>>>>", props)
  return (
    <ScrollView>
      <View style={styles.containerForm}>
        <Formik
          initialValues={{
            petName: "",
            species: "",
            weight: "",
            units: "",
            ownerId: [userId],
            image:
              "https://res.cloudinary.com/dx5gk8aso/image/upload/v1626380751/pawpring_b2j5oa.png",
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
          validationSchema={FormValidation}
          onSubmit={(values, actions) => {
            actions.resetForm();
            petsRef.add({
              ownerId: [userId],
              image: values.image,
              petName: values.petName,
              species: values.species,
              weight: values.weight,
              units: values.units,
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
            Alert.alert("Pet Submitted!");
            props.closeForm();
          }}
        >
          {(props) => (
            <View style={styles.button}>
              <Text style={styles.titleTextForm}>
                Congrats on your new pet!
              </Text>
              <TextInput
                style={styles.inputForm}
                placeholder="What is my name?**"
                placeholderTextColor="#909090"
                onChangeText={props.handleChange("petName")}
                value={props.values.petName}
              />
              {props.errors.petName && props.touched.petName &&
                <Text>{props.errors.petName}</Text>
              }
              <TextInput
                style={styles.inputForm}
                placeholder="What species am I?**"
                placeholderTextColor="#909090"
                onChangeText={props.handleChange("species")}
                value={props.values.species}
              />
              {props.errors.species && props.touched.species &&
                <Text>{props.errors.species}</Text>
              }
              <TextInput
                style={styles.inputForm}
                placeholder="When was I born?"
                placeholderTextColor="#909090"
                onChangeText={props.handleChange("birthday")}
                value={props.values.birthday}
              />
              <View style={{flexDirection: "row"}}>
              <TextInput
                style={[styles.inputForm, {flex: 3}]}
                placeholder="How much do I weigh?"
                placeholderTextColor="#909090"
                onChangeText={props.handleChange("weight")}
                value={props.values.weight}
                keyboardType="numeric"
              />
              {props.errors.weight && props.touched.weight &&
                    <Text>{props.errors.weight}</Text>
              }
              <TextInput
                style={[styles.inputForm, {flex: 1}]}
                placeholder="Units?"
                placeholderTextColor="#909090"
                onChangeText={props.handleChange("units")}
                value={props.values.units}
              />
              </View>
              <TextInput
                style={styles.inputForm}
                placeholder="What are my unique features?"
                placeholderTextColor="#909090"
                onChangeText={props.handleChange("features")}
                value={props.values.features}
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
                placeholder="Any other notes?"
                placeholderTextColor="#909090"
                onChangeText={props.handleChange("additionalInfo")}
                value={props.values.additionalInfo}
              />
              <View style={{alignSelf: "flex-end"}}>
                <Text>** (required)</Text>
              </View>
              <Button
                color={colors.dkblue}
                title="Submit"
                onPress={props.handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

import React, { useState } from 'react';
import { firebase } from "../../firebase/config";
import { StyleSheet, Button, TextInput, View, Text, Alert } from 'react-native';
import styles from './styles';
import { Formik } from 'formik';
import colors from '../combinedStyles'

export default function PetForm(props) {

  console.log('PROPS ON PETFORM', props)

  const petsRef = firebase.firestore().collection("pets");
  const userId = props.extraData.id

  const [entityName, setEntityName] = useState("");
  const [entitySpecies, setEntitySpecies] = useState("");
  const [entityWeight, setEntityWeight] = useState("");

  const handleSubmit = () => {
    if (entityName && entityName.length > 0) {
      const data = {
        petName: entityName,
        species: species,
        weight: weight,
        ownerId: userId
      };
      petsRef
        .add(data)
        .then((_doc) => {
          setEntityName("");
          setEntitySpecies("");
          setEntityWeight("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
    Alert.alert("Submitted!", "Pet Added!");
  }

  return (
    <View style={styles.containerForm}>
      <Formik
        initialValues={{ name: '', species: '', weight: '', ownerId: userId }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {props => (
          <View style={styles.button}>
            <Text style={styles.header}>
              Congrats to your new pet!
            </Text>
            <TextInput
              style={styles.inputForm}
              placeholder='What is my name?'
              onChangeText={props.handleChange('name')}
              value={props.values.name}
            />
            <TextInput
              style={styles.inputForm}
              multiline
              placeholder='Dog? Cat? Bird?'
              onChangeText={props.handleChange('species')}
              value={props.values.species}
            />

            <TextInput
              style={styles.inputForm}
              placeholder='How much do I weigh?'
              onChangeText={props.handleChange('weight')}
              value={props.values.weight}
              keyboardType='numeric'
            />

            <Button color={colors.dkblue} title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

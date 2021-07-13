import React, { useState } from 'react';
import { firebase } from "../../firebase/config";
import { StyleSheet, Button, TextInput, View, Text, Alert, Keyboard } from 'react-native';
import styles from './styles';
import { Formik } from 'formik';
import colors from '../combinedStyles'

export default function PetForm(props) {

  const petsRef = firebase.firestore().collection("pets");
  const userId = props.extraData.id

  return (
    <View style={styles.containerForm}>
      <Formik
        initialValues={{ petName: '', species: '', weight: '', ownerId: userId }}
        onSubmit={(values, actions) => {
                  actions.resetForm();
                  petsRef.add({
                    ownerId: userId,
                    petName: values.petName,
                    species: values.species,
                    weight: values.weight
        })
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
              onChangeText={props.handleChange('petName')}
              value={props.values.petName}
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

            <Button color={colors.dkblue} title="Submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

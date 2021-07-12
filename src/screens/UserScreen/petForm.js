import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import styles from './styles';
import { Formik } from 'formik';
import colors from '../combinedStyles'

export default function PetForm() {

  return (
    <View style={styles.containerForm}>
      <Formik
        initialValues={{ name: '', species: '', weight: '' }}
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

            <Button color={colors.dkblue} title="Submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

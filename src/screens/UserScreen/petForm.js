import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { styles } from './styles';
import { Formik } from 'formik';

export default function PetForm() {

  return (

    <View style={styles.containerForm}>
      <Formik
        initialValues={{ title: '', body: '', rating: '' }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {props => (
          <View>
            <TextInput
              style={styles.inputForm}
              placeholder='Review title'
              onChangeText={props.handleChange('title')}
              value={props.values.title}
            />

            <TextInput
              style={styles.inputForm}
              multiline
              placeholder='Review details'
              onChangeText={props.handleChange('body')}
              value={props.values.body}
            />

            <TextInput
              style={styles.inputForm}
              placeholder='Rating (1 - 5)'
              onChangeText={props.handleChange('rating')}
              value={props.values.rating}
              keyboardType='numeric'
            />

            <Button color='maroon' title="Submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>

  );
}

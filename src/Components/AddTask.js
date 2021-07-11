import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import styles, { colors } from "../screens/combinedStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { add } from "react-native-reanimated";

export default function AddTask(props) {
  let date = new Date();
  let currentDate = date.toDateString();
  let currentTime = date.toLocaleTimeString();

  const [entityText, setEntityText] = useState("");
  const [entityDueDate, setEntityDueDate] = useState("");
  const [entityDueTime, setEntityDueTime] = useState("");
  const [entityPetId, setEntityPetId] = useState("");
  const [entityStatus, setEntityStatus] = useState("");
  const [entityFrequency, setEntityFrequency] = useState("");

  let dateCheck = props.calDate || date;
  dateCheck = new Date(dateCheck);
  const [selDate, setSelDate] = useState(dateCheck);
  const [dueDate, setDueDate] = useState(dateCheck);

  const tasksRef = firebase.firestore().collection("tasks");
  const usersRef = firebase.firestore().collection("users");

  const userId = props.extraData.id;

  let selDateString = selDate.toString();
  const dateArr = selDateString.split(" ");
  const dayString = dateArr.slice(1, 4).join(" ");
  const timeString = dateArr[4];
  //console.log(dayString, "dayString");
  //console.log(timeString, "TimeString");

  useEffect(() => {
    // usersRef.where("userId", "==", userId).onSnapshot(
    //   (querySnapshot) => {
    //     const ownedPetId = [];
    //     querySnapshot.forEach((doc) => {
    //       const pet = doc.data();
    //       console.log("PET>>>>>>>>>>>>", pet);
    //       pet.id = doc.id;
    //       ownedPetId.push(pet);
    // });
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }, [selDate]);

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const data = {
        description: entityText,
        dueDate: dueDate,
        dueTime: entityDueTime,
        petId: entityPetId,
        status: "open",
        frequency: entityFrequency,
        userId: userId,
      };
      tasksRef
        .add(data)
        .then((_doc) => {
          setEntityText("");
          setEntityDueDate(dueDate);
          setEntityDueTime("");
          setEntityPetId("");
          setEntityStatus("open");
          setEntityFrequency("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const onChange = (event, value) => {
    setDueDate(value);
    const time = value.toLocaleTimeString();
    setEntityDueTime(time);
  };

  return (
    <SafeAreaView>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.entityText}>Add a task</Text>
          <TextInput
            style={styles.input}
            placeholder='Task name'
            placeholderTextColor='#aaaaaa'
            onChangeText={(text) => setEntityText(text)}
            value={entityText}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Add pet'
            placeholderTextColor='#aaaaaa'
            onChangeText={(text) => setEntityPetId(text)}
            value={entityPetId}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
          />
        </View>

        <DateTimePicker
          testID='dateTimePicker'
          mode='datetime'
          is24Hour={true}
          display='default'
          onChange={onChange}
          value={dueDate}
          style={{
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
            width: 220,
          }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Add frequency'
            placeholderTextColor='#aaaaaa'
            onChangeText={(text) => setEntityFrequency(text)}
            value={entityFrequency}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

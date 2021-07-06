import React, { useEffect, useState } from "react";
import XDate from "xdate";
import { firebase } from "../../firebase/config";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import styles from "../../screens/combinedStyles";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default function CalendarScreen(props) {
  let currentDate = new XDate();
  currentDate = currentDate.toString();

  let choreDate = new XDate(2021, 6, 22, 8, 30);
  choreDate = choreDate.toString();

  const [choreDue, setChoreDue] = useState(choreDate);
  const [showMarkedDates, setShowMarkedDates] = useState(false);

  const onLogoutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => Alert.alert("Logged Out", "You are now logged out"))
      .catch((error) => {
        alert(error);
      });
  };

  // const onShowDatePress = () => {};

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.button} onPress={onLogoutPress}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>

        <Text>Hello world</Text>

        <View>
          <Calendar
            current={currentDate}
            markedDates={{
              [choreDue]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "orange",
                selectedTextColor: "red",
              },
            }}
          />
        </View>
      </View>
    </View>
  );
}

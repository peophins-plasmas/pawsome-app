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
import styles from "../combinedstyles";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default function CalendarScreen(props) {
  // const userID = props.extraData.id;
  // let currentDate = new XDate();
  // currentDate = currentDate.toString();

  // let choreDate = new XDate(2021, 6, 22, 8, 30);
  // choreDate = choreDate.toString();

  // const [choreDue, setChoreDue] = useState(choreDate);
  // const [showMarkedDates, setShowMarkedDates] = useState(false);

  const onLogoutPress = () => {
    // firebase
    //   .auth()
    //   .signOut()
    //   .then(() => Alert.alert("Logged Out", "You are now logged out"))
    //   .catch((error) => {
    //     alert(error);
    //   });
    Alert.alert("Button!", "You pressed a button");
  };

  const onShowDatePress = () => {};

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.button} onPress={onLogoutPress}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>

        {/* <View>
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
        </View> */}
      </View>
    </View>
  );
}

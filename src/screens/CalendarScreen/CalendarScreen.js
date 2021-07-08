import React, { useEffect, useState } from "react";
import XDate from "xdate";
import { firebase } from "../../firebase/config";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  View,
  Alert,
  Button,
} from "react-native";
import { Card } from "react-native-paper";
import CalendarStrip, {
  getSelectedDate,
  setSelectedDate,
} from "react-native-calendar-strip";
import styles, { colors } from "../../screens/combinedStyles";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CalendarScreen(props) {
  let date = new Date();
  let currentDate = date.toDateString();
  let currentTime = date.toLocaleTimeString();

  // date format: year/month/day/hrs/minutes
  // let taskDate = new XDate(2021, 6, 22, 8, 30);
  // taskDate = taskDate.toString();
  let taskDate = "2021-07-08";

  const [entityText, setEntityText] = useState("");
  const [entityDueDate, setEntityDueDate] = useState("");
  const [entityDueTime, setEntityDueTime] = useState("");
  const [entityPetId, setEntityPetId] = useState("");
  const [entityStatus, setEntityStatus] = useState("");
  const [entityFrequency, setEntityFrequency] = useState("");

  const [taskDue, setTaskDue] = useState(taskDate);
  const [showMarkedDates, setShowMarkedDates] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selDate, setSelDate] = useState(date);
  const [dueDate, setDueDate] = useState(date);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("dueDate");

  const tasksRef = firebase.firestore().collection("tasks");
  const userId = props.extraData.id;

  const onLogoutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => Alert.alert("Logged Out", "You are now logged out"))
      .catch((error) => {
        alert(error);
      });
  };

  console.log(selDate, "SELDATE");
  let selDateString = selDate.toString();
  const dateArr = selDateString.split(" ");
  const dayString = dateArr.slice(1, 4).join(" ");
  const timeString = dateArr[4];
  console.log(dayString, "dayString");
  console.log(timeString, "TimeString");

  useEffect(() => {
    console.log("useEffect runs");
    tasksRef
      .where("userId", "==", userId)
      .where("dueDate", "==", dayString)
      .onSnapshot(
        (querySnapshot) => {
          const newTasks = [];
          querySnapshot.forEach((doc) => {
            const task = doc.data();
            console.log("TASK.due>>>>>>>>>>>>", task.dueDate);
            console.log("dates equal?", task.dueDate == dayString);
            task.id = doc.id;
            newTasks.push(task);
          });
          setTasks(newTasks);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [selDate]);

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const data = {
        description: entityText,
        dueDate: entityDueDate,
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
          setEntityDueDate("");
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
  const formatDate = new Date(selDate);
  const onChange = (event, value) => {
    console.log("selected date in picker", value);
    setDueDate(value);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={onLogoutPress}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
          <Text>Today is {currentDate}.</Text>
          <Text>It is {currentTime}.</Text>
        </View>
        <CalendarStrip
          scrollable
          calendarAnimation={{ type: "sequence", duration: 30 }}
          selectedDate={currentDate}
          onDateSelected={(date) => {
            setSelDate(date);
            setDueDate(new Date(date));
          }}
          daySelectionAnimation={{
            type: "border",
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: colors.yellow,
          }}
          style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
          calendarHeaderStyle={{ color: "white" }}
          calendarColor={colors.dkblue}
          dateNumberStyle={{ color: "white" }}
          dateNameStyle={{ color: "white" }}
          highlightDateNumberStyle={{ color: colors.yellow }}
          highlightDateNameStyle={{ color: colors.yellow }}
          disabledDateNameStyle={{ color: colors.antWhite }}
          disabledDateNumberStyle={{ color: colors.antWhite }}
          iconContainer={{ flex: 0.1 }}
        />
        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            mode={mode}
            value={dueDate}
            is24Hour={true}
            display='default'
            onChange={onChange}
          />
        )}
        <View style={[styles.container]}>
          {tasks.length > 0 &&
            tasks.map((task) => {
              return (
                <View key={task.id} style={styles.entityContainer}>
                  <Text style={styles.entityText}>
                    Remember to {task.description} at {task.dueTime}
                  </Text>
                </View>
              );
            })}
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
            <View>
              <Button onPress={showDatepicker} title='Pick a date' />
            </View>
            <View>
              <Button onPress={showTimepicker} title='Pick a time' />
            </View>
            {/* <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Add due date'
                placeholderTextColor='#aaaaaa'
                onChangeText={(text) => setEntityDueDate(text)}
                value={entityDueDate}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
              />
            </View> */}
            {/* <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Add time due'
                placeholderTextColor='#aaaaaa'
                onChangeText={(text) => setEntityDueTime(text)}
                value={entityDueTime}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
              />
            </View> */}
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
            {/* <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Add status'
                placeholderTextColor='#aaaaaa'
                onChangeText={(text) => setEntityStatus(text)}
                value={entityStatus}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
              />
            </View> */}
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
          </View>
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
import { add } from "react-native-reanimated";

export default function CalendarScreen(props) {
  let date = new Date();
  let currentDate = date.toDateString();
  let currentTime = date.toLocaleTimeString();

  const [entityText, setEntityText] = useState("");
  const [entityDueDate, setEntityDueDate] = useState("");
  const [entityDueTime, setEntityDueTime] = useState("");
  const [entityPetId, setEntityPetId] = useState("");
  const [entityStatus, setEntityStatus] = useState("");
  const [entityFrequency, setEntityFrequency] = useState("");

  const [showMarkedDates, setShowMarkedDates] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selDate, setSelDate] = useState(date);
  const [dueDate, setDueDate] = useState(date);
  const [addingTask, setAddingTask] = useState(false);

  let addTaskText = "Add a task";
  if (addingTask) {
    addTaskText = "Cancel";
  }

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

  let selDateString = selDate.toString();
  const dateArr = selDateString.split(" ");
  const dayString = dateArr.slice(1, 4).join(" ");
  const timeString = dateArr[4];
  //console.log(dayString, "dayString");
  //console.log(timeString, "TimeString");

  useEffect(() => {
    tasksRef
      .where("userId", "==", userId)
      .where("dueDate", "==", dayString)
      .onSnapshot(
        (querySnapshot) => {
          const newTasks = [];
          querySnapshot.forEach((doc) => {
            const task = doc.data();
            console.log("TASK>>>>>>>>>>>>", task);
            task.id = doc.id;
            newTasks.push(task);
          });
          setTasks(newTasks);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [selDate, dueDate, entityDueDate, entityDueTime]);

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

        <View style={[styles.container]}>
          <Text style={styles.sectionHeaderText}>Today&apos;s Chores</Text>
          <Text style={styles.subHeaderText}>Pets: Ragnar, SomeOtherPet</Text>
        </View>
        <View style={styles.container}>
          {tasks.length > 0 ? (
            tasks.map((task) => {
              return (
                <View key={task.id} style={styles.entityContainer}>
                  <Text style={styles.entityText}>
                    {task.petId}: {task.description} at {task.dueTime}
                  </Text>
                </View>
              );
            })
          ) : (
            <View style={styles.container}>
              <Text>No chores for today!</Text>
            </View>
          )}

          {addingTask && (
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
              <TouchableOpacity
                style={styles.button}
                onPress={onAddButtonPress}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.button,
              { borderRadius: 30, padding: 10, margin: 15, width: 100 },
            ]}
            onPress={() => setAddingTask(!addingTask)}
          >
            <Text style={styles.buttonText}>{addTaskText}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
} from "react-native";
import { Card } from "react-native-paper";
import styles, { colors } from "../../screens/combinedStyles";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default function CalendarScreen(props) {
  let currentDate = new XDate();
  currentDate = currentDate.toString();

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
  const showDayTest = (date) => {
    alert(date);
  };

  const renderItem = (item) => {
    return (
      <View style={styles.container}>
        <Text>{item.description}</Text>
      </View>
    );
  };

  const renderDay = (day, item) => {
    return (
      <Card>
        <Card.Content
          style={{
            backgroundColor: colors.antiqueWhite,
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: colors.dkblue,
          }}
        >
          {renderItem}
        </Card.Content>
      </Card>
    );
  };

  //click on date and show associated tasks?
  // const onShowDatePress = () => {};
  useEffect(() => {
    tasksRef.where("userId", "==", userId).onSnapshot(
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
  }, []);

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const data = {
        description: entityText,
        dueDate: entityDueDate,
        dueTime: entityDueTime,
        petId: entityPetId,
        status: entityStatus,
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
          setEntityStatus("");
          setEntityFrequency("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={onLogoutPress}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
          <Text>Hello world</Text>
        </View>

        <Agenda
          current={currentDate}
          markedDates={{
            [taskDue]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: "orange",
              selectedTextColor: "red",
            },
            "2021-07-09": {
              selected: true,
              disableTouchEvent: true,
              selectedColor: "blue",
              selectedTextColor: "white",
            },
          }}
          items={{
            "2021-07-08": [],
            "2021-07-09": [],
            "2021-07-06": [{ timestamp: "08:15", description: "feed cat" }],
            "2021-07-07": [
              { time: "09:30", description: "throw mouse" },
              { time: "10:45", description: "give hairball remedy" },
            ],
          }}
          renderDay={renderDay}
          renderItem={renderItem}
          onDayPress={(dateString) => showDayTest(dateString)}
        />

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
              <TextInput
                style={styles.input}
                placeholder='Add new task'
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
                placeholder='Add due date'
                placeholderTextColor='#aaaaaa'
                onChangeText={(text) => setEntityDueDate(text)}
                value={entityDueDate}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Add time due'
                placeholderTextColor='#aaaaaa'
                onChangeText={(text) => setEntityDueTime(text)}
                value={entityDueTime}
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
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Add status'
                placeholderTextColor='#aaaaaa'
                onChangeText={(text) => setEntityStatus(text)}
                value={entityStatus}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
              />
            </View>
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

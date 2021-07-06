import React, { useEffect, useState } from "react";
import XDate from "xdate";
import { firebase } from "../../firebase/config";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
} from "react-native";
import styles from "../../screens/combinedStyles";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default function CalendarScreen(props) {
  let currentDate = new XDate();
  currentDate = currentDate.toString();

  // date format: year/month/day/hrs/minutes
  let taskDate = new XDate(2021, 6, 22, 8, 30);
  taskDate = taskDate.toString();

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
        userId: userId
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

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>Remember to {item.description} at {item.dueTime}</Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
              [taskDue]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "orange",
                selectedTextColor: "red",
              },
            }}
          />
        </View>
        {tasks.length > 0 && (
          <View>
            <FlatList
              data={tasks}
              renderItem={renderEntity}
              keyExtractor={(item) => item.id}
              removeClippedSubviews={true}
            />
          </View>
        )}
        <View style={styles.formContainer}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Add new task"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setEntityText(text)}
              value={entityText}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Add due date"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setEntityDueDate(text)}
              value={entityDueDate}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Add time due"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setEntityDueTime(text)}
              value={entityDueTime}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Add pet"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setEntityPetId(text)}
              value={entityPetId}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Add status"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setEntityStatus(text)}
              value={entityStatus}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Add frequency"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setEntityFrequency(text)}
              value={entityFrequency}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
}

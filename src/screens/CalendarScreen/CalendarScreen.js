import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/config";
import {
  Keyboard,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  View,
  Alert,
} from "react-native";
import { Card } from "react-native-paper";
import CalendarStrip from "react-native-calendar-strip";
import styles, { colors } from "../../screens/combinedStyles";
import { add } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import AddTask from "../../Components/AddTask";

export default function CalendarScreen(props) {
  let date = new Date();
  const dateString = date.toString();
  let currentDate = date.toDateString().toString();
  let currentTime = date.toLocaleTimeString();

  const [tasks, setTasks] = useState([]);
  const [selDate, setSelDate] = useState(dateString);
  const [dueDate, setDueDate] = useState(currentDate);
  const [addingTask, setAddingTask] = useState(false);
  const [timeStamp, setTimeStamp] = useState(null);

  let addTaskText = "Add a task";
  if (addingTask) {
    addTaskText = "Cancel";
  }

  const tasksRef = firebase.firestore().collection("tasks");
  const petsRef = firebase.firestore().collection("pets");
  const usersRef = firebase.firestore().collection("users");
  const userId = props.extraData.id;

  //find caretakerIds for user
  // useEffect(() => {
  //   async function getCaretakersIds() {
  //     await usersRef
  //       .doc(userId)
  //       .get()
  //       .then((document) => {
  //         const { caretakers } = document.data();
  //         setCaretakersIds(caretakers);
  //       })
  //       .catch((error) => {
  //         console.log("Caretaker id not found");
  //       });
  //   }
  //   getCaretakersIds();
  // }, []);

  useEffect(() => {
    let sortedTasks;
    tasksRef
      .orderBy("dueTime", "asc")
      .where("userId", "==", userId)
      .where("dueDate", "==", dueDate.toString())

      .onSnapshot(
        (querySnapshot) => {
          const newTasks = [];
          querySnapshot.forEach((doc) => {
            const task = doc.data();
            task.id = doc.id;
            newTasks.push(task);

            if (newTasks.length > 1) {
              sortedTasks = newTasks.sort((a, b) => {
                console.log("a in HIIIIIII 56", a);
                let aAPM = a["dueTime"].split(" ");
                console.log(aAPM, "aAPM line 58");
                let timeArrA = aAPM[0].split(":");
                let aHour = parseInt(timeArrA[0]);
                if (aAPM[1] == "PM" && aHour[0] !== 12) {
                  aHour = aHour + 12;
                }

                let bAPM = b.dueTime.split(" ");
                let timeArrB = bAPM[0].split(":");
                let bHour = parseInt(timeArrB[0]);
                if (bAPM[1] == "PM" && bHour[0] < 12) {
                  bHour = bHour + 12;
                }
                if (aHour !== bHour) {
                  return aHour - bHour;
                } else {
                  const minutesA = parseInt(timeArrA[1]);
                  const minutesB = parseInt(timeArrB[1]);
                  return minutesA - minutesB;
                }
              });
            } else {
              sortedTasks = newTasks;
            }
          });
          setTasks(sortedTasks);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [selDate, dueDate]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text>Today is {currentDate}.</Text>
          <Text>It is {currentTime}.</Text>
        </View>
        <CalendarStrip
          scrollable
          calendarAnimation={{ type: "sequence", duration: 30 }}
          selectedDate={date}
          onDateSelected={(d) => {
            let d2 = new Date(d);
            setTimeStamp(d2);
            d2 = d2.toDateString();
            setSelDate(d2);
            setDueDate(d2);
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
          <Text style={styles.sectionHeaderText}>
            Selected Day&apos;s Chores
          </Text>
        </View>
        <View style={styles.container}>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => {
              return (
                <Card key={task.id} style={styles.cardContainer}>
                  <Text style={styles.entityText}>
                    {task.petName}: {task.description} at {task.dueTime}
                  </Text>
                </Card>
              );
            })
          ) : (
            <View style={styles.container}>
              <Text>No chores for today!</Text>
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

          {addingTask && (
            <AddTask
              extraData={userId}
              calDate={dueDate}
              startTimeStamp={timeStamp}
            />
          )}
        </View>
        <View style={styles.scrollPad}></View>
        <View style={styles.scrollPad}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

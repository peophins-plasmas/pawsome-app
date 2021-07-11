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
import AddTask from "../../Components/AddTask";

export default function CalendarScreen(props) {
  let date = new Date();
  let currentDate = date.toDateString();
  let currentTime = date.toLocaleTimeString();

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
            // console.log("TASK>>>>>>>>>>>>", task);
            task.id = doc.id;
            newTasks.push(task);
          });
          setTasks(newTasks);
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
          selectedDate={currentDate}
          onDateSelected={(date) => {
            setSelDate(date);
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
                <Card key={task.id} style={styles.entityContainer}>
                  <Text style={styles.entityText}>
                    {task.petId}: {task.description} at {task.dueTime}
                  </Text>
                </Card>
              );
            })
          ) : (
            <View style={styles.container}>
              <Text>No chores for today!</Text>
            </View>
          )}

          {addingTask && <AddTask extraData={userId} calDate={selDate} />}

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

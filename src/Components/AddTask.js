import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config";
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import styles, { colors } from "../screens/combinedStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { add } from "react-native-reanimated";
import { Alert } from "react-native";

export default function AddTask(props) {
  let date = new Date();
  //console.log(props, "Props line 22");
  let dateCheck = props.calDate || date.toLocaleDateString();

  const [selDate, setSelDate] = useState(props.startTimeStamp || date);
  const [dueDate, setDueDate] = useState(dateCheck);
  const [ownedPetIds, setOwnedPetIds] = useState([]);
  const [ownedPets, setOwnedPets] = useState([]);
  const [caretakersIds, setCaretakersIds] = useState([]);
  const [coOwnersIds, setCoOwnersIds] = useState([]);
  const [allAssociatedUsers, setAllAssociatedUsers] = useState([]);
  const [checked, setChecked] = useState();
  const [checkedUserIds, setCheckedUserIds] = useState([]);

  const [entityPetName, setEntityPetName] = useState("");
  const [entityText, setEntityText] = useState("");
  const [entityDueDate, setEntityDueDate] = useState(
    dateCheck.toLocaleDateString
  );
  const [entityDueTime, setEntityDueTime] = useState("12:00:00 PM");
  const [entityPetId, setEntityPetId] = useState("");
  const [entityStatus, setEntityStatus] = useState("");
  const [entityFrequency, setEntityFrequency] = useState("");

  const tasksRef = firebase.firestore().collection("tasks");
  const usersRef = firebase.firestore().collection("users");
  const petsRef = firebase.firestore().collection("pets");

  const userId = props.extraData;
  const allIds = [...coOwnersIds, ...caretakersIds, userId];
  console.log("checkedUserIds", checkedUserIds);
  // console.log(allIds, "ALLIDS>>>>> 48");
  // console.log("caretakersIds line 49", caretakersIds);
  // console.log(userId, "userId");

  useEffect(() => {
    usersRef
      .doc(userId)
      .get()
      .then((document) => {
        const userData = document.data();
        setOwnedPetIds(userData.ownedPetId);
      })
      .catch((error) => {
        console.error("Pets not found");
      });
  }, []);

  //get all pet names and Ids in array of arrays
  useEffect(() => {
    async function getPets() {
      let holderArray = [];
      for (let i = 0; i < ownedPetIds.length; ++i) {
        await petsRef
          .doc(ownedPetIds[i])
          .get()
          .then((document) => {
            const { petName } = document.data();
            const newEl = [petName, ownedPetIds[i]];
            // console.log(newEl, "new El line 70");
            const containsPetId = ownedPets.some((el) =>
              el.includes(ownedPetIds[i])
            );
            if (!containsPetId) {
              holderArray.push(newEl);
              // console.log(holderArray, "holder line 78");
            }
          })
          .catch((error) => {
            console.error("Pets not found");
          });
      }
      setOwnedPets(holderArray);
    }
    getPets();
  }, [ownedPetIds]);

  //find coOwnersIds for user
  useEffect(() => {
    async function getCoOwnersIds() {
      await usersRef
        .doc(userId)
        .get()
        .then((document) => {
          const { coOwners } = document.data();
          setCoOwnersIds(coOwners);
        })
        .catch((error) => {
          console.error("No coOwners");
        });
    }
    getCoOwnersIds();
  }, []);

  useEffect(() => {
    async function getCaretakersIds() {
      await usersRef
        .doc(userId)
        .get()
        .then((document) => {
          const { caretakers } = document.data();
          setCaretakersIds(caretakers);
        })
        .catch((error) => {
          console.error("Caretaker id not found");
        });
    }
    getCaretakersIds();
  }, []);

  // get all caretaker and owner names by IDs for selecting who to assign the chore
  useEffect(() => {
    let holderArray = [];
    async function getUserNames() {
      for (let j = 0; j < allIds.length; ++j) {
        if (allIds[j] !== "none") {
          await usersRef
            .doc(allIds[j])
            .get()
            .then((document) => {
              const { firstName, lastName } = document.data();
              const newEl = { firstName, lastName, id: allIds[j] };
              holderArray.push(newEl);
            })
            .catch((error) => {
              console.error("No users found");
            });
        }
      }
      if (
        holderArray.length > 0 &&
        (allAssociatedUsers.length === 0 ||
          allAssociatedUsers[0]["id"] !== holderArray[0]["id"])
      ) {
        setAllAssociatedUsers(holderArray);
      }
    }
    getUserNames();
  }, [allIds]);

  // useEffect(() => {
  //   console.log(ownedPets, "OwnedPets line 95");
  //   console.log("ownedPetsId line 96", ownedPetIds);
  //   console.log("000000000  allAssociatedUsers line 171", allAssociatedUsers);
  //   console.log("checkedUserIds", checkedUserIds);
  // });

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const data = {
        description: entityText,
        dueDate: dueDate,
        dueTime: entityDueTime,
        petId: entityPetId,
        status: "open",
        frequency: entityFrequency,
        userId: checkedUserIds,
        petName: entityPetName,
      };
      tasksRef
        .add(data)
        .then((_doc) => {
          setEntityText("");
          setEntityDueDate(dueDate);
          setEntityDueTime("12:00:00");
          setEntityPetId("");
          setEntityPetName("");
          setEntityStatus("open");
          setEntityFrequency("");
          setCheckedUserIds([]);
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
    Alert.alert("Submitted!", "Chore added");
  };

  const onChange = (event, value) => {
    setDueDate(value.toDateString());
    const time = value.toLocaleTimeString();
    setEntityDueTime(time);
    setSelDate(value);
  };

  return (
    <SafeAreaView>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text
            style={{
              fontWeight: "bold",
              color: colors.pawsomeblue,
              fontSize: 30,
            }}
          >
            Add a task
          </Text>
        </View>

        <View style={[styles.container, styles.addTopMargin, { width: 250 }]}>
          <Text style={styles.blueHeaderText}>Choose a Pet</Text>
          <Text>(selected pet highlights in blue)</Text>
          <Text>(select one)</Text>
          {ownedPets.length > 0 ? (
            ownedPets.map((pet) => {
              return (
                <View
                  style={[
                    styles.container,
                    { flexDirection: "row", marginBottom: 3 },
                  ]}
                  key={pet[1]}
                >
                  <View
                    style={[
                      styles.radioPress,
                      {
                        borderColor:
                          pet[1] === checked ? colors.yellow : colors.ltblue,
                      },
                    ]}
                  >
                    <Pressable
                      style={() => [
                        styles.radioPress,
                        {
                          backgroundColor:
                            pet[1] === checked ? colors.pawsomeblue : "white",
                          borderWidth: pet[1] === checked ? 3 : 0,
                          borderColor:
                            pet[1] === checked ? colors.yellow : "black",
                        },
                      ]}
                      onPress={() => {
                        setChecked(pet[1]);
                        setEntityPetId(pet[1]);
                        setEntityPetName(pet[0]);
                      }}
                    >
                      <Text
                        style={[
                          styles.radioText,
                          {
                            fontWeight: pet[1] === checked ? "bold" : "300",
                          },
                        ]}
                      >
                        {pet[0]}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              );
            })
          ) : (
            <Text>
              You cannot add tasks to any pets. Ask the pet&apos;s owner to add
              a task for you!
            </Text>
          )}
        </View>
        <View style={[styles.container, styles.addTopMargin]}>
          <Text style={styles.blueHeaderText}>Choose a date and time</Text>

          <DateTimePicker
            testID='dateTimePicker'
            mode='datetime'
            is24Hour={true}
            display='default'
            onChange={onChange}
            value={selDate}
            style={styles.datePicker}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.blueHeaderText}>Describe the task</Text>
          <TextInput
            style={styles.input}
            placeholder='Task description'
            placeholderTextColor='#aaaaaa'
            onChangeText={(text) => setEntityText(text)}
            value={entityText}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
          />
        </View>
        <View style={[styles.container, styles.addTopMargin, { width: 250 }]}>
          <Text style={styles.blueHeaderText}>Assign to users</Text>
          <Text>(selected users highlight in blue)</Text>
          <Text>(select as many as desired)</Text>
          {allAssociatedUsers.length > 0 ? (
            allAssociatedUsers.map((user) => {
              return (
                <View
                  style={[styles.container, { flexDirection: "row" }]}
                  key={user.id}
                >
                  <View style={styles.selectPress}>
                    <Pressable
                      style={() => [
                        styles.selectPress,
                        {
                          backgroundColor:
                            checkedUserIds.length > 0 &&
                            checkedUserIds.includes(user.id)
                              ? colors.dkblue
                              : "white",
                          borderWidth: 1,
                        },
                      ]}
                      onPress={() => {
                        let addUserIds;
                        if (checkedUserIds.length > 0) {
                          addUserIds = checkedUserIds.slice();
                        } else {
                          addUserIds = [];
                        }
                        if (!addUserIds.includes(user.id)) {
                          addUserIds.push(user.id);
                        }
                        setCheckedUserIds(addUserIds);
                      }}
                    >
                      <Text
                        style={[
                          styles.radioText,
                          {
                            color: checkedUserIds.includes(user.id)
                              ? colors.yellow
                              : "black",
                            fontWeight: checkedUserIds.includes(user.id)
                              ? "bold"
                              : "300",
                          },
                        ]}
                      >
                        {user.firstName} {user.lastName}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              );
            })
          ) : (
            <View>
              <Text>Loading</Text>
            </View>
          )}
          <TouchableOpacity
            style={[styles.addSomeButton, styles.addTopMargin]}
            onPress={() => setCheckedUserIds([...coOwnersIds, userId])}
          >
            <Text style={styles.clearButtonText}>Add owners only</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.addSomeButton, styles.addTopMargin]}
            onPress={() => setCheckedUserIds(allIds)}
          >
            <Text style={styles.clearButtonText}>Add all users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.clearButton, styles.addTopMargin]}
            onPress={() => setCheckedUserIds([])}
          >
            <Text style={styles.clearButtonText}>Clear all users</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, { marginTop: 50, width: 250 }]}
          onPress={onAddButtonPress}
        >
          <Text style={styles.buttonText}>Submit Chore to Calendar</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 300 }}></View>
    </SafeAreaView>
  );
}

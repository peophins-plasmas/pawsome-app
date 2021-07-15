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
  const [checkedUser, setCheckedUser] = useState();

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
  console.log(allIds, "ALLIDS>>>>> 48");
  console.log("caretakersIds line 49", caretakersIds);
  console.log(userId, "userId");

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

  // useEffect(() => {
  //   console.log(ownedPets, "OwnedPets line 95");
  //   console.log("ownedPetsId line 96", ownedPetIds);
  // });

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

  //get all caretaker and owner names by IDs for selecting who to assign the chore
  // useEffect(() => {
  //   async function getUserNames() {
  //     let holderArray = [];
  //     for (let j = 0; j < allIds.length; ++j) {
  //  if(allIds[j]!=="none"){
  //       await usersRef
  //         .doc(allIds[j])
  //         .get()
  //         .then((document) => {
  //           const { firstName, lastName } = document.data();
  //           const newEl = { firstName, lastName, id: allIds[j] };
  //           const containsUserId = allAssociatedUsers.some((el) => el.id);
  //           if (!containsUserId) {
  //             holderArray.push(newEl);
  //             // console.log(holderArray, "holder line 78");
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("No users found");
  //         });
  //     }
  //   }
  //     setAllAssociatedUsers(holderArray);
  //   }
  //   getUserNames();
  // }, [allIds]);

  //console.log(caretakersIds, "caretakersIds outside useEffect");

  console.log(allAssociatedUsers, "allAssociatedUsers line 161");

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

        <View style={[styles.container, { width: 250 }]}>
          <Text style={styles.stackHeaderText}>Choose a Pet</Text>
          <Text>(selected pet highlights in blue)</Text>
          {ownedPets.length > 0 ? (
            ownedPets.map((pet) => {
              return (
                <View
                  style={[styles.container, { flexDirection: "row" }]}
                  key={pet[1]}
                >
                  <View style={styles.radioPress}>
                    <Pressable
                      style={() => [
                        styles.radioPress,
                        {
                          backgroundColor:
                            pet[1] === checked ? colors.pawsomeblue : "white",
                          borderWidth: 0,
                        },
                      ]}
                      onPress={() => {
                        setChecked(pet[1]);
                        setEntityPetId(pet[1]);
                        setEntityPetName(pet[0]);
                      }}
                    >
                      <Text style={styles.radioText}>{pet[0]}</Text>
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

        <DateTimePicker
          testID='dateTimePicker'
          mode='datetime'
          is24Hour={true}
          display='default'
          onChange={onChange}
          value={selDate}
          style={{
            color: "black",
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
            width: 220,
          }}
        />
        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 300 }}></View>
    </SafeAreaView>
  );
}

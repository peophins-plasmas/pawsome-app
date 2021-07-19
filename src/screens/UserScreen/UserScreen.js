import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  SectionList,
  Modal,
  Pressable,
  ImageBackground
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import UploadImage from "../../Components/UploadImage";
import { Avatar, Overlay, Button } from "react-native-elements";
import combinedStyles from "../combinedStyles";
import AddButton from "../../Components/AddButton";
import AddCaretaker from "../../Components/AddCaretaker";
import * as RootNavigator from "../../Navigation/RootNavigator";

export default function UserScreen(props) {
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  const [vets, setVets] = useState([]);
  const [ownedPets, setOwnedPets] = useState([]);
  const [caredPets, setCaredPets] = useState([]);
  const [caretakersIds, setCaretakersIds] = useState([]);
  const [caretakersArr, setCaretakersArr] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  //make single pet state to access specific pet to pass through as props to upload image component

  const usersRef = firebase.firestore().collection("users");
  const vetsRef = firebase.firestore().collection("vets");
  const petsRef = firebase.firestore().collection("pets");

  const userId = props.extraData.id;
  const vetId = props.extraData.vetId;

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    usersRef.where("id", "==", userId).onSnapshot(
      (querySnapshot) => {
        const userInfo = [];
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          user.id = doc.id;
          userInfo.push(user);
        });
        setUsers(userInfo);
        setSingleUser(userInfo[0]);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => console.log('unmounting...')}, []);


  useEffect(() => {
    vetsRef.where("id", "in", vetId).onSnapshot(
      (querySnapshot) => {
        const vets = [];
        querySnapshot.forEach((doc) => {
          const vet = doc.data();
          vet.id = doc.id;
          vets.push(vet);
        });
        setVets(vets);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => console.log('unmounting...')}, []);

  useEffect(() => {
    petsRef.where("ownerId", "array-contains", userId).onSnapshot(
      (querySnapshot) => {
        const newPets = [];
        querySnapshot.forEach((doc) => {
          const pet = doc.data();
          pet.id = doc.id;
          newPets.push(pet);
        });
        setOwnedPets(newPets);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => console.log('unmounting...')}, []);

  useEffect(() => {
    petsRef.where("caretakerId", "array-contains", userId).onSnapshot(
      (querySnapshot) => {
        const caredPets = [];
        querySnapshot.forEach((doc) => {
          const pet = doc.data();
          pet.id = doc.id;
          caredPets.push(pet);
        });
        setCaredPets(caredPets);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => console.log('unmounting...')}, []);

  //find caretakerIds for user
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
          console.log("Caretaker id not found");
        });
    }
    getCaretakersIds();
    return () => console.log('unmounting...')}, []);

  //using the caretaker ids from user, find the caretaker's name, image
  useEffect(() => {
    async function getCaretakers() {
      let holderArr = [];
      for (let i = 0; i < caretakersIds.length; i++) {
        await usersRef
          .doc(caretakersIds[i])
          .get()
          .then((document) => {
            const { firstName, lastName, email, phoneNum, image } = document.data();
            const newEl = {
              firstName: firstName,
              lastName: lastName,
              email: email,
              phone: phoneNum,
              image: image,
              caretakerId: caretakersIds[i],
            };
            console.log("new el >>>>>", newEl);
            const containsCaretakerId = caretakersArr.some((el) =>
              el.includes(caretakersIds[i])
            );
            if (!containsCaretakerId) {
              holderArr.push(newEl);
            }
          })
          .catch((error) => {
            console.log("Caretakers not found :(");
          });
      }
      setCaretakersArr(holderArr);
    }
    getCaretakers();
    console.log("caretakers in useeffect>>>>", caretakersArr);
    return () => console.log('unmounting...')}, [caretakersIds]);

  const renderUserEntity = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <UploadImage user={item} functionType={"userImg"} />
        </View>
        <View style={styles.entityContainer}>
          <Text style={styles.entityText}>Name:</Text>
          <Text style={styles.entityText}>
            {item.firstName} {item.lastName}
          </Text>
        </View>
        <View style={styles.entityContainer}>
          <Text style={styles.entityText}>Email:</Text>
          <Text style={styles.entityText}>{item.email}</Text>
        </View>
        <View style={styles.entityContainer}>
          <Text style={styles.entityText}>Address:</Text>
          <Text style={styles.entityText}>{item.address}</Text>
        </View>
        <View>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
              Alert.alert("Coming soon", "We are working on this feature for you");
               }}
                >
                   <Text style={styles.textStyle}>Edit</Text>
          </Pressable>
      </View>
    </View>
    )};

  console.log("vets>>>>>>>", vets);
  return (
    <SafeAreaView style={styles.container}>
      {users && (
        <ScrollView style={styles.listContainer}>
          <View style={{marginBottom: 25}}>
          {users.map((user) => {
            return (
            <View key={user.id}>
            <View style={styles.userContainer}>
               <UploadImage user={user} functionType={"userImg"} />
            </View>
            <Text style={styles.header}>MY ACCOUNT 🐾</Text>
            <View style={styles.entityContainer}>
            <Text style={styles.entityText}>Name:</Text>
            <Text style={styles.entityText}>
              {user.firstName} {user.lastName}
            </Text>
          </View>
          <View style={styles.entityContainer}>
            <Text style={styles.entityText}>Email:</Text>
            <Text style={styles.entityText}>{user.email}</Text>
          </View>
          <View style={styles.entityContainer}>
            <Text style={styles.entityText}>Address:</Text>
            <Text style={styles.entityText}>{user.address}</Text>
          </View>
          </View>
          )
          })}
          </View>
          <View style={{marginBottom: 20}}>
          <Text style={styles.header}>MY PETS 🐾</Text>
          <View style={styles.petImage}>
            {ownedPets.map((pet) => {
              return (
                <View key={pet.id} style={styles.petImage}>
                  <View style={styles.avatarContainer}>
                    <Avatar
                      activeOpacity={0.2}
                      containerStyle={{ backgroundColor: "#BDBDBD" }}
                      onPress={() => {
                        RootNavigator.navigate("Pet", { pet: pet });
                      }}
                      rounded
                      size="large"
                      source={{ uri: pet.image }}
                    />
                    <Text>{pet.petName}</Text>
                  </View>
                </View>
              );
            })}
            <AddButton extraData={props.extraData} addTo={"addPet"} />
          </View>
          </View>
          <View style={{marginBottom: 20}}>
          <Text style={styles.header}>PETS I SIT FOR 🐾</Text>
          <View style={styles.petImage}>
            {caredPets.map((pet) => {
              return (
                <View key={pet.id} style={styles.petImage}>
                  <View style={styles.avatarContainer}>
                    <Avatar
                      activeOpacity={0.2}
                      containerStyle={{ backgroundColor: "#BDBDBD" }}
                      onPress={() => {
                        Alert.alert('coming soon!')
                      }}
                      rounded
                      size="large"
                      source={{ uri: pet.image }}
                    />
                    <Text>{pet.petName}</Text>
                  </View>
                </View>
              );
            })}
          </View>
          </View>
          <View style={{marginBottom: 20}}>
          {ownedPets.length > 0 && ownedPets[0] !== "none" && (
            <View>
              <View>
                <Text style={styles.header}>PETSITTERS 🐾</Text>
              </View>
              <View style={styles.petImage}>
                {caretakersArr.map((caretaker) => {
                  console.log('CARETAKER>>>', caretaker)
                  return (
                    <View key={caretaker.caretakerId} style={styles.petImage}>
                      <View style={styles.avatarContainer}>
                        <Avatar
                          activeOpacity={0.2}
                          containerStyle={{ backgroundColor: "#BDBDBD" }}
                          onPress={toggleOverlay}
                          rounded
                          size="large"
                          source={{ uri: caretaker.image }}
                        />
                        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.modalView} animationType="slide">
                          <Text style={styles.modalText}>{caretaker.firstName} {caretaker.lastName}</Text>
                          <Text style={styles.modalText}>{caretaker.email}</Text>
                          <Text style={styles.modalText}>{caretaker.phone}</Text>

                        </Overlay>
                        <Text>{caretaker.firstName}</Text>
                      </View>
                    </View>
                  );
                })}
                <AddButton
                  user={props.extraData}
                  caretakers={caretakersArr}
                  pets={ownedPets}
                  addTo={"addCaretaker"}
                />
              </View>
            </View>
          )}
          </View>

          <View style={{marginBottom: 20}}>
          {vets.length > 0 ? (
            <View>
              <View style={styles.modalContainer}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  {vets.map((vet) => {
                    return (
                      <View key={vet.id} style={styles.centeredView}>
                        <View style={styles.modalView}>
                          <Text style={styles.modalText}>{vet.vetName}</Text>
                          <Text style={styles.modalText}>{vet.email}</Text>
                          <Text style={styles.modalText}>{vet.phoneNum}</Text>
                          <Text style={styles.modalText}>{vet.address}</Text>
                          <Text style={styles.modalText}>{vet.hours}</Text>

                          <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                              Alert.alert("Coming soon", "We are working on this feature for you");
                            }}
                          >
                            <Text style={styles.textStyle}>Edit</Text>
                          </Pressable>
                        </View>
                      </View>
                    );
                  })}
                  <SafeAreaView>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                  </SafeAreaView>
                </Modal>
              </View>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.textStyle}>MY VETS 🩺</Text>
              </Pressable>
            </View>
          ) : (
            <View>{/* <Text>No vets found!</Text> */}</View>
          )}
          </View>
          <View>
      </View>
          <View style={{ height: 100 }}></View>
        </ScrollView>
      )}
      <View style={{position: "absolute", bottom: 30, alignSelf: "flex-end", right: 30}}>
      <Pressable
              style={[combinedStyles.button, combinedStyles.buttonClose]}
              onPress={() => {
              Alert.alert("Coming soon", "We are working on this feature for you");
               }}
                >
                   <Text style={combinedStyles.textStyle}>Edit</Text>
          </Pressable>
      </View>
    </SafeAreaView>
  );
}

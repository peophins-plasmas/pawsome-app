import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
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
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import UploadImage from "../../Components/UploadImage";
import { Avatar } from "react-native-elements";
import PetForm from "./petForm";
import { Card, Title, Paragraph } from "react-native-paper";
import { colors } from "../combinedStyles";
import AddButton from "../../Components/AddButton";
import AddCaretaker from "../../Components/AddCaretaker";
import * as RootNavigator from "../../Navigation/RootNavigator";

export default function UserScreen(props) {
  const [entityText, setEntityText] = useState("");
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  const [vets, setVets] = useState([]);
  const [pets, setPets] = useState([]);
  const [ownedPets, setOwnedPets] = useState([]);
  const [caredPets, setCaredPets] = useState([]);
  const [caretakersIds, setCaretakersIds] = useState([]);
  const [caretakersArr, setCaretakersArr] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  //make single pet state to access specific pet to pass through as props to upload image component

  const usersRef = firebase.firestore().collection("users");
  const vetsRef = firebase.firestore().collection("vets");
  const petsRef = firebase.firestore().collection("pets");

  const userId = props.extraData.id;
  const vetId = props.extraData.vetId;

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
  }, []);


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
            const { firstName, image } = document.data();
            const newEl = {
              firstName: firstName,
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

  console.log("caretakers outside>>>>", caretakersArr);

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
      </View>
    );
  };
  console.log("vets>>>>>>>", vets);
  return (
    <SafeAreaView style={styles.container}>
      {users && (
        <ScrollView style={styles.listContainer}>
          <FlatList
            data={users}
            renderItem={renderUserEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
          <Text style={styles.entityText}>My Pets:</Text>
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
          <Text style={styles.entityText}>Pets I Sit For:</Text>
          <View style={styles.petImage}>
            {caredPets.map((pet) => {
              return (
                <View key={pet.id} style={styles.petImage}>
                  <View style={styles.avatarContainer}>
                    <Avatar
                      activeOpacity={0.2}
                      containerStyle={{ backgroundColor: "#BDBDBD" }}
                      onPress={() => alert("onPress")}
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
          {ownedPets.length > 0 && ownedPets[0] !== "none" && (
            <View>
              <View>
                <Text style={styles.entityText}>My Pets&apos; Caretakers</Text>
              </View>
              <View style={styles.petImage}>
                {caretakersArr.map((caretaker) => {
                  return (
                    <View key={caretaker.caretakerId} style={styles.petImage}>
                      <View style={styles.avatarContainer}>
                        <Avatar
                          activeOpacity={0.2}
                          containerStyle={{ backgroundColor: "#BDBDBD" }}
                          onPress={() => alert("onPress")}
                          rounded
                          size="large"
                          source={{ uri: caretaker.image }}
                        />
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
                              console.log("vet was clicked");
                            }}
                          >
                            <Text style={styles.textStyle}>Edit</Text>
                          </Pressable>
                        </View>
                      </View>
                    );
                  })}
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </Modal>
              </View>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.textStyle}>My Vets</Text>
              </Pressable>
            </View>
          ) : (
            <View>{/* <Text>No vets found!</Text> */}</View>
          )}

          <View style={{ height: 100 }}></View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

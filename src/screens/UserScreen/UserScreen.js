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

export default function UserScreen(props) {
  const [entityText, setEntityText] = useState("");
  const [users, setUsers] = useState([]);
  const [vets, setVets] = useState([]);
  const [ownedPets, setOwnedPets] = useState([]);
  const [caredPets, setCaredPets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  //make single pet state to access specific pet to pass through as props to upload image component

  const usersRef = firebase.firestore().collection("users");
  const vetsRef = firebase.firestore().collection("vets");
  const petsRef = firebase.firestore().collection("pets");

  const userId = props.extraData.id;
  const vetId = props.extraData.vetId;
  console.log("VETID", vetId);

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
          console.log("VET IN OPERATOR>>>>>>>>>>>>>>", vet);
          vet.id = doc.id;
          vets.push(vet);
        });
        setVets(vets);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

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
  }, []);

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
  }, []);

  const renderUserEntity = ({ item, index }) => {
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

  const renderVetEntity = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          {console.log("ITEM", item)}
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{item.vetName}</Text>
              <Text style={styles.modalText}>{item.email}</Text>
              <Text style={styles.modalText}>{item.phoneNum}</Text>
              <Text style={styles.modalText}>{item.address}</Text>
              <Text style={styles.modalText}>{item.hours}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Vet Info</Text>
        </Pressable>
      </View>
    );
  };

  const renderOwnedPetEntity = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.entityText}>My Pets:</Text>
        <View style={styles.petImage}>
          <Avatar
            activeOpacity={0.2}
            containerStyle={{ backgroundColor: "#BDBDBD" }}
            onPress={() => alert("onPress")}
            rounded
            size="large"
            source={{ uri: item.image }}
          />
          <Modal visible={modalOpen} animationType="slide">
            <SafeAreaView style={styles.modalContent}>
              <Avatar
                activeOpacity={0.2}
                containerStyle={{
                  backgroundColor: colors.wheat,
                  alignSelf: "center",
                  marginTop: 30,
                }}
                title="X"
                rounded
                size="small"
                onPress={() => setModalOpen(false)}
              />
              <PetForm extraData={props.extraData} />
            </SafeAreaView>
          </Modal>

          <Avatar
            activeOpacity={0.2}
            containerStyle={{ backgroundColor: colors.wheat }}
            onPress={() => setModalOpen(true)}
            icon={{ name: "add" }}
            rounded
            size="large"
          />
        </View>
      </View>
    );
  };

  const renderCaredPetEntity = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.entityText}>Friends:</Text>
        <View style={styles.petImage}>
          <Avatar
            avatarStyle={{ padding: 30 }}
            activeOpacity={0.2}
            containerStyle={{ backgroundColor: "#BDBDBD" }}
            onPress={() => alert("onPress")}
            rounded
            size="large"
            source={{ uri: item.image }}
          />
        </View>
      </View>
    );
  };

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
          <FlatList
            horizontal
            data={ownedPets}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
            renderItem={renderOwnedPetEntity}
          />
          {/* <FlatList
            data={ownedPets}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("PetDetails", item)}
              >
                <Text style={styles.titleTextForm}>{item.title}</Text>
              </TouchableOpacity>
            )}
          /> */}
          <FlatList
            horizontal
            data={caredPets}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
            renderItem={renderCaredPetEntity}
          />
          <FlatList
            data={vets}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
            renderItem={renderVetEntity}
          />
          <View style={{ height: 100 }}></View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

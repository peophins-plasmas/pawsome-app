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
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import UploadImage from "../../Components/UploadImage";
import { Card, Title, Paragraph } from "react-native-paper";
import { Avatar } from "react-native-elements";

export default function UserScreen(props) {
  const [entityText, setEntityText] = useState("");
  const [users, setUsers] = useState([]);
  const [vets, setVets] = useState([]);
  const [ownedPets, setOwnedPets] = useState([]);
  const [caredPets, setCaredPets] = useState([]);

  //make single pet state to access specific pet to pass through as props to upload image component

  const usersRef = firebase.firestore().collection("users");
  const vetsRef = firebase.firestore().collection("vets");
  const petsRef = firebase.firestore().collection("pets");

  const userId = props.extraData.id;
  const vetId = props.extraData.vetId;
  console.log("VETID", vetId);

  const onLogoutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() =>
        Alert.alert(
          "Logged Out",
          "You are now logged out"
          // [
          //   {
          //     text: "Return to login page",
          //     onPress: () => props.navigation.navigate("Login"),
          //   },
          // ]
        )
      )
      .catch((error) => {
        alert(error);
      });
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
      <View>
        <View style={styles.userContainer}>
          <UploadImage user={item} />
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
        <Card>
          <Card.Content>
            <Title>My Vet Info</Title>
            <Paragraph>{item.vetName}</Paragraph>
            <Paragraph>{item.email}</Paragraph>
            <Paragraph>{item.phoneNum}</Paragraph>
            <Paragraph>{item.address}</Paragraph>
            <Paragraph>{item.hours}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  };

  const renderOwnedPetEntity = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <Text>My Pets:</Text>
        <View style={styles.petImage}>
          <Avatar
            activeOpacity={0.2}
            containerStyle={{ backgroundColor: "#BDBDBD" }}
            onPress={() => alert("onPress")}
            rounded
            size="large"
            source={{ uri: item.image }}
          />
          <Avatar
            activeOpacity={0.2}
            containerStyle={{ backgroundColor: "#BDBDBD" }}
            icon={{ name: "add" }}
            onPress={() => alert("onPress")}
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
        <Text>Friends:</Text>
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
        <View style={styles.listContainer}>
          <FlatList
            data={users}
            renderItem={renderUserEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
          <FlatList
            data={ownedPets}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
            renderItem={renderOwnedPetEntity}
          />
          <FlatList
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
        </View>
      )}
    </SafeAreaView>
  );
}

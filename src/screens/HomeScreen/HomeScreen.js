import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import AddButton from "../../Components/AddButton"
import styles from "./styles";
import { colors } from "../combinedStyles"
import { firebase } from "../../firebase/config";
import * as RootNavigator from "../../Navigation/RootNavigator";

export default function HomeScreen(props) {

  const [pets, setPets] = useState([]);

  const petsRef = firebase.firestore().collection("pets");
  const userID = props.extraData.id;

  useEffect(() => {
    petsRef.where("ownerId", "array-contains", userID).onSnapshot(
      (querySnapshot) => {
        const newPets = [];
        querySnapshot.forEach((doc) => {
          const pet = doc.data();
          pet.id = doc.id;
          newPets.push(pet);
        });
        setPets(newPets);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {pets.map((pet) => {
            return (
            <Card borderRadius={70}>
              <Card.Title style={{color: colors.pawsomeblue, fontSize: 20}}>{pet.petName.toUpperCase()}</Card.Title>
                <Card.Divider />
                  <View
                    style={{
                      position: "relative",
                      justifyContent: "space-between"
                    }}
                  >
                    <View style={{flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap"}}>
                    <Avatar
                    activeOpacity={0.2}
                    containerStyle={{ backgroundColor: "#BDBDBD", alignSelf: "flex-start" }}
                    onPress={() => {
                      RootNavigator.navigate("Pet", { pet: pet });
                    }}
                    rounded
                    size="xlarge"
                    source={{ uri: pet.image }}
                    />
                    <View style={{flexDirection: "column", justifyContent: "space-between"}}>
                    <View>
                    <Text>Birthday: {pet.birthday || "unknown"}</Text>
                    <Text>Sex: {pet.sex || "other"}</Text>
                    </View>
                    <View>
                    <Button title="See More" onPress={() => {
                        RootNavigator.navigate("Pet", { pet: pet });
                      }}>
                    </Button>
                    </View>
                    </View>
                    </View>

                  </View>
            </Card>
            )
          })}
        </View>

        <View style={styles.formContainer}>
          <AddButton extraData={props.extraData} addTo={"addPet"}/>
        </View>

      <View style={{ height: 100 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

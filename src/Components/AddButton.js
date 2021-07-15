import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
  Modal,
} from "react-native";
import { Avatar } from "react-native-elements";
import styles from "../screens/UserScreen/styles";
import { colors } from "../screens/combinedStyles";
import PetForm from "../screens/UserScreen/petForm";
import AddCaretaker from "./AddCaretaker";

export default function AddButton(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const closeForm = () => {
    setModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.petImage}>
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
            {props.addTo === "addPet" && (
              <PetForm extraData={props.extraData} closeForm={closeForm} />
            )}
            {props.addTo === "addCaretaker" && (
              <AddCaretaker
                user={props.user}
                caretakers={props.caretakers}
                pets={props.pets}
              />
            )}
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
}

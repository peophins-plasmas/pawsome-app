import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../firebase/config";

if (process.env.NODE_ENV !== "production") require("../../secrets");

const checkForLibraryPermission = async () => {
  const {
    libraryPermission,
  } = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (libraryPermission !== "granted") {
    alert("Please grant permission for this app to access your media library");
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  } else {
    console.log("Media permissions are granted");
  }
};

const checkForCameraPermission = async () => {
  const { cameraPermission } = await ImagePicker.getCameraPermissionsAsync();
  if (cameraPermission !== "granted") {
    alert("Please grant permission for this app to access your camera");
    await ImagePicker.requestCameraPermissionsAsync();
  } else {
    console.log("Camera permissions are granted");
  }
};

export default function UploadImage(props) {
  let CLOUDINARY_URL = process.env.CLOUDINARY_URL;

  const user = props.user;
  const pet = props.pet;
  console.log("upload user>>>>", user);
  console.log("upload pet>>>>", pet);
  const [image, setImage] = useState(null);
  const [userImage, setUserImage] = useState("");
  const [petImage, setPetImage] = useState("");
  const userImageRef = firebase.firestore().collection("users").doc(user.id);
  // const petImageRef = firebase.firestore().collection("pets").doc(pet.id);

  let _image = "";

  const addImageFromLibrary = async () => {
    checkForLibraryPermission();
    _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (_image.cancelled === true) {
      return;
    }
    uploadToCloud(_image);
  };

  const captureImageFromCamera = async () => {
    checkForCameraPermission();
    let _image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (_image.cancelled === true) {
      return;
    }
    uploadToCloud(_image);
  };

  const uploadToCloud = async (_image) => {
    let base64Img = `data:image/jpg;base64,${_image.base64}`;

    let data = {
      file: base64Img,
      upload_preset: "d93plb6p",
    };

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    }).then(async (r) => {
      let data = await r.json();
      console.log("data in post response>>>>>", data);
      setImage(data.url);
      return userImageRef
        .update({
          image: data.url,
        })
        .then(() => {
          console.log("Image successfully updated!");
        })
        .catch((error) => {
          console.error("error updating document: ", error);
        });
    });
  };

  return (
    <View style={imageUploaderStyles.container}>
      <View style={imageUploaderStyles.cameraBtnContainer}>
        <TouchableOpacity
          onPress={captureImageFromCamera}
          style={imageUploaderStyles.uploadBtn}
        >
          <Text>{image ? "Take new photo from" : "Upload from"} Camera</Text>
          <AntDesign name="camerao" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={addImageFromLibrary}
          style={imageUploaderStyles.uploadBtn}
        >
          <Text>{image ? "Edit" : "Upload"} Image</Text>
          <AntDesign name="clouduploado" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    margin: 20,
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraBtnContainer: {
    opacity: 0.7,
    right: 0,
    top: 30,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
});

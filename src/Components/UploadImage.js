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
import styles from "../screens/combinedStyles";
// import * as ImageManipulator from "expo-image-manipulator";

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
  // const [ready, setReady] = useState(false);
  // const [editImage, setEditImage] = useState(null);
  let CLOUDINARY_URL = process.env.CLOUDINARY_URL;

  const user = props.user;
  const pet = props.pet;
  const functionType = props.functionType;
  let img = props.user || props.pet;
  img = img.image;
  const [image, setImage] = useState(img);
  let userImageRef;
  let petImageRef;

  if (functionType === "userImg") {
    userImageRef = firebase.firestore().collection("users").doc(user.id);
  } else if (functionType === "petImg") {
    petImageRef = firebase.firestore().collection("pets").doc(pet.id);
  }

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
    // await _image.downloadAsync();
    //   setImage(_image);
    //   setReady(true);
    uploadToCloud(_image);
  };

  const captureImageFromCamera = async () => {
    checkForCameraPermission();
    let _image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [1: 1],
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
      setImage(data.url);
      if (functionType === "userImg") {
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
      } else if (functionType === "petImg") {
        return petImageRef
          .update({
            image: data.url,
          })
          .then(() => {
            console.log("Image successfully updated!");
          })
          .catch((error) => {
            console.error("error updating document: ", error);
          });
      }
    });
  };

  return (
    <View>
      <View style={styles.photoContainer}>
        {image && (
          <Image source={{ uri: image }} style={{ width: 325, height: 325 }} />
        )}
      </View>
      <View style={styles.allUploadBtnContainer}>
        <View style={styles.cameraBtnContainer}>
          <TouchableOpacity
            onPress={captureImageFromCamera}
            style={styles.uploadBtn}
          >
            <Text style={styles.uploadTextStyle}>Upload from Camera</Text>
            <AntDesign
              name="camerao"
              size={20}
              style={styles.uploadTextStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.galleryBtnContainer}>
          <TouchableOpacity
            onPress={addImageFromLibrary}
            style={styles.uploadBtn}
          >
            <Text style={styles.uploadTextStyle}>Choose from Gallery</Text>
            <AntDesign
              name="clouduploado"
              size={20}
              style={styles.uploadTextStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

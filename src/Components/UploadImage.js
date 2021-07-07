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

const checkForCameraRollPermission = async () => {
  //need to pass users in as props to upload image component and check user permissions if false, have the alert render
  const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Please grant camera roll permissions inside your system's settings");
  } else {
    console.log("Media Permissions are granted");
  }
};

export default function UploadImage(props) {
  const user = props.user;
  let CLOUDINARY_URL = process.env.CLOUDINARY_URL;
  const [image, setImage] = useState(null);
  const [userImage, setUserImage] = useState("");
  const userImageRef = firebase.firestore().collection("users").doc(user.id);

  useEffect(() => {
    checkForCameraRollPermission();
  }, []);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (_image.cancelled === true) {
      return;
    }

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
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}
        >
          <Text>{image ? "Edit" : "Upload"} Image</Text>
          <AntDesign name="camera" size={20} color="black" />
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
});

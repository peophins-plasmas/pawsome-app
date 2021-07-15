import MaskedView from "@react-native-community/masked-view";
import React, { Component, useState, useEffect } from "react";
import { Button, View, Image } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";

export default class CropMask extends React {
  render() {
    return (
      <MaskedView
        style={{ flex: 1 }}
        maskElement={
          <View
            style={{
              // Transparent background mask
              backgroundColor: "#00000077", // The '77' here sets the alpha
              flex: 1,
            }}
          >
            <View
              style={{
                // Solid background as the aperture of the lens-eye.
                backgroundColor: "#ff00ff",
                // If you have a set height or width, set this to half
                borderRadius: 200,
                flex: 1,
              }}
            />
          </View>
        }
      >
        {/* Shows behind the mask, you can put anything here, such as an image */}
        <View style={{ flex: 1, height: "100%", backgroundColor: "#324376" }} />
        <View style={{ flex: 1, height: "100%", backgroundColor: "#F5DD90" }} />
        <View style={{ flex: 1, height: "100%", backgroundColor: "#F76C5E" }} />
        <View style={{ flex: 1, height: "100%", backgroundColor: "#2E6D3E" }} />
      </MaskedView>
    );
  }
}

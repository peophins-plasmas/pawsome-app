import React from "react";
import { Button, StyleSheet, View, Image } from "react-native";
import LottieView from "lottie-react-native";

export default class App extends React.Component {
  componentDidMount() {
    this.animation.play();
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  render() {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{
            width: 400,
            height: 400,
            backgroundColor: "#eee",
          }}
          source={require("../assets/paws-animation.json")}
        />
        <Image
          style={{ width: 350, height: 80, resizeMode: "contain" }}
          source={require("../assets/pawsome_logo.png")}
        />
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{
            width: 400,
            height: 400,
            backgroundColor: "#eee",
          }}
          source={require("../assets/paws-animation.json")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});

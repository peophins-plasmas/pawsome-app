import { StyleSheet } from "react-native";

export const colors = {
  dkblue: "#0081AF",
  pawsomeblue: "#00ABE7",
  ltblue: "#2DC7FF",
  wheat: "#EAD2AC",
  antWhite: "#FAEFDC",
  yellow: "#FEE05B",
};

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
  //Homescreen formcontainer
  formContainer: {
    flexDirection: "row",
    height: 80,
    marginTop: 40,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
  },
  inputHome: {
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  inputRegistration: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  // ButtonTitle used on registration and login screens
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonRegistration: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
  },
  buttonLogin: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
  },
  //Home: listcontainer, entitycontainer, entitytext
  listContainer: {
    marginTop: 20,
    padding: 20,
  },
  entityContainer: {
    marginTop: 16,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  entityText: {
    fontSize: 20,
    color: "#333333",
  },
  //Registration screen and Login screen: footerview, footertext, footerlink
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
});

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
    display: "flex",
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },

  //Drawer styling
  hiddenDrawer: {
    color: "red",
  },

  //Homescreen formcontainer
  formContainer: {
    flexDirection: "column",
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginTop: 5,
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
    width: 200,
    margin: 5,
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
    backgroundColor: colors.dkblue,
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
    display: "flex",
    flex: 1,
    marginTop: 16,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  entityText: {
    fontSize: 20,
    color: "black",
  },

  sectionHeaderText: {
    color: colors.pawsomeblue,
    fontSize: 30,
    fontWeight: "bold",
    borderBottomColor: colors.pawsomeblue,
    borderBottomWidth: 2,
    margin: 5,
  },
  introContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    borderWidth: 1,
  },
  stackContainer: {
    display: "flex",
    flexDirection: "row",
  },
  stack: {
    flexDirection: "column",
    justifyContent: "center",
    margin: 20,
  },
  stackHeaderText: {
    fontWeight: "bold",
    color: colors.pawsomeblue,
  },

  cautionHeaderText: {
    fontWeight: "bold",
    color: "red",
  },

  nameText: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    margin: 5,
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
  smallAvatarImage: {
    flexDirection: "row",
    padding: 10,
  },

  //uploadImage
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: -50,
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
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  photoContainer: {
    margin: 20,
    elevation: 2,
    height: 400,
    width: 300,
    backgroundColor: "#efefef",
    position: "relative",
    overflow: "hidden",
  },

  //chore page & add task
  cardContainer: {
    display: "flex",
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    width: "80%",
    backgroundColor: "white",
    margin: 5,
    padding: 5,
  },

  scrollPad: {
    height: 100,
  },
});

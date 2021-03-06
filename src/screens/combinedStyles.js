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
    borderRadius: 15,
    backgroundColor: colors.wheat,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButton: {
    height: 30,
    borderRadius: 10,
    backgroundColor: colors.yellow,
    width: 180,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
  addSomeButton: {
    height: 30,
    borderRadius: 10,
    backgroundColor: colors.ltblue,
    width: 180,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  clearButtonText: {
    color: "black",
    fontSize: 14,
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
    alignSelf: "center",
    borderWidth: 4,
    borderRadius: 30,
    borderColor: colors.wheat,
    backgroundColor: colors.wheat,
    shadowOpacity: 0.5,
    shadowColor: "gray",
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
  blueHeaderText: {
    fontWeight: "bold",
    color: colors.pawsomeblue,
    fontSize: 18,
  },
  cautionHeaderText: {
    fontWeight: "bold",
    color: "red",
  },

  nameText: {
    color: "black",
    fontSize: 28,
    fontWeight: "700",
    margin: 10,
  },

  //Add task component and calendarScreen
  radioPress: {
    display: "flex",
    alignItems: "stretch",
    alignContent: "center",
    justifyContent: "space-around",
    flex: 1,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
  },
  radioText: {
    textAlign: "center",
    fontSize: 18,
  },
  selectPress: {
    display: "flex",
    alignItems: "stretch",
    alignContent: "center",
    justifyContent: "space-around",
    flex: 1,
    backgroundColor: "white",
    borderColor: colors.pawsomeblue,
    borderWidth: 2,
  },
  addTopMargin: {
    marginTop: 15,
  },
  datePicker: {
    color: "black",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    width: 220,
    marginTop: 0,
  },
  titleUnderline: {
    borderBottomColor: colors.dkblue,
    borderBottomWidth: 1,
    borderStyle: "solid",
    marginBottom: 5,
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
  allUploadBtnContainer: {
    marginTop: 15,
    display: "flex",
    alignItems: "stretch",
    height: 80,
    width: "100%",
  },
  galleryBtnContainer: {
    padding: 5,
    height: 50,
    // opacity: 0.7,
    position: "absolute",
    right: 0,
    borderRadius: 10,
    backgroundColor: colors.pawsomeblue,
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  cameraBtnContainer: {
    padding: 5,
    height: 50,
    // opacity: 0.7,
    position: "absolute",
    left: 0,
    borderRadius: 10,
    backgroundColor: colors.pawsomeblue,
  },
  uploadTextStyle: {
    color: "white",
    fontWeight: "500",
  },
  photoContainer: {
    height: 325,
    width: 325,
    borderRadius: 325 / 2,
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

  //addCaretaker & addPet forms
  containerForm: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  header: {
    fontSize: 25,
    alignSelf: "center",
    padding: 10,
    fontWeight: "bold",
    color: colors.dkblue,
  },
  inputForm: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
  },
});

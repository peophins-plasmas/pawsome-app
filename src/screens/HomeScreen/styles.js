import { StyleSheet } from "react-native";
import { colors } from "../combinedStyles";

export default StyleSheet.create({
  container: {
    flexDirection: "column",
    //flex: 1,
    alignItems: "center",
  },
  addPetContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",

    justifyContent: "center",
  },
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
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  // header:{
  //   width:"100%",
  //   height:60,
  //   flexDirection:"row",
  //   justifyContent:"space-between",
  //   alignItems:"center",
  //   paddingHorizontal:20
  // },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  listContainer: {
    marginTop: 20,
    padding: 20,
  },
  entityContainer: {
    marginTop: 16,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    paddingBottom: 16,
    alignItems: "center",
  },
  entityText: {
    fontSize: 20,
    color: "#333333",
    alignItems: "center",
  },
  titleText: {
    color: colors.pawsomeblue,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
});

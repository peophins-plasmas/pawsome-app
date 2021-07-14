import { StyleSheet } from "react-native";
import { colors } from "../combinedStyles";

export default StyleSheet.create({
  modalContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  userContainer: {
    flexDirection: "row",
    flex: 1,
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
  header: {
    fontSize: 25,
    alignSelf: "center",
    padding: 10,
    fontWeight: "bold",
    color: colors.dkblue,
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
  listContainer: {
    marginTop: 20,
    padding: 20,
    borderColor: "black",
  },
  entityContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  entityText: {
    fontSize: 16,
    padding: 2,
    color: "#333333",
  },
  imageContainer: {
    height: 20,
    width: 20,
  },
  petImage: {
    flexDirection: "row",
    padding: 5,
    flexWrap: "wrap",

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: colors.dkblue,
    margin: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  titleTextForm: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.dkblue,
  },
  paragraphForm: {
    marginVertical: 8,
    lineHeight: 20,
  },
  containerForm: {
    flex: 1,
    padding: 20,
  },
  inputForm: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
  },
  modalToggle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    height: 65,
    width: 65,
    borderWidth: 1,
    color: "white",
    borderColor: colors.wheat,
    backgroundColor: colors.wheat,
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
});

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center"
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
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  listContainer: {
    marginTop: 20,
    padding: 20,
    borderColor: 'black'
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
    color: "#333333",
  },
  imageContainer: {
    height: 20,
    width: 20
  },
  petImage: {
    flexDirection: "row",
    padding: 10,
  }
});

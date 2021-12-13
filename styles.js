import { StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  sectionContainer: {
    flex: 15,
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  homecontainer: {
    flex: 1,
    padding: 2,
    flexDirection: "column"
  },
  maincontainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15 
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItemText1: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold"
  },
  listItemText2: {
    marginTop: 5,
    fontSize: 12,
  }
});
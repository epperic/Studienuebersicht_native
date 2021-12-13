import React from "react";
import { View } from 'react-native';
import { DataTable, Headline } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import firebase from '../database/firebaseDB';
import { styles } from "../styles";
import { fetchModules, ToDoModules } from "../services/Modulservice";
import { LoadingCircle } from "../components/LoadingCircle";

class ToDoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.firestoreRef = firebase.firestore().collection('modul');
    this.state = {
      isLoading: true,
      allModules: [],
      filteredModules: [],
      pickerOptions: ["1. Semester", "2. Semester", "3. Semester", "4. Semester", "5. Semester", "6. Semester", "7. Semester", "8. Semester"],
      currentSemester: 0
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getModules);
    this.focusListener = this.props.navigation.addListener("focus", () => {
      // The screen is focused
      this.setState({ currentSemester: 0 })
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.focusListener.remove();
  }

  getModules = (querySnapshot) => {
    const modules = fetchModules(querySnapshot);

    this.setState({
      allModules: modules,
      isLoading: false,
    });
  }

  setPickerValue(itemValue) {
    const filteredObjects = ToDoModules(this.state.allModules, itemValue)
    this.setState({
      currentSemester: itemValue,
      filteredModules: filteredObjects
    });
  }

  renderDataTableRows = () => {
    const rows = [];
    this.state.filteredModules.map((modul) => {
      rows.push(
        <DataTable.Row
          key={modul.id}
          onPress={() => {
            this.props.navigation.navigate('EditScreen', {
              id: modul.id
            });
          }}
        >
          <DataTable.Cell style={{ flex: 1 }}>{modul.semester}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 4 }}>{modul.name}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }} numeric >{modul.professor}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }} numeric >{modul.ects}</DataTable.Cell>
        </DataTable.Row>
      );
    });
    return rows;
  }

  renderPickerItems = () => {
    const items = [];
    this.state.pickerOptions.map((option, index) => {
      items.push(
        <Picker.Item key={index} label={option} value={index + 1} />
      );
    });
    return items;
  }

  render() {
    const { isLoading, currentSemester } = this.state;
    if (isLoading) {
      return <LoadingCircle />
    }
    if (currentSemester == 0) {
      return (
        <View style={styles.sectionContainer}>
          <Headline>In welchem Semester studierst du grade?</Headline>
          <Picker
            onValueChange={(itemValue) => this.setPickerValue(itemValue)}>
            {
              this.renderPickerItems()
            }
          </Picker>
        </View>
      );
    }
    return (
      <View>
        <View style={{ alignItems: 'center', marginTop: 15, marginBottom: 10 }}>
          <Headline>Diese Module musst du nachholen:</Headline>
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 1 }} >#</DataTable.Title>
            <DataTable.Title style={{ flex: 4 }} >Modul</DataTable.Title>
            <DataTable.Title style={{ flex: 2 }} >Professor</DataTable.Title>
            <DataTable.Title style={{ flex: 2 }} numeric>ECTS</DataTable.Title>
          </DataTable.Header>
          {this.renderDataTableRows()}
        </DataTable>
      </View>
    );
  }
}

export default ToDoScreen;
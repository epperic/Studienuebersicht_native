import React from "react";
import { ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import firebase from '../database/firebaseDB';
import { calcAllECTS, calcAverageGrade, fetchModules, onlyWithGrades } from "../services/Modulservice";
import { LoadingCircle } from "../components/LoadingCircle";

class LeistungenScreen extends React.Component {
  constructor(props) {
    super(props);
    this.firestoreRef = firebase.firestore().collection('modul');
    this.state = {
      isLoading: true,
      modules: [],
      allECTS: 0,
      avgGrade: 0
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getModules);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getModules = (querySnapshot) => {
    const modules = fetchModules(querySnapshot);
    const filteredObjects = onlyWithGrades(modules)
    const allECTS = calcAllECTS(filteredObjects);
    const avgGrade = calcAverageGrade(filteredObjects);

    this.setState({
      modules: filteredObjects,
      allECTS: allECTS,
      avgGrade: avgGrade,
      isLoading: false,
    });
  }

  renderDataTableRows = () => {
    const rows = [];
    this.state.modules.map((modul) => {
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
          <DataTable.Cell style={{ flex: 2 }} numeric >{modul.ects}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }} numeric >{modul.note.toFixed(1)}</DataTable.Cell>
        </DataTable.Row>
      );
    });
    return rows;
  }


  render() {
    const { allECTS, avgGrade, isLoading } = this.state;
    return !isLoading ?
      (
        <ScrollView>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ flex: 1 }} >#</DataTable.Title>
              <DataTable.Title style={{ flex: 4 }} >Modul</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }} numeric>ECTS: {allECTS}</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }} numeric>Note: {avgGrade.toFixed(2)}</DataTable.Title>
            </DataTable.Header>
            {this.renderDataTableRows()}
          </DataTable>
        </ScrollView>
      )
      : <LoadingCircle />
  }
}

export default LeistungenScreen;
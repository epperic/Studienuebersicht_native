import React from 'react';
import { List, FAB, Text } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import firebase from '../database/firebaseDB';
import { styles } from "../styles";
import { calcAverageGrade, fetchModules, splitIntoSemesters } from '../services/Modulservice';
import { LoadingCircle } from '../components/LoadingCircle';

class SemesterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.firestoreRef = firebase.firestore().collection('modul');
    this.state = {
      isLoading: true,
      allModules: [],
      semesters: []
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
    const semesters = splitIntoSemesters(modules);
    console.log(modules)
    this.setState({
      modulArr: modules,
      semesters: semesters,
      isLoading: false,
    });
  }

  renderAccordions = () => {
    const accordions = [];
    this.state.semesters.map((semester, index) => {
      let avgGrade = calcAverageGrade(semester)
      accordions.push(
        <List.Accordion
          key={index}
          title={`${index}. Semester                  Note: Ø ${avgGrade.toFixed(2)}`}
          left={props => <List.Icon {...props} icon="folder" />}
        >
          {
            semester.map((modul) => {
              return (
                <List.Item
                  key={modul.id}
                  left={() =>
                    <View>
                      <Text style={styles.listItemText1}> {modul.name} </Text>
                      <Text style={styles.listItemText2}> {modul.professor} </Text>
                    </View>
                  }
                  right={() =>
                    <View>
                      <Text style={styles.listItemText1}> Note: {modul.note.toFixed(1)} </Text>
                      <Text style={styles.listItemText2}> ECTS: {modul.ects} </Text>
                    </View>
                  }
                  onPress={() => {
                    this.props.navigation.navigate('EditScreen', {
                      id: modul.id
                    });
                  }} />
              );
            })
          }
        </List.Accordion>
      );
    });
    return accordions;
  }

  render() {
    return !this.state.isLoading ?
      (
        <View style={styles.container}>
          <ScrollView>
            {this.renderAccordions()}
          </ScrollView>
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => { this.props.navigation.navigate('AddScreen') }}
          />
        </View>
      ) 
      : <LoadingCircle />
  }
}

export default SemesterScreen;
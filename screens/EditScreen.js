import React from 'react';
import Form from '../components/Form';
import { LoadingCircle } from '../components/LoadingCircle';
import firebase from '../database/firebaseDB';

class EditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.dbRef = firebase.firestore().collection('modul').doc(this.props.route.params.id)
    this.state = {
      isLoading: true,
      modul: null
    };

    this.deleteModul = this.deleteModul.bind(this);
    this.firestoreUpdate = this.firestoreUpdate.bind(this);
  }

  componentDidMount() {
    this.dbRef.get().then((res) => {
      if (res.exists) {
        const modul = res.data();
        this.setState({
          isLoading: false,
          modul: {
            id: res.id,
            name: modul.name,
            professor: modul.professor,
            ects: modul.ects.toString(),
            note: modul.note.toString(),
            semester: modul.semester.toString(),
          }
        });
      } else {
        console.log("Modul existiert nicht!");
      }
    });
  }

  firestoreUpdate(modul) {
    this.setState({
      isLoading: true,
    });

    this.dbRef.set(modul).then((res) => {
      this.setState({
        isLoading: false
      });
      console.log('Modul "' + modul.name + '" wurde erfolgreich überschrieben.');
      this.props.navigation.navigate('BottomNavigation', { screen: 'Semesters' });
    })
      .catch((err) => {
        console.error("Fehler beim überschreiben eines Moduls in Firestore: ", err);
        this.setState({
          isLoading: false,
        });
      });
  }

  deleteModul() {
    this.dbRef.delete().then((res) => {
      console.log('Modul "' + this.state.modul.name + '" wurde aus der Datenbank entfernt.');
      this.props.navigation.goBack();
    })
  }


  render() {
    return !this.state.isLoading ? <Form modul={this.state.modul} isEdit={true} deleteModul={this.deleteModul} firestoreUpdate={this.firestoreUpdate} /> : <LoadingCircle />
  }
}

export default EditScreen;
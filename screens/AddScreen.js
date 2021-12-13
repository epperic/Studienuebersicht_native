import React from 'react';
import Form from '../components/Form';
import { LoadingCircle } from '../components/LoadingCircle';
import firebase from '../database/firebaseDB';


class AddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.dbRef = firebase.firestore().collection('modul');
    this.state = {
      isLoading: false,
    };
    this.firestoreSave = this.firestoreSave.bind(this);
  }

  firestoreSave(modul) {
    this.setState({
      isLoading: true,
    });

    this.dbRef.add(modul).then((res) => {
      this.setState({
        isLoading: false,
      });
      console.log('Modul "' + modul.name + '" wurde erfolgreich hinzugefügt.');
      this.props.navigation.navigate('BottomNavigation', { screen: 'Semesters' });
    })
      .catch((err) => {
        console.error("Fehler beim Hinzufügen eines Moduls in Firestore: ", err);
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    return !this.state.isLoading ? <Form firestoreSave={this.firestoreSave} /> : <LoadingCircle />
  }
}

export default AddScreen;
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDY0CfSpmYWZ5-r8KeCduX34efIL6EVpIs",
    authDomain: "studienuebersicht.firebaseapp.com",
    databaseURL: "https://studienuebersicht.firebaseio.com",
    projectId: "studienuebersicht",
    storageBucket: "studienuebersicht.appspot.com",
    messagingSenderId: "936765160627",
    appId: "1:936765160627:web:528543f33c1654d949c4c6"
};

app = firebase.initializeApp(firebaseConfig);
app.firestore().settings({ experimentalForceLongPolling: true });

export default firebase;
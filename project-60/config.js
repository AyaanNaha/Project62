import * as firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATtvS1rLlFRpG5KGswHAD8WtdUNwD8UuM",
  authDomain: "school-attendence-app-652b1.firebaseapp.com",
  databaseURL: "https://school-attendence-app-652b1-default-rtdb.firebaseio.com",
  projectId: "school-attendence-app-652b1",
  storageBucket: "school-attendence-app-652b1.appspot.com",
  messagingSenderId: "681744065852",
  appId: "1:681744065852:web:9b9a9102ae6c3255c9aa39",
  measurementId: "G-0M642HG9Y3"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase.database();
//Referenced Robin Wieruch

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDXJ9tOzCMP-1JA9z49OgWxjmF5SMzDCFw",
    authDomain: "sosth4.firebaseapp.com",
    databaseURL: "https://sosth4.firebaseio.com",
    projectId: "sosth4",
    storageBucket: 'sosth4.appspot.com',
    messagingSenderId: "1051824348732",
    appId: "1:1051824348732:web:3021f949a569149652ed39"
  };
 
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();
 
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
   
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

    user = uid => this.db.ref(`users/${uid}`);
 
    users = () => this.db.ref('users');
}
 
export default Firebase;
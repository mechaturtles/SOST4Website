//Referenced Robin Wieruch

import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD8OcBTcbv9xpszlZteyTZt_S1iT0ltfXQ",
    authDomain: "telehealth-8b8c1.firebaseapp.com",
    databaseURL: "https://telehealth-8b8c1.firebaseio.com",
    projectId: "telehealth-8b8c1",
    storageBucket: '',
    messagingSenderId: "962082039829",
  };
 
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();
 
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
   
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);
}
 
export default Firebase;
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
require('dotenv').config();

//Keys are stored in a .env file, so adding one is recommended over changing the following.
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  };

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }

    // Auth API methods

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
        if (authUser) {
            this.user(authUser.uid)
            .once('value')
            .then(snapshot => {
                const dbUser = snapshot.val();
    
                // default empty roles
                if (dbUser){
                if(!dbUser.role){
                    dbUser.role = {};
                }}
    
                // merge auth and db user
                authUser = {
                uid: authUser.uid,
                email: authUser.email,
                ...dbUser,
                };
    
                next(authUser);
            });
        } else {
            fallback();
        }
        });

    // User API methods

    user = uid => this.db.ref(`mountainHealth/users/${uid}`);

    users = () => this.db.ref('mountainHealth/users');
}

export default Firebase;
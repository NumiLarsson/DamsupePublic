import fb from 'firebase';

const config = {
    apiKey: "AIzaSyCn_Liz4rzXjUlxEHwOB5SCZeErJrYjkxM",
    authDomain: "smalands-events.firebaseapp.com",
    databaseURL: "https://smalands-events.firebaseio.com",
    storageBucket: "smalands-events.appspot.com",
    messagingSenderId: "18567849572"
  };

const RESULT = {
    SUCCESS: 'success'
}

const EMAIL_LOGIN_ERRORS = {
    'auth/invalid-email' : 'Invalid email address',
    'auth/user-disabled' : 'Account disabled',
    'auth/user-not-found': 'User does not exist',
    'auth/wrong-password': 'Wrong password'
}

const FACEBOOK_LOGIN_ERRORS = {
    'auth/account-exists-with-different-credential' : 'A regular account with the same email already exists',
    'auth/credential-already-in-use' : 'Account already exist',
    'auth/email-already-in-use' : 'Email is already in use by another account',
    'auth/timeout' : 'Request timed out'
}


class Api {

    constructor() {

        if (! Api.instance) {
            Api.instance = this;
        }

        return Api.instance;
    }

    initialize() {
        fb.initializeApp(config);
    }

    /** 
     * AUTHENTICATION
    */

    getCurrentUser() {
        return fb.auth().currentUser;
    }

    listenForAuthChanges(signedIn, signedOut) {
        fb.auth().onAuthStateChanged((user) => {
            if (user) {
                signedIn(user);
            } else {
                signedOut();
            } 
        });
    }

    signInWithEmail(email, password) {
        return new Promise((resolve, reject) => {
            fb.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                resolve(RESULT.SUCCESS);
            })
            .catch((error) => {
                let err = EMAIL_LOGIN_ERRORS[error.code] || 'Network error';
                reject(err);
            })
        })
    }

    //Todo: Add error handling
    signInWithFacebook() {
        const provider = new fb.auth.FacebookAuthProvider();
        fb.auth().signInWithRedirect(provider)
    }

    getRedirectResult() {
        return new Promise((resolve, reject) => {
            fb.auth().getRedirectResult().then((result) => {
                resolve(result);
            })
            .catch((error) => {
                let err = FACEBOOK_LOGIN_ERRORS[error.code] || 'Unknown error, contact support';
                reject(err);
            })
        })
    }
    

    signOut() {
        return new Promise((resolve, reject) => {
            fb.auth().signOut()
            .then(() => {
                resolve(RESULT.SUCCESS);
            }).catch((error) => {
                reject(error);
            })
        })
    }

}

const api = new Api();
Object.freeze(api);

export default api;
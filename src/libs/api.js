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
                reject(error);
            })
        })
    }

    signInWithFacebook() {
        const provider = new fb.auth.FacebookAuthProvider();
        fb.auth().signInWithRedirect(provider)
    }

    getRedirectResult() {
        fb.auth().getRedirectResult().then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
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
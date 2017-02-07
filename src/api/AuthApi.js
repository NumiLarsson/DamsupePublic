

const RESULT = {
    SUCCESS: 'success'
}

const EMAIL_LOGIN_ERRORS = {
    'auth/invalid-email' : 'Invalid email address',
    'auth/user-disabled' : 'Account disabled',
    'auth/user-not-found': 'User does not exist',
    'auth/wrong-password': 'Wrong password'
}

const ACCOUNT_CREATION_ERRORS = {
    'auth/email-already-in-use': 'Email already in use',
    'auth/invalid-email': 'Invalid email address',
    'auth/operation-not-allowed': 'Unknown error',
    'auth/weak-password': 'Need a stronger password'
}

const FACEBOOK_LOGIN_ERRORS = {
    'auth/account-exists-with-different-credential' : 'A regular account with the same email already exists',
    'auth/credential-already-in-use' : 'Account already exist',
    'auth/email-already-in-use' : 'Email is already in use by another account',
    'auth/timeout' : 'Request timed out'
}

export default class AuthApi {

    constructor(auth) {
        this.auth = auth;
    }

    getCurrentUser() {
        return this.auth().currentUser;
    }

    listenForAuthChanges(signedIn, signedOut) {
        this.auth().onAuthStateChanged((user) => {
            if (user) {
                signedIn(user);
            } else {
                signedOut();
            } 
        });
    }

    signInWithEmail(email="", password="") {
        let self = this;
        return new Promise((resolve, reject) => {
            self.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                resolve(RESULT.SUCCESS);
            })
            .catch((error) => {
                let err = EMAIL_LOGIN_ERRORS[error.code] || 'Network error';
                reject(err);
            })
        })
    }

    createUser(email="", password="") {
        let self = this;
        return new Promise((resolve, reject) => {
            self.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                resolve(RESULT.SUCCESS);
            })
            .catch(error => {
                let err = ACCOUNT_CREATION_ERRORS[error.code] || 'Network error';
                reject(err);
            })
        })
    }    

    //Todo: Add error handling
    signInWithFacebookRedirect() {
        const provider = new this.auth.FacebookAuthProvider();
        this.auth().signInWithRedirect(provider)
    }

    getRedirectResult() {
        let self = this;
        return new Promise((resolve, reject) => {
            self.auth().getRedirectResult().then((result) => {
                resolve(result);
            })
            .catch((error) => {
                let err = FACEBOOK_LOGIN_ERRORS[error.code] || 'Unknown error, contact support';
                reject(err);
            })
        })
    }
    

    signOut() {
        let self = this;
        return new Promise((resolve, reject) => {
            self.auth().signOut()
            .then(() => {
                resolve(RESULT.SUCCESS);
            }).catch((error) => {
                reject(error);
            })
        })
    }
}
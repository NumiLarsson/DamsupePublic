

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

/**
 * Authentication API.
 */
export default class AuthApi {

    constructor(auth) {
        this.auth = auth;
        this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    /**
     * Get the currently signed in user.
     * @returns Firebase user object representing the currently signed in user or null.
     */
    getCurrentUser() {
        return this.auth().currentUser;
    }

    /**
     * Listen for changes in Authentication status.
     * @param {function} signedIn - Function to call when a user has signed in.
     * @param {function} signedOut - Function to call when a user has signed out.
     */
    listenForAuthChanges(signedIn, signedOut) {
        this.auth().onAuthStateChanged((user) => {
            if (user) {
                signedIn(user);
            } else {
                signedOut(user);
            } 
        });
    }

    /**
     * Sign in user email/password.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns Promise resolving to a success message and rejecting with an error.
     */
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

    /**
     * Create an email/password user.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns Promise resolving to a user object and rejecting with an error.
     */
    createUser(email="", password="") {
        let self = this;
        return new Promise((resolve, reject) => {
            self.auth().createUserWithEmailAndPassword(email, password)
            .then( (user) => {
                //Returning a user to assign name with api.user.createUserIfNotExist.                
                resolve(user);
            })
            .catch(error => {
                let err = ACCOUNT_CREATION_ERRORS[error.code] || 'Network error';
                reject(err);
            })
        })
    }    

    /**
     * Sign in using Facebook redirect.
     */
    signInWithFacebookRedirect() {
        const provider = new this.auth.FacebookAuthProvider();
        this.auth().signInWithRedirect(provider)
    }

     /**
     * Get the result of a Facebook redirect.
     * @returns Promise resolving to a Firebase user object and rejecting with an error.
     */
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
    
     /**
     * Sign out of the application
     * @returns Promise resolving to a success message and rejecting with an error.
     */
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
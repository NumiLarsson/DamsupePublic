

export default class UserApi {

    constructor(database) {
        this.database = database;
        this.subscriptions = {};
    }

    /**
     * Create a user if it does not exist.
     * @param {object} user - Firebase user object.
     * @returns Promise resolving to a bool representing success and rejecting with an error.
     */
    createUserIfNotExists(user) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.database().ref(`/users/${user.uid}`).once('value')
            .then(snapshot => {
                if(!snapshot.val()) {
                    let newUser = {};
                    newUser.email = user.email;
                    newUser.name = user.displayName || null;
                    self.database().ref(`/users/${user.uid}`).set(newUser);
                }
                resolve(true);
            })
            .catch(err => {
                reject(err);
            })
        })
    }


    /**
     * Subscribe to data about the user.
     * @param {string} uid - ID of the user.
     * @param {function} cb - Function to call when the data changes.
     */    
    subscribeToUserData(uid, cb) {
        let ref = this.database().ref(`/users/${uid}`);
        ref.on('value', (snapshot) => {
            cb(snapshot.val());
        });
        this.subscriptions[uid] = ref;
    }

    /**
    * Clear all subscriptions.
    */    
    clearSubscriptions() {
        for (var key in this.subscriptions) {
            if (this.subscriptions.hasOwnProperty(key)) {
                this.subscriptions[key].off();
            }
        }
    }
}
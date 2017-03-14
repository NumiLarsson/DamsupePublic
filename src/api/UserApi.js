import Immutable from 'immutable';

export default class UserApi {

    constructor(database) {
        this.database = database;
        this.subscriptions = Immutable.Map();
        this.createUserIfNotExists = this.createUserIfNotExists.bind(this);
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
     * Get the id of the event last visited by the user.
     * @param {string} uid - ID of the user.
     */   
     getLastVisitedEvent(uid) {
         let self = this;

         return new Promise((resolve, reject) => {
             self.database().ref(`/users/${uid}/lastVisitedEvent`).once('value')
             .then(snapshot => {
                 let val = snapshot.val();
                 if (val) {
                     resolve(val);
                 } else {
                     reject('No value');
                 }
             })
             .catch(err => {
                 reject(err);
             })
         })
     }


     //TODO: Fix, use callback function instead of promise.
    /**
     * Save the event last visited by the user.
     * @param {string} uid - ID of the user.
     * @param {string} eventId - Id of the event.
     */
     setLastVisitedEvent(uid, eventId) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.database().ref(`users/${uid}/lastVisitedEvent`).set(eventId)
            .then(() => {
                resolve('SUCCESS');
            })
            .catch(err => {
                reject(err);
            })
        })
     }
        
    /**
     * Update user information
     * @param {string} uid - ID of the user.
     * @param {string} name - Data object.
     * @param {function} cb - Function to call on success.
     */   
     updateUserData(uid, data, cb) {
        let updates = {};

        if (data.email) {
            updates[`users/${uid}/email`] = data.email;
        }

        if (data.name) {
            updates[`users/${uid}/name`] = data.name;
        }

        this.database().ref().update(updates, cb);
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
        return ref;
    }

    /**
    * Clear all subscriptions.
    */    
    clearSubscriptions() {
         this.subscriptions.toList().forEach(ref => {
            ref.off();
        });  
    }
}



export default class UserApi {

    constructor(database) {
        this.database = database;
    }

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

    subscribeToUserData(uid, cb) {
        this.database().ref(`/users/${uid}`).on('value', (snapshot) => {
            cb(snapshot.val());
        })
    }

    unsubscribeToUserData(uid) {
        this.database().ref(`/users/${uid}`).off();
    }

    checkIfUserHasPreviousEvent(uid) {
        let self = this;
        
        return new Promise((resolve, reject) => {
            self.database().ref(`/users/${uid}/lastVisitedEvent`).once('value')
            .then(snapshot => {
                resolve(snapshot.val());
            })
            .catch(err => {
                reject(err);
            })
        })
    }

}
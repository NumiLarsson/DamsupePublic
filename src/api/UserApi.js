

export default class UserApi {

    constructor(database) {
        this.database = database;
        this.subscriptions = {};
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
        let ref = this.database().ref(`/users/${uid}`);
        ref.on('value', (snapshot) => {
            cb(snapshot.val());
        });
        this.subscriptions[uid] = ref;
    }

    clearSubscriptions(uid) {
        for (var key in this.subscriptions) {
            if (this.subscriptions.hasOwnProperty(key)) {
                this.subscriptions[key].off();
            }
        }
    }
}
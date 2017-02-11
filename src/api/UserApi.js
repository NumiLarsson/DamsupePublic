

export default class UserApi {

    constructor(database) {
        this.database = database;
    }

    createUserIfNotExists(user) {
        let self = this;
        console.log(user);
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

}
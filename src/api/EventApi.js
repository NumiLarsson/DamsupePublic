

export default class EventApi {

    constructor(database) {
        this.database = database;
        this.subscriptions = {};
    }

     subscribeToEvent(event, cb) {
        let ref = this.database().ref(`/events/${event}`);
        ref.on('value', (snapshot) => {
            if(snapshot.val()) {
                cb(snapshot.val());
            } 
        });
        this.subscriptions[event] = ref;
    }

    subscribeToUserEventData(event, uid, cb) {
        let ref = this.database().ref(`/userEventData/${event}/${uid}`);
        ref.on('value', (snapshot) => {
            cb(snapshot.val());
        })
        let key = `userEventData_${event}`
        this.subscriptions[key] = ref;
    }

    clearSubscriptions() {
        for (var key in this.subscriptions) {
            if (this.subscriptions.hasOwnProperty(key) && this.subscriptions[key]) {
                this.subscriptions[key].off();
                this.subscriptions[key] = null;
            }
        }
    }

    saveUserData(event, uid, values) {
        let self = this;
        return new Promise((resolve, reject) => {
            const {name, table} = values;
            let updates = {};
            updates[`/users/${uid}/name`] = name;
            updates[`/userEventData/${event}/${uid}/table`] = table || null;
            self.database().ref().update(updates)
            .then(() => {
                resolve('SUCCESS');
            })
            .catch(err => {
                reject(err);
            });
        })

    }

}
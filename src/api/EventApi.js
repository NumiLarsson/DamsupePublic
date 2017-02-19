
/**
 * Event API.
 */
export default class EventApi {

    constructor(database) {
        this.database = database;
        this.subscriptions = {};
    }

    /**
     * Subscribe to information about an event.
     * @param {string} eventId - ID of the event.
     * @param {function} cb - Callback function, called when the event changes.
     */
     subscribeToEvent(eventId, cb) {
        let ref = this.database().ref(`/events/${eventId}`);
        ref.on('value', (snapshot) => {
            if(snapshot.val()) {
                cb(snapshot.val());
            } 
        });
        let key = `eventData_${eventId}`;
        this.subscriptions[key] = ref;
    }

    /**
     * Subscribe to user data connected to an event.
     * @param {string} eventId - ID of the event.
     * @param {string} uid - ID of the user.
     * @param {function} cb - Callback function, called when the data changes.
     */
    subscribeToUserEventData(eventId, uid, cb) {
        let ref = this.database().ref(`/userEventData/${eventId}/${uid}`);
        ref.on('value', (snapshot) => {
            cb(snapshot.val());
        })
        let key = `userEventData_${eventId}`
        this.subscriptions[key] = ref;
    }

    /**
     * Clear all subscriptions.
     */
    clearSubscriptions() {
        for (var key in this.subscriptions) {
            if (this.subscriptions.hasOwnProperty(key) && this.subscriptions[key]) {
                this.subscriptions[key].off();
                this.subscriptions[key] = null;
            }
        }
    }

    /**
     * Save user data.
     * @param {string} eventId - ID of the event.
     * @param {string} uid - ID of the user.
     * @param {object} values - Object containing the values to be saved.
     * @returns Promise resolving to a success message and rejecting with an error.
     */
    saveUserData(eventId, uid, values) {
        let self = this;
        return new Promise((resolve, reject) => {
            const {name, table} = values;
            let updates = {};
            updates[`/users/${uid}/name`] = name;
            updates[`/userEventData/${eventId}/${uid}/table`] = table || null;
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
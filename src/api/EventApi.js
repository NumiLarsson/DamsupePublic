/**
 * Event API.
 */
export default class EventApi {

    constructor(database) {
        this.database = database;
        this.subscribeToEvents = this.subscribeToEvents.bind(this);
        this.getEvents = this.getEvents.bind(this);
    }

    /**
     * Subscribe to information about an event.
     * @param {string} eventId - ID of the event.
     * @param {function} cb - Callback function, called when the event changes.
     */
     subscribeToEvent(eventId, cb) {
        
        let ref = this.database().ref(`/events/${eventId}`);
        ref.on('value', snapshot => {
            if(snapshot.val()) {
                cb(snapshot.val());
            } 
        });
        return ref;
    }

    /**
     * Subscribe to receive store items.
     * @param {string} eventId - ID of the event.
     * @param {function} added - Function to call when a store item is added.
     * @param {function} changed - Function to call when a store item has changed.
     * @param {function} removed - Function to call when a store item is removed.
     */
     subscribeToEventStoreItems(eventId, added, changed, deleted) {
        let ref = this.database().ref(`/eventStoreItems/${eventId}`);

        ref.on('child_added', (snapshot) => {
            added(snapshot.val());
        });
        
        ref.on('child_changed', (snapshot) => {
            changed(snapshot.val());
        });
        
        ref.on('child_removed', (snapshot) => {
            deleted(snapshot.val());
        });
        
        return ref;
    }

    /**
     * Subscribe to receive store items.
     * @param {object} order - Order object.
     * @param {function} added - Function to call when the order has been pushed to the database.
     */
    placeOrder(order, callback) {
        order.created = this.database.ServerValue.TIMESTAMP;
        
        this.database().ref('orders/tasks').push({order}, () => {
            callback();
        });
    }

     /**
     * Subscribe to the access status of a user for the selected event.
     * @param {string} uid - ID of the user.
     * @param {string} eventId - ID of the event.
     * @param {function} cb - Function to call when the status changes.
     */
     subscribeToEventAccessStatus(uid, eventId, cb) {
        let ref = this.database().ref(`userEventParticipations/${uid}/${eventId}`);
        ref.on('value', snapshot => {
            cb(snapshot.val());
        })
        return ref;
     }


    /**
     * Subscribe to user data connected to an event.
     * @param {string} eventId - ID of the event.
     * @param {string} uid - ID of the user.
     * @param {function} cb - Callback function, called when the data changes.
     */
    subscribeToUserEventData(eventId, uid, cb) {
        let ref = this.database().ref(`/userEventData/${uid}/${eventId}`);
        ref.on('value', (snapshot) => {
            cb(snapshot.val());
        })
        return ref;
    }

    /**
     * Save user data.
     * @param {string} eventId - ID of the event.
     * @param {string} uid - ID of the user.
     * @param {object} values - Object containing the values to be saved.
     * @returns Promise resolving to a success message and rejecting with an error.
     */
    saveUserEventData(eventId, uid, values) {
        const {table} = values;
        let updates = {};
        updates[`/userEventData/${uid}/${eventId}/table`] = table || null;
        this.database().ref().update(updates)
    }

    /**
     * Subscribe to all events
     */
    subscribeToEvents(added, changed, deleted) {
        let ref = this.database().ref('/events/');

        ref.on('child_added', (snapshot) => {
            added(snapshot.val());
        })
        
        ref.on('child_changed', (snapshot) => {
            changed(snapshot.val());
        })
        
        ref.on('child_removed', (snapshot) => {
            deleted(snapshot.val());
        })
        
        return ref;
    }

    getEvents() {
        let self = this;
        return new Promise((resolve, reject) => {
            self.database().ref('/events').once('value')
            .then(snapshot => {
                resolve(snapshot.val());
            })
            .catch(err => {
                reject(err);
            })
        })
    }

}


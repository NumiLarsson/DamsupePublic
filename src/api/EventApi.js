import Immutable from 'immutable';
/**
 * Event API.
 */
export default class EventApi {

    constructor(database) {
        this.database = database;
        this.eventSubscriptions = Immutable.Map();
        this.eventUserSubscriptions = Immutable.Map();
        this.eventAccessSubscription = Immutable.Map();
        this.eventListSubscription = null;
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
        let key = `event_${eventId}`;
        this.eventSubscriptions.set(key, ref);
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
        let key = `userEventAccess_${uid}_${eventId}`;
        this.eventAccessSubscription.set(key, ref);
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
        let key = `userEventData_${uid}_${eventId}`;
        this.eventUserSubscriptions.set(key, ref);
    }

    /**
     * Clear all subscriptions related to the user related data of an event..
     */
    clearEventUserSubscriptions() {
        this.eventUserSubscriptions.toList().forEach(ref => {
            ref.off();
        })        
    }

    /**
     * Clear the subscriptions to user access to an event.
     */
    clearEventUserAccessSubscriptions() {
        this.eventAccessSubscription.toList().forEach(ref => {
            ref.off();
        })        
    }


     /**
     * Clear all event subscriptions
     */
    clearEventSubscriptions() {
        this.eventSubscriptions.toList().forEach(ref => {
            ref.off();
        })        
    }

    /**
     * Save user data.
     * @param {string} eventId - ID of the event.
     * @param {string} uid - ID of the user.
     * @param {object} values - Object containing the values to be saved.
     * @returns Promise resolving to a success message and rejecting with an error.
     */
    saveUserEventData(eventId, uid, values) {
        let self = this;
        return new Promise((resolve, reject) => {
            const {table} = values;
            let updates = {};
            updates[`/userEventData/${uid}/${eventId}/table`] = table || null;
            self.database().ref().update(updates)
            .then(() => {
                resolve('SUCCESS');
            })
            .catch(err => {
                reject(err);
            });
        })

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
        
        if(this.eventListSubscription) {
            this.eventListSubscription.off();
        }
        

        this.eventListSubscription = ref;
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


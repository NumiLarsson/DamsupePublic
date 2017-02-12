

export default class EventApi {

    constructor(database) {
        this.database = database;
        this.subscriptions = {};
    }

     subscribeToEvent(event, cb) {
        let ref = this.database().ref(`/events/${event}`);
        ref.on('value', (snapshot) => {
            if(snapshot) {
                cb(snapshot.val());
            } 
        });
        this.subscriptions[event] = ref;
    }

    clearSubscriptions() {
        for (var key in this.subscriptions) {
            if (this.subscriptions.hasOwnProperty(key)) {
                this.subscriptions[key].off();
            }
        }
    }

}
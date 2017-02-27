module.exports = {
    path: 'eventlist',

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./containers/EventList'));
        });
    }
}

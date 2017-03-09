module.exports = {
    path: 'event/:eventId',

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./containers/EventMenu'));
        });
    }
}

module.exports = {
    path: 'app',

    getChildRoutes(partialNextState, cb) {
        require.ensure([], (require) => {
        cb(null, [
            require('./routes/Event'),
            require('./routes/EventList'),
            require('./routes/Login'),
            require('./routes/Register'),
            require('./routes/User')
        ])
        })
    },

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./containers/MainContainer'));
        });
    }
}

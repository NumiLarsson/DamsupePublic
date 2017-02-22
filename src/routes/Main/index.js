import api from '../../api/Api';

module.exports = {
    path: 'main',

    onEnter: (nextState, replace) => {
        if (!api.auth.getCurrentUser()) {
            replace('/');
        }
    },

    getChildRoutes(partialNextState, cb) {
        require.ensure([], (require) => {
        cb(null, [
            require('./routes/Event'),
            require('./routes/EventList')
        ])
        })
    },

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./containers/MainContainer'));
        });
    }
}

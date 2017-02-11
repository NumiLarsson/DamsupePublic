import api from '../../api/Api';

module.exports = {
    path: 'main',

    onEnter: (nextState, replace) => {
        if (!api.auth.getCurrentUser()) {
            replace('/login');
        }
    },

    getChildRoutes(partialNextState, cb) {
        require.ensure([], (require) => {
        cb(null, [
            require('./routes/EventList')
        ])
        })
    },

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/Main'));
        });
    }
}

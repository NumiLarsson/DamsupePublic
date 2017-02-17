import api from '../../api/Api';

module.exports = {
    path: 'main',

    onEnter: (nextState, replace) => {
        if (!api.auth.getCurrentUser()) {
            replace('/');
        }
    },

    getIndexRoute(partialNextState, callback) {
            require.ensure([], function (require) {
            callback(null, {
                component: require('./routes/Menu/containers/MainMenu'),
            })
        })
    },

    getChildRoutes(partialNextState, cb) {
        require.ensure([], (require) => {
        cb(null, [
        ])
        })
    },

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./containers/MainContainer'));
        });
    }
}

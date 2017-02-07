import api from '../../api/Api';

module.exports = {
    path: 'register',

    onEnter: (nextState, replace) => {
        if (api.auth.getCurrentUser()) {
            replace('/main');
        }
    },

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/Register'));
        });
    }
}

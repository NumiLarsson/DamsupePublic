import api from '../../api/Api';

module.exports = {
    path: 'login',

    onEnter: (nextState, replace) => {
        if (api.auth.getCurrentUser()) {
            replace('/main');
        }
    },

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./containers/LoginContainer'));
        });
    }
}

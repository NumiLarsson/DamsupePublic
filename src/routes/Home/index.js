
import Home from './components/Home';

module.exports = {
    path: '/home',

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, Home);
        });
    }
}

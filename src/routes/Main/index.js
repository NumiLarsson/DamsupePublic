
import Main from './components/Main';

module.exports = {
    path: 'main',

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, Main);
        });
    }
}


module.exports = {
    path: 'main',

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/Main'));
        });
    }
}

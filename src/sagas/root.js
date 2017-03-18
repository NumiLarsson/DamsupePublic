import storeSaga from './store';
import eventSaga from './event';
import authSaga from './auth';

export default function* rootSaga() {
  yield [
    storeSaga(),
    eventSaga(),
    authSaga()
  ]
}
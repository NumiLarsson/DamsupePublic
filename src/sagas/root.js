import storeSaga from './store';
import eventSaga from './event';

export default function* rootSaga() {
  yield [
    storeSaga(),
    eventSaga()
  ]
}
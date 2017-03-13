import storeSaga from './store';

export default function* rootSaga() {
  yield [
    storeSaga()
  ]
}
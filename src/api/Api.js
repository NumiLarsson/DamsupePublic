import fb from 'firebase';
import AuthApi from './AuthApi';
import UserApi from './UserApi';

const config = {
    apiKey: "AIzaSyCn_Liz4rzXjUlxEHwOB5SCZeErJrYjkxM",
    authDomain: "smalands-events.firebaseapp.com",
    databaseURL: "https://smalands-events.firebaseio.com",
    storageBucket: "smalands-events.appspot.com",
    messagingSenderId: "18567849572"
  };

fb.initializeApp(config);

class Api {

    auth = new AuthApi(fb.auth);
    user = new UserApi(fb.database);

    constructor() {
        if (! Api.instance) {
            Api.instance = this;
        }
        return Api.instance;
    }
}

const api = new Api();
Object.freeze(api);

export default api;
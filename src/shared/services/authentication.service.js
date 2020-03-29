import { BehaviorSubject } from 'rxjs';

import config from '../api/config';
import history from '../functions/history';
import handleResponse from '../functions/handleResponse';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

const authenticationService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

function register({ firstName, lastName, email, username, images, password }) {
    let data = new FormData();
    data.append('first_name', firstName);
    data.append('last_name', lastName);
    data.append('email', email);
    data.append('username', username);
    data.append('password', password);

    for (let [index, image] of Object.entries(images)) {
        data.append(`file${index}`, image);
    }

    const requestOptions = {
        method: 'POST',
        /*headers: { 'Content-Type': 'application/json' },*/
        // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: data,
        //body: JSON.stringify({ first_name: firstName, last_name: lastName, email, username, images, password })
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            //history.push('/login');

            return user;
        });
}

export default authenticationService;
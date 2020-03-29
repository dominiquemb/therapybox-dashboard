import config from '../api/config';
import authHeader from '../functions/authHeader';
import handleResponse from '../functions/handleResponse';

const userService = {
    getAll,
    getById,
    getImages,
    getTasks,
    addImages,
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function getImages(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users/${id}/images`, requestOptions).then(handleResponse);
}

function getTasks(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users/${id}/tasks`, requestOptions).then(handleResponse);
}

function addImages({ id, images }) {
    let data = new FormData();
    data.append('id', id);

    for (let [index, image] of Object.entries(images)) {
        data.append(`file${index}`, image);
    }

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: data,
    };

    return fetch(`${config.apiUrl}/users/${id}/images`, requestOptions)
        .then(handleResponse)
        .then(images => {
            return images;
        });
}

export default userService;
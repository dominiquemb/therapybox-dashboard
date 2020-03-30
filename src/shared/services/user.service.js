import config from '../api/config';
import authHeader from '../functions/authHeader';
import handleResponse from '../functions/handleResponse';

const userService = {
    getAll,
    getById,
    getImages,
    getTasks,
    addImages,
    addTask,
    updateTask,
    getClothes,
    getSportsNews,
    getLosingTeams,
    getNews,
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

function getClothes(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/dashboard/${id}/clothes`, requestOptions).then(handleResponse);
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

function addTask({ id, task }) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, task })
    };

    return fetch(`${config.apiUrl}/users/${id}/task`, requestOptions)
        .then(handleResponse)
        .then(images => {
            return images;
        });
}

function updateTask({ id, task }) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, task })
    };

    return fetch(`${config.apiUrl}/users/${id}/task/${task.id}`, requestOptions)
        .then(handleResponse)
        .then(images => {
            return images;
        });
}

function getSportsNews() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    return fetch(`${config.apiUrl}/dashboard/sportsnews`, requestOptions)
        .then(handleResponse)
        .then(sportsnews => {
            return sportsnews;
        });
}

function getLosingTeams(winningTeam) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    return fetch(`${config.apiUrl}/dashboard/sportslosers?team=${winningTeam}`, requestOptions)
        .then(handleResponse)
        .then(teams => {
            return teams;
        });
}

function getNews() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    return fetch(`${config.apiUrl}/dashboard/news`, requestOptions)
        .then(handleResponse)
        .then(news => {
            return news;
        });
}


export default userService;
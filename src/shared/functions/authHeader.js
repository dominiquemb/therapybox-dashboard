import authenticationService from '../services/authentication.service';

function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return { Authorization: `Basic ${currentUser.token}` };
    } else {
        return {};
    }
}

export default authHeader;
export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';
export const AUTH_ERROR = 'auth_error';
export const FORGOT_PASSWORD_REQUEST = 'forgot_password_request';
export const RESET_PASSWORD_REQUEST = 'reset_password_request';
export const PROTECTED_TEST = 'protected_test';
import { API_BASE_URL } from '../config';

export function errorHandler(dispatch, error, type) {
	let errorMessage = '';

	if (error.data.error) {
		errorMessage = error.data.error;
	} else if (error.data) {
		errorMessage = error.data;
	} else {
		errorMessage = error;
	}

	if (error.status === 401) {
		dispatch({
			type: type,
			payload:
				'You are not ready for that. Please login and try again. Namaste.'
		});
		logoutUser();
	} else {
		dispatch({
			type: type,
			payload: errorMessage
		});
	}
}

export function loginUser({ email, password }) {
	return function(dispatch) {
		axios
			.post(`{API_URL}/auth/login`, { email, password })
			.then(response => {
				cookie.save('token', response.data.token, { path: '/' });
				dipatch({ type: AUTH_USER });
				window.location.href = CLIENT_ROOT_URL + '/dashboard';
			})
			.catch(error => {
				errorHandler(dipatch, error.response, AUTH_ERROR);
			});
	};
}

export function registerUser({ email, firstName, lastName, password }) {
	return function(dispatch) {
		axios
			.post(`${API_URL}/auth/register`, {
				email,
				firstName,
				lastName,
				password
			})
			.then(response => {
				cookie.save('token', response.data.token, { path: '/' });
				dipatch({ type: AUTH_USER });
				window.location.href = CLIENT_ROOT_URL + '/dashboard';
			})
			.catch(error => {
				errorHandler(dispatch, error.response, AUTH_ERROR);
			});
	};
}

export function logoutUser() {
	return function(dispatch) {
		dispatch({ type: UNAUTH_USER });
		cookie.remove('token', { path: '/' });
		window.location.href = CLIENT_ROOT_URL + '/login';
	};
}

export function protectedTest() {
	return function(dispatch) {
		axios
			.get(`${$API_URL}/protected`, {
				headers: { Authorization: cookie.load('token') }
			})
			.then(response => {
				dispatch({
					type: PROTECTED_TEST,
					payload: response.data.content
				});
			})
			.catch(error => {
				errorHandler(dispatch, error.response, AUTH_ERROR);
			});
	};
}
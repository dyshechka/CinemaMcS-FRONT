import qs from 'querystring';
import {baseUrlApi, authHeader, userInfoApi} from '../api';
import apiConfig from '../api/config';
import axios from "axios";

const loginApi = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
        username: apiConfig.client.id,
        password: apiConfig.client.secret
    }
});

export const signIn = (username, password) => dispatch => {
    const data = qs.stringify({username, password, grant_type: 'password'});
    loginApi.post('/oauth/token', data, authHeader()).then(res => {
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        dispatch({
            type: 'AUTHORIZATION_SUCCESS'
        });
        userInfoApi.get('/users/userInfo', authHeader()).then(res => {
            dispatch({
                type: 'CURRENT_ACCOUNT_LOADED',
                data: res.data
            })
        });
    }).catch(reason => {
        dispatch({
            type: 'AUTHORIZATION_FAILED',
            error: reason.response.data.error_description
        });
    })
};

export const signUp = (account) => dispatch => {
    userInfoApi.post('/users/create', account).then(() => {
        dispatch({
            type: 'SIGN_UP_SUCCESSFUL'
        });
    }).catch(() => {
        dispatch({
            type: 'SIGN_UP_FAILED'
        });
    })
};

export const resetSignUpStatus = () => dispatch => {
    dispatch({
        type: 'SIGN_UP_STATUS_RESET'
    });
};

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    dispatch({
        type: 'LOGOUT'
    })
};

export const loadAccount = () => dispatch => {
    userInfoApi.get('/users/userInfo', authHeader()).then(res => {
        dispatch({
            type: 'CURRENT_ACCOUNT_LOADED',
            data: res.data
        })
    });
};
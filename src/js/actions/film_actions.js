import {authHeader, baseUrlApi} from "../api";

export const loadFilmsForCurrentDay = () => dispatch => {
    let currentDate = new Date();
    baseUrlApi.get('/film-service/films?dateTime=' + currentDate.getTime(), authHeader()).then(res => {
        dispatch({
            type: 'TODAY_FILMS_LOADED',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const loadFilmsForDate = (date) => dispatch => {
    baseUrlApi.get('/film-service/films?dateTime=' + date, authHeader()).then(res => {
        dispatch({
            type: 'FILMS_LOADED',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const loadMostExpectedFilms = () => dispatch => {
    baseUrlApi.get('/film-service/getMostExpectedFilms', authHeader()).then(res => {
        dispatch({
            type: 'EXPECTED_FILMS_LOADED',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};
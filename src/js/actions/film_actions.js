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
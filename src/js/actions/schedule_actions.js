import {authHeader, baseUrlApi} from "../api";

export const loadSeancesForDateAndHall = (date, hallId) => dispatch => {
    baseUrlApi.get('/seance-service/seancesByDateAndHall/?date=' + date + "&hallId=" + hallId, authHeader()).then(res => {
        dispatch({
            type: 'SEANCES_FOR_DATE_AND_HALL',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const getFilmsByIds = (data) => dispatch => {
    baseUrlApi.post('/film-service/filmByIds', data, authHeader()).then(res => {
        dispatch({
            type: 'FILMS_FOR_SCHEDULE',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};


export const cleanScheduleSeances = () => dispatch => {
    dispatch({
        type: 'CLEAN_SEANCES_FOR_DATE_AND_HALL'
    })
};

export const cleanScheduleFilms = () => dispatch => {
    dispatch({
        type: 'CLEAN_FILMS_FOR_SCHEDULE'
    })
};
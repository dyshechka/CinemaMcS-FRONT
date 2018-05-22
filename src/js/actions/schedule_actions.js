import {authHeader, baseUrlApi} from "../api";

export const loadSeancesForDateAndHall = (date, hallId) => dispatch => {
    baseUrlApi.get('/seance-service/seancesByDateAndHall/?date=' + date + "&hallId=" + hallId, authHeader()).then(res => {
        dispatch({
            type: 'SEANCES_FOR_DATE_AND_HALL',
            data: res.data
        });
        console.log('load seanses for date');
    }).catch(reason => {
        console.log(reason);
    })
};

export const getFilmsDate = (date) => dispatch => {
    baseUrlApi.get('/film-service/filmsByDate?dateTime=' + date, authHeader()).then(res => {
        dispatch({
            type: 'FILMS_FOR_SCHEDULE',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const getFreeTimes = (date, hallId, filmId) => dispatch => {
    baseUrlApi.get('/seance-service/seance/freeTime?date=' + date + "&hallId=" + hallId + "&filmId=" + filmId, authHeader()).then(res => {
        dispatch({
            type: 'FREE_TIMES_FOR_SCHEDULE',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const getFilmFormats = () => dispatch => {
    baseUrlApi.get('/seance-service/filmFormats', authHeader()).then(res => {
        dispatch({
            type: 'FILM_FORMATS_FOR_SCHEDULE',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const addSeance = (seance) => dispatch => {
    baseUrlApi.post('/seance-service/crud/seance', seance, authHeader()).then(res => {
        dispatch({
            type: 'ADD_SEANCE',
            data: res.data
        });
        loadSeancesForDateAndHall(res.data.time, res.data.hallId)(dispatch);
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

export const cleanScheduleFreeTime = () => dispatch => {
    dispatch({
        type: 'CLEAN_FREE_TIMES_FOR_SCHEDULE'
    })
};

export const cleanScheduleFilmFormats = () => dispatch => {
    dispatch({
        type: 'CLEAN_FILM_FORMATS_FOR_SCHEDULE'
    })
};

export const selectDateInSchedule = (date) => dispatch => {
    dispatch({
        type: 'SELECT_DATE_IN_SCHEDULE',
        data: date
    })
};

export const cleanDateInSchedule = () => dispatch => {
    dispatch({
        type: 'CLEAN_DATE_IN_SCHEDULE',
    })
};

export const selectFilmInSchedule = (film) => dispatch => {
    dispatch({
        type: 'SELECT_FILM_IN_SCHEDULE',
        data: film
    })
};

export const cleanFilmInSchedule = () => dispatch => {
    dispatch({
        type: 'CLEAN_FILM_IN_SCHEDULE',
    })
};

export const selectTimeInSchedule = (time) => dispatch => {
    dispatch({
        type: 'SELECT_TIME_IN_SCHEDULE',
        data: time
    })
};

export const cleanTimeInSchedule = () => dispatch => {
    dispatch({
        type: 'CLEAN_TIME_IN_SCHEDULE',
    })
};

export const selectHallInSchedule = (hall) => dispatch => {
    dispatch({
        type: 'SELECT_HALL_IN_SCHEDULE',
        data: hall
    })
};

export const cleanHallInSchedule = () => dispatch => {
    dispatch({
        type: 'CLEAN_HALL_IN_SCHEDULE',
    })
};

export const selectFilmFormatInSchedule = (filmFormat) => dispatch => {
    dispatch({
        type: 'SELECT_FILM_FORMAT_IN_SCHEDULE',
        data: filmFormat
    })
};

export const cleanFilmFormatInSchedule = () => dispatch => {
    dispatch({
        type: 'CLEAN_FILM_FORMAT_IN_SCHEDULE',
    })
};
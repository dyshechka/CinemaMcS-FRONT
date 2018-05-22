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
    const data = {
        filmId: seance.film.id,
        hallId: seance.hallId,
        filmFormat: seance.filmFormat,
        availability: true,
        time: seance.date
    };
    baseUrlApi.post('/seance-service/crud/seance', data, authHeader()).then(res => {
        dispatch({
            type: 'ADD_SEANCE',
            data: res.data
        });
        cleanScheduleSeances();
        cleanScheduleFreeTime();
        const date = new Date(seance.date.getFullYear(), seance.date.getMonth(), seance.date.getDate());
        loadSeancesForDateAndHall(date, seance.hallId);
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
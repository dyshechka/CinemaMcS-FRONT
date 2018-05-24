const initialState = null;

export default function schedule(state = initialState, action) {
    switch (action.type) {
        case 'SEANCES_FOR_DATE_AND_HALL':
            return {
                ...state,
                seances: action.data,
            };
        case 'CLEAN_SEANCES_FOR_DATE_AND_HALL':
            return {
                ...state,
                seances: null
            };
        case 'FILMS_FOR_SCHEDULE':
            return {
                ...state,
                films: action.data,
            };
        case 'CLEAN_FILMS_FOR_SCHEDULE':
            return {
                ...state,
                films: null
            };
        case 'FREE_TIMES_FOR_SCHEDULE':
            return {
                ...state,
                freeTimes: action.data,
            };
        case 'CLEAN_FREE_TIMES_FOR_SCHEDULE':
            return {
                ...state,
                freeTimes: null
            };
        case 'FILM_FORMATS_FOR_SCHEDULE':
            return {
                ...state,
                filmFormats: action.data,
            };
        case 'CLEAN_FILM_FORMATS_FOR_SCHEDULE':
            return {
                ...state,
                filmFormats: null
            };
        case 'ADD_SEANCE':
            return {
                ...state,
                filmFormats: null
            };
        case 'SELECT_FILM_IN_SCHEDULE':
            return {
                ...state,
                scheduleFilm: action.data
            };
        case 'CLEAN_FILM_IN_SCHEDULE':
            return {
                ...state,
                scheduleFilm: null
            };
        case 'SELECT_TIME_IN_SCHEDULE':
            return {
                ...state,
                scheduleTime: action.data
            };
        case 'CLEAN_TIME_IN_SCHEDULE':
            return {
                ...state,
                scheduleTime: null
            };
        case 'SELECT_HALL_IN_SCHEDULE':
            return {
                ...state,
                scheduleHall: action.data
            };
        case 'CLEAN_HALL_IN_SCHEDULE':
            return {
                ...state,
                scheduleHall: null
            };
        case 'SELECT_FILM_FORMAT_IN_SCHEDULE':
            return {
                ...state,
                scheduleFilmFormat: action.data
            };
        case 'CLEAN_FILM_FORMAT_IN_SCHEDULE':
            return {
                ...state,
                scheduleFilmFormat: null
            };
        case 'SELECT_DATE_IN_SCHEDULE':
            return {
                ...state,
                scheduleDate: action.data
            };
        case 'DELETE_SEANCE_IN_SCHEDULE':
            return {
                ...state,
                seances: null
            };
        case 'CLEAN_DATE_IN_SCHEDULE':
            return {
                ...state,
                scheduleDate: null
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}
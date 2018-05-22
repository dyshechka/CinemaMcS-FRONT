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
        default:
            return state;
    }
}
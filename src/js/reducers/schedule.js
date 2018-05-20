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
        default:
            return state;
    }
}
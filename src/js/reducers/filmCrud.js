const initialState = null;

export default function filmCrud(state = initialState, action) {
    switch (action.type) {
        case 'ADD_FILM':
            return {
                ...state,
                addFilm: action.data
            };
        case 'CLEAN_ADD_FILM':
            return {
                ...state,
                addFilm: null
            };
        case 'SET_ADD_FILM':
            return {
                ...state,
                addFilm: action.data
            };
        case 'APPLY_EDIT_FILM':
            return {
                ...state,
            };
        case 'EDIT_FILM':
            return {
                ...state,
                editFilm: action.data
            };
        case 'CLEAN_EDIT_FILM':
            return {
                ...state,
                editFilm: null
            };
        case 'DELETE_FILM':
            return {
                ...state,
            };
        case 'GET_FILM':
            return {
                ...state,
                crudFilm: action.data
            };
        case 'GET_ALL_FILMS':
            return {
                ...state,
                allFilms: action.data
            };
        case 'CLEAN_ALL_FILMS':
            return {
                ...state,
                allFilms: []
            };
        case 'GET_ALL_GENRES':
            return {
                ...state,
                allGenres: action.data
            };
        case 'SET_SELECTED_GENRES':
            return {
                ...state,
                selectedGenres: action.data
            };
        case 'CLEAN_SELECTED_GENRES':
            return {
                ...state,
                selectedGenres: []
            };
        case 'GET_ALL_COUNTRIES':
            return {
                ...state,
                allCountries: action.data
            };
        case 'SET_SELECTED_COUNTRIES':
            return {
                ...state,
                selectedCounties: action.data
            };
        case 'CLEAN_SELECTED_COUNTRIES':
            return {
                ...state,
                selectedCounties: []
            };
        case 'GET_ALL_AGE_RESTRICTIONS':
            return {
                ...state,
                allAgeRestrictions: action.data
            };
        case 'SET_AGE_RESTRICTIONS':
            return {
                ...state,
                allAgeRestrictions: action.data
            };
        case 'CLEAN_AGE_RESTRICTIONS':
            return {
                ...state,
                allAgeRestrictions: []
            };
        case 'GET_ALL_RENTAL_PERIODS':
            return {
                ...state,
                allRentalPeriods: action.data
            };
        case 'SET_ALL_RENTAL_PERIODS':
            return {
                ...state,
                allRentalPeriods: action.data
            };
        case 'CLEAN_ALL_RENTAL_PERIODS':
            return {
                ...state,
                allRentalPeriods: []
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}
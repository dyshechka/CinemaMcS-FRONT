const initialState = null;

export default function filmCrud(state = initialState, action) {
    switch (action.type) {
        case 'ADD_FILM':
            return {
                ...state,
                crudFilm: action.data
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
                crudFilm: action.data
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
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}
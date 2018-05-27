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

export const addNewFilm = (newFilm) => dispatch => {
    baseUrlApi.post('/film-service/crud/film', newFilm, authHeader()).then(res => {
        dispatch({
            type: 'ADD_FILM',
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const getAllFilms = () => dispatch => {
    baseUrlApi.get('/film-service/crud/films', authHeader()).then(res => {
        dispatch({
            type: 'GET_ALL_FILMS',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const getAllGenres = () => dispatch => {
    baseUrlApi.get('/film-service/crud/genres', authHeader()).then(res => {
        dispatch({
            type: 'GET_ALL_GENRES',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const getAllCountries = () => dispatch => {
    baseUrlApi.get('/film-service/crud/countries', authHeader()).then(res => {
        dispatch({
            type: 'GET_ALL_COUNTRIES',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const getAllAgeRestrictions = () => dispatch => {
    baseUrlApi.get('/film-service/crud/ageRestrictions', authHeader()).then(res => {
        dispatch({
            type: 'GET_ALL_AGE_RESTRICTIONS',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const deleteFilm = (id) => dispatch => {
    baseUrlApi.patch('/film-service/crud/film?filmId=' + id, authHeader()).then(res => {
        dispatch({
            type: 'DELETE_FILM',
        });
        cleanAllFilms()(dispatch);
        getAllFilms()(dispatch);
        cleanEditFilm()(dispatch);
    }).catch(reason => {
        console.log(reason);
    })
};

export const applyEditFilm = (editedFilm) => dispatch => {
    baseUrlApi.patch('/film-service/crud/film', editedFilm, authHeader()).then(res => {
        dispatch({
            type: 'APPLY_EDIT_FILM',
        });
        cleanAllFilms()(dispatch);
        getAllFilms()(dispatch);
        cleanEditFilm()(dispatch);
    }).catch(reason => {
        console.log(reason);
    })
};

export const getAllRentalPeriods = () => dispatch => {
    baseUrlApi.get('/film-service/crud/rentalPeriods', authHeader()).then(res => {
        dispatch({
            type: 'GET_ALL_RENTAL_PERIODS',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const cleanSelectedCountries = () => dispatch => {
    dispatch({
        type: 'CLEAN_SELECTED_COUNTRIES'
    })
};

export const setSelectedCountries = (countries) => dispatch => {
    dispatch({
        type: 'SET_SELECTED_GENRES',
        data: countries
    })
};

export const cleanSelectedGenres = () => dispatch => {
    dispatch({
        type: 'CLEAN_SELECTED_GENRES'
    })
};

export const setSelectedGenres = (genres) => dispatch => {
    dispatch({
        type: 'SET_SELECTED_GENRES',
        data: genres
    })
};

export const cleanAllFilms = () => dispatch => {
    dispatch({
        type: 'CLEAN_ALL_FILMS'
    })
};

export const cleanEditFilm = () => dispatch => {
    dispatch({
        type: 'CLEAN_EDIT_FILM'
    })
};

export const setEditFilm = (film) => dispatch => {
    dispatch({
        type: 'EDIT_FILM',
        data: film
    })
};

export const setAddFilm = (film) => dispatch => {
    dispatch({
        type: 'SET_ADD_FILM',
        data: film
    })
};
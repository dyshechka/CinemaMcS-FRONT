import {authHeader, baseUrlApi} from "../api";

export const getVacancies = () => dispatch => {
    let currentDate = new Date();
    baseUrlApi.get('/vacancy-service/vacancies', authHeader()).then(res => {
        dispatch({
            type: 'VACANCIES_LOADED',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const cleanVacancies = () => dispatch => {
    dispatch({
        type: 'CLEAN_VACANCIES'
    })
};
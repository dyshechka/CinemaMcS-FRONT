import {authHeader, baseUrlApi} from "../api";

export const selectSeanceWithFilm = (seanceWithFilm) => dispatch => {
    baseUrlApi.post('/order-service/order/create/step/first', seanceWithFilm, authHeader()).then(res => {
        dispatch({
            type: 'SEANCE_SELECTED',
            data: res.data
        });
        baseUrlApi.get('/hall-service/seats/' + seanceWithFilm.hallId, authHeader()).then(res => {
            dispatch({
                type: 'HALL_SEATS_LOADED',
                data: res.data
            });
        }).catch(reason => {
            console.log(reason);
        })
    }).catch(reason => {
        console.log(reason);
    });
};
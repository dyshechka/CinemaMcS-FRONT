import {authHeader, baseUrlApi} from "../api";

export const selectSeanceWithFilm = (seanceWithFilm) => dispatch => {
    baseUrlApi.get('/hall-service/seats?hallId=' + seanceWithFilm.hallId + '&seanceId=' + seanceWithFilm.id, authHeader()).then(res => {
        dispatch({
            type: 'HALL_SEATS_LOADED',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const addSeatToOrder = (selectedSeats) => dispatch => {
    dispatch({
        type: 'ADD_SEAT_TO_ORDER',
        data: selectedSeats
    })
};
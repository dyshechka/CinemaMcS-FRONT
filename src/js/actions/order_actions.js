import {authHeader, baseUrlApi} from "../api";
import * as qs from "querystring";

export const selectSeanceWithFilm = (seanceWithFilm) => dispatch => {
    baseUrlApi.get('/hall-service/seats?hallId=' + seanceWithFilm.hallId + '&seanceId=' + seanceWithFilm.id, authHeader()).then(res => {
        dispatch({
            type: 'SEANCE_SELECTED',
            data: seanceWithFilm
        });
        dispatch({
            type: 'HALL_SEATS_LOADED',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const addSeatToOrder = (seat) => dispatch => {
    dispatch({
        type: 'ADD_SEAT_TO_ORDER',
        data: seat
    })
};

export const removeSeatFromOrder = (seat) => dispatch => {
    dispatch({
        type: 'REMOVE_SEAT_FROM_ORDER',
        data: seat
    })
};

export const calculateOrder = (calculateRequest) => dispatch => {
    baseUrlApi.post('/order-service/order/calculate', calculateRequest, authHeader()).then(res => {
        dispatch({
            type: 'CALCULATE_ORDER',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const approveOrder = (approveRequest) => dispatch => {
    // baseUrlApi.post('/order-service/order/approve', approveRequest, authHeader()).then(res => {
    baseUrlApi.get('/order-service/order/mockOrder', authHeader()).then(res => {
        dispatch({
            type: 'APPROVE_ORDER',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const cleanOrder = () => dispatch => {
    dispatch({
        type: 'CLEAN_ORDER'
    })
};
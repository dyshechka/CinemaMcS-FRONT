import {authHeader, baseUrlApi} from "../api";

export const getUserOrders = () => dispatch => {
    baseUrlApi.get('/order-service/order/userOrders', authHeader()).then(res => {
        dispatch({
            type: 'ORDERS_LOADED',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};
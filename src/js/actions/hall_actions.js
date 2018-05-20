import {authHeader, baseUrlApi} from "../api";

export const loadHalls = () => dispatch => {
    baseUrlApi.get('/hall-service/halls', authHeader()).then(res => {
        dispatch({
            type: 'HALLS_LOAD',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};
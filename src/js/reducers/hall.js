const initialState = null;

export default function hall(state = initialState, action) {
    switch (action.type) {
        case 'HALL_SEATS_LOADED':
            return {
                rows: action.data,
            };
        case 'HALLS_LOAD':
            return {
                halls: action.data,
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}
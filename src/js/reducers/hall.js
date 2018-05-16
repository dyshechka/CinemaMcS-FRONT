const initialState = null;

export default function hall(state = initialState, action) {
    switch (action.type) {
        case 'HALL_SEATS_LOADED':
            return {rows: action.data};
        default:
            return state;
    }
}
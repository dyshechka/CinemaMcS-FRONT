const initialState = null;

export default function order(state = initialState, action) {
    switch (action.type) {
        case 'HALL_SEATS_LOADED':
            return {
                selectedSeats: []
            };
        case 'ADD_SEAT_TO_ORDER':
            return {
                selectedSeats: action.data
            };
        default:
            return state;
    }
}
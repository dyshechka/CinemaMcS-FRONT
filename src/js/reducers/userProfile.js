const initialState = null;

export default function userProfile(state = initialState, action) {
    switch (action.type) {
        case 'ORDERS_LOADED':
            return {
                ...state,
                userOrders: action.data
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}
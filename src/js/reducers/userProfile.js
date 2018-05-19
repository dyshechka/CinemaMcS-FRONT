const initialState = null;

export default function userProfile(state = initialState, action) {
    switch (action.type) {
        case 'ORDERS_LOADED':
            return {
                ...state,
                userOrders: action.data
            };
        default:
            return state;
    }
}
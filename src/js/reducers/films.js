const initialState = null;

export default function films(state = initialState, action) {
    switch (action.type) {
        case 'TODAY_FILMS_LOADED':
            return action.data;
        case 'FILMS_LOADED':
            return action.data;
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}
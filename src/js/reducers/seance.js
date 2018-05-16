const initialState = null;

export default function seance(state = initialState, action) {
    switch (action.type) {
        case 'SEANCE_SELECTED':
            return action.data;
        default:
            return state;
    }
}
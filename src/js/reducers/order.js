const initialState = null;

export default function order(state = initialState, action) {
    switch (action.type) {
        case 'FIRST_STEP_GET':
            return action.data;
        case 'FIRST_STEP_APPLY':
            return action.data;
        default:
            return state;
    }
}
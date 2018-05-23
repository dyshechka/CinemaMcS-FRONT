const initialState = null;

export default function vacancy(state = initialState, action) {
    switch (action.type) {
        case 'VACANCIES_LOADED':
            return action.data;
        case 'CLEAN_VACANCIES':
            return null;
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}
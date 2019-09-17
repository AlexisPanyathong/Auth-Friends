
export const initialState = {
    login: [
        {
            username: '',
            password: ''
        }
    ]
};

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                login: action.payload
            }

        default:
            return state;
    }
}
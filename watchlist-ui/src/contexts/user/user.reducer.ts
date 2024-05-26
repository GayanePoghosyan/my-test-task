import { UserState, Action } from '../../interfaces';

const userReducer = (state: UserState, action: Action) => {
    switch (action.type) {
        case 'REGISTER_USER_REQUEST':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'USER_REGISTRATION_SUCCESS':
            state = { ...state, user: { ...state.user, ...action.payload }};
            return {
                ...state,
                loading: false,
               error:'',
            };
        case 'USER_REGISTRATION_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'LOGIN_USER_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'USER_LOGIN_SUCCESS':
            state = { ...state, user: { ...state.user }, accessToken: action.payload };
            return {
                ...state,
                loading: false,
                error: '',
            };
        case 'USER_LOGIN_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'GET_CURRENT_USER_REQUEST':
            state = { ...state, user: { ...state.user, ...action.payload } };
            return {
                ...state,
                loading: true,
                error: '',
            }
        case 'GET_CURRENT_USER_REQUEST_SUCCESS':
            state = { ...state, user: { ...state.user, ...action.payload } };
            return {
                ...state,
                loading: false,
                error: '',
            }
        case 'GET_CURRENT_USER_REQUEST_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case 'LOG_OUT':
            state = { ...state, user: { firstName: '', lastName: '', email: '' } };
            return {
                ...state,
                loading: false,
                error: '',
            }
        default:
            return state;
    }
};

export default userReducer;
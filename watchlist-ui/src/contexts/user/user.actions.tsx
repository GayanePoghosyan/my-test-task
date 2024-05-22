import axios from 'axios';
import { setAuthenticationToken } from '../../services';
import { NotificationTypeEnum, showNotification } from '../../components/notification/showNotification';

export const userServiceActions = (dispatch: any) => {

    const register = async (data: any) => {
        dispatch({ type: 'REGISTER_USER_REQUEST' });
        try {
            const response = await axios.post('http://localhost:4000/auth/register', data);
            dispatch({ type: 'USER_REGISTRATION_SUCCESS', payload: response.data });
            showNotification(`You're now registered!`, { type: NotificationTypeEnum.Success })
        } catch (error: any) {
            const message = error?.response?.data?.message
            dispatch({ type: 'USER_REGISTRATION_FAILURE', payload: error?.message });
            showNotification(message || `There was a problem registering your account.`, { type: NotificationTypeEnum.Error })
        }
    };

    const login = async (data: any) => {
        dispatch({ type: 'LOGIN_USER_REQUEST' });
        try {
            const response = await axios.post('http://localhost:4000/auth/login', data);
            const accessToken = response.data?.access_token;
            dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data?.access_token });
            setAuthenticationToken(accessToken);
            showNotification(`You've successfully logged in!`, { type: NotificationTypeEnum.Success })
        } catch (error: any) {
            const message = error?.response?.data?.message
            dispatch({ type: 'USER_LOGIN_FAILURE', payload: error?.message });
            showNotification(message || `Invalid login credentials. Please try again.`, { type: NotificationTypeEnum.Error })
        }
    };

    const googleSignIn = async (data: any) => {
        dispatch({ type: 'LOGIN_USER_REQUEST' });
        try {
            const response = await axios.post('http://localhost:4000/auth/googleSignIn', data);
            const accessToken = response.data?.access_token;
            dispatch({ type: 'LOGIN_USER_SUCCESS', payload: accessToken });
            setAuthenticationToken(accessToken);
            dispatch({ type: 'GET_CURRENT_USER_REQUEST' });
            showNotification(`You've successfully logged in!`, { type: NotificationTypeEnum.Success })
        } catch (error: any) {
            const message = error?.response?.data?.message
            dispatch({ type: 'USER_LOGIN_FAILURE', payload: message });
            showNotification(message || `Invalid login credentials. Please try again.`, { type: NotificationTypeEnum.Error })
        }
    };

    const getCurrentUser = async () => {
        dispatch({ type: 'GET_CURRENT_USER_REQUEST' });
        try {
            const response = await axios.get('http://localhost:4000/auth/me');
            dispatch({ type: 'GET_CURRENT_USER_REQUEST_SUCCESS', payload: response.data });
        } catch (error: any) {
            const message = error?.response?.data?.message
            console.log(message)
            dispatch({ type: 'GET_CURRENT_USER_REQUEST_FAILURE', payload: error?.message });
        }
    };

    return {
        register, login, getCurrentUser, googleSignIn
    }
}

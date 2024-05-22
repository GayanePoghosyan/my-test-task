
import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const setAuthenticationToken = (token: string) => {
    localStorage.setItem('AUTHENTICATION_TOKEN', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const getAuthenticationToken = () => {
    return localStorage.getItem('AUTHENTICATION_TOKEN');
};
const removeAuthenticationToken = () => {
    localStorage.removeItem('AUTHENTICATION_TOKEN');
};

export const useUserService = () => {
    const navigate = useNavigate()

    const logout = useCallback(() => {
        const token = getAuthenticationToken();
        if (token) {
            removeAuthenticationToken();
            axios.defaults.headers.common['Authorization'] = undefined;
            navigate('/login');
        }
    }, []);

    const tokenExists = Boolean(getAuthenticationToken());

    const isLoggedIn = useMemo(
        () => Boolean(tokenExists),
        [tokenExists]
    );

    return {
        isLoggedIn,
        logout,
    };
};

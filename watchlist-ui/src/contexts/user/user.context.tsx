import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import userReducer from './user.reducer';
import { userServiceActions } from './user.actions';
import { UserState } from '../../interfaces';

const initialState: UserState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    },
    accessToken: '',
    loading: false,
    error: ''
};

const UserContext = createContext({
    state: initialState,
    dispatch: (data: any) => { },
    register: (data: any) => { },
    login: (data: any) => { },
    googleSignIn: (data: any) => { },
    getCurrentUser: () => { }
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const { register, login, getCurrentUser, googleSignIn } = userServiceActions(dispatch)

    return (
        <UserContext.Provider value={{ state, dispatch, register, login, getCurrentUser, googleSignIn }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

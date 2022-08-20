import { IUser } from 'interfaces';
import React, { FC, useReducer } from 'react'
import { AuthContext, authReducer } from './';

export interface AuthState {
     isLoggedIn: boolean;
     user?: IUser;
}

const AUTH_INITIALSTATE: AuthState = {
     isLoggedIn: false,
     user: undefined,
}

export const AuthProvider:FC = ({children}: any) => {

const [state, dispath] = useReducer(authReducer, AUTH_INITIALSTATE);

return (
    <AuthContext.Provider value={{
     ...state,
    }}>
     {children}
    </AuthContext.Provider>
)
}
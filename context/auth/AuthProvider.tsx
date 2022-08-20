import { tesloApi } from 'api';
import { IUser } from 'interfaces';
import Cookies from 'js-cookie';
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

const loginUser = async (email:string, password: string): Promise<Boolean> => {
     try {
          const {data} = await tesloApi.post('/user/login', { email, password })
          const { token, user } = data;

          Cookies.set('token', token);

          dispath({type: '[Auth] - login', paylod: user});

          return true;
          
     } catch (error) {
          return false;
          
     }     
}

return (
    <AuthContext.Provider value={{
     ...state,

     loginUser,
    }}>
     {children}
    </AuthContext.Provider>
)
}
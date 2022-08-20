import { IUser } from 'interfaces';
import { AuthState } from './';

type AuthActionType =
   | { type: '[Auth] - isLoggedIn', paylod: IUser }
   | { type: '[Auth] - logout' }

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
   switch (action.type) {
   case '[Auth] - isLoggedIn':
       return {
      ...state,
        isLoggedIn: true,
        user: action.paylod
      };

    case '[Auth] - logout':
    return {
    ...state,
        isLoggedIn: false,
        user: undefined,
    };


   default:
      return state;
   }
};
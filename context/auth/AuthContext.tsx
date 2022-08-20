import { IUser } from "interfaces";
import { createContext } from "react";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  loginUser: (email: string, password: string) => Promise<Boolean>
}

export const AuthContext = createContext({} as ContextProps);

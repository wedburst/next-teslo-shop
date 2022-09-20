import { IUser } from "interfaces";
import { createContext } from "react";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  loginUser: (email: string, password: string) => Promise<Boolean>;
  registerUser: (name: string, email: string, password: any) => Promise<{ hasError: boolean; message?: string; }>;
}

export const AuthContext = createContext({} as ContextProps);

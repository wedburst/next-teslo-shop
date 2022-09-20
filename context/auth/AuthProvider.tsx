import React, { FC, useReducer, useEffect } from "react";
import { tesloApi } from "api";
import axios from "axios";
import { IUser } from "interfaces";
import Cookies from "js-cookie";

import { AuthContext, authReducer } from "./";
export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIALSTATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC = ({ children }: any) => {
  const [state, dispath] = useReducer(authReducer, AUTH_INITIALSTATE);


  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async() => {
    // lamar al endpoin

    try {
      const { data } = await tesloApi.get("/user/validate-token");
      const { token, user } = data;

      Cookies.set("token", token);

      dispath({ type: "[Auth] - login", paylod: user });
    } catch (error) {
      Cookies.remove('token')
    }
    // Revalidar token guardando el nuevo
    // dispatch login

    // MAL
    // Borrar el token de las cookies
  }

  const loginUser = async (
    email: string,
    password: string
  ): Promise<Boolean> => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { token, user } = data;

      Cookies.set("token", token);

      dispath({ type: "[Auth] - login", paylod: user });

      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (name: string, email: string, password: any): Promise<{hasError: boolean, message?: string}> => {
    try {
      const { data } = await tesloApi.post("/user/register", {name, email, password });
      const { token, user } = data;

      Cookies.set("token", token);

      dispath({ type: "[Auth] - login", paylod: user });

      return {
        hasError: false,
      };

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "No se pudo crear el usuario - intentelo de nuevo",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        loginUser,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

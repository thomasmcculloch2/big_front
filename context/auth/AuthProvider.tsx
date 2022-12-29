import axios from "axios";
import { FC, useReducer, useEffect } from "react";

import { AuthContext, authReducer } from ".";
import { IUser, IUserLogin } from "../../interfaces";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
  role?: string;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
  role: undefined,
};

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const refreshUser = async () => {
    if(!localStorage.getItem('token')){
        return;
    }
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const response = await axios.get("http://localhost/api/user", { headers });
    dispatch({ type: "[Auth] - Login", payload: response.data });
  };

//   const loginUser = async (user: IUserLogin) => {
//     const response = await axios.post('http://localhost/api/login', user)
//     localStorage.setItem('token', response.data.data.token)
//     dispatch({ type: "[Auth] - Login", payload: response.data.data.user });
//     //return response.data
// }

  const saveUser = (user: IUser) => {
    dispatch({ type: "[Auth] - Login", payload: user });
  };

  const logoutUserContext = () => {
    dispatch({ type: "[Auth] - Logout" });
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,

        saveUser,
        logoutUserContext
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

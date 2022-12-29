import { createContext } from 'react';
import {  IUser,IUserLogin } from '../../interfaces';


interface ContextProps {
    isLogedIn: boolean;
    user?: IUser;
    role?: string;

    saveUser: (user: IUser) => void;
    logoutUserContext: () => void
    
}


export const AuthContext = createContext({} as ContextProps );
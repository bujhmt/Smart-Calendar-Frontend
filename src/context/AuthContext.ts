import React from 'react'
import {UserData} from "../models/UserData";

interface IAuthContext {
    userData: UserData
    setUserData: any
    isAuthenticated: boolean
    setIsAuthenticated: any
}

export const AuthContext = React.createContext<IAuthContext>({
    userData: {},
    setUserData: undefined,
    isAuthenticated: false,
    setIsAuthenticated: undefined
})

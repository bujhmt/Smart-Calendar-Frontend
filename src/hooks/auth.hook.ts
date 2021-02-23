import { useState } from 'react'
import { UserData } from '../models/UserData'

export const useAuth = () => {
    const [userData, setUserData] = useState<UserData>({})
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return { userData, setUserData, isAuthenticated, setIsAuthenticated }
}

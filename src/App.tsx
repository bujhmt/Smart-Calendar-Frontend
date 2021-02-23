import React, {useEffect, useState, useCallback} from 'react'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {NavBar} from './components/NavBar'
import {ThemeProvider} from '@material-ui/core/styles'
import {MuiTheme} from './themes/MuiTheme'
import clientApi from './api/index'
import {CustomLoading} from "./components/CustomLoading";

function App() {
    const {userData, setUserData, isAuthenticated, setIsAuthenticated} = useAuth()
    const [loading, setLoading] = useState(true)
    const routes: JSX.Element = useRoutes(isAuthenticated)

    const initializeClientAPI = useCallback(async () => {
        await clientApi.build()
        setLoading(false)
        setUserData(clientApi.userData)
        setIsAuthenticated(clientApi.isAuthenticated)
    }, [setUserData, setIsAuthenticated])

    useEffect(() => {
        initializeClientAPI()
    },[initializeClientAPI])

    return (
        <ThemeProvider theme={MuiTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <AuthContext.Provider
                    value={{
                        userData,
                        setUserData,
                        setIsAuthenticated,
                        isAuthenticated
                    }}
                >
                    {loading ? <CustomLoading size={200}/> :
                        <BrowserRouter>
                            {isAuthenticated && <NavBar/>}
                            <div className="container">{routes}</div>
                        </BrowserRouter>
                    }
                </AuthContext.Provider>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    )
}

export default App

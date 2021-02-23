import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { IntentionsPage } from './pages/IntentionsPage'
import { MainPage } from './pages/MainPage'
import { ProfilePage } from './pages/ProfilePage'
import { AuthPage } from './pages/AuthPage'


export const useRoutes = (isAuthencticated: boolean) => {
    if (isAuthencticated) {
        return (
            <Switch>
                <Route path="/intentions" exact>
                    <IntentionsPage />
                </Route>
                <Route path="/main" exact>
                    <MainPage />
                </Route>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Redirect to="/intentions" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}

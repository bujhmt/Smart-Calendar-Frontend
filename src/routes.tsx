import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { IntentionsPage } from './pages/Intentions/IntentionsPage'
import { MainPage } from './pages/Main/MainPage'
import { ProfilePage } from './pages/Profiles/ProfilePage'
import { AuthPage } from './pages/AuthPage/AuthPage'
import { ContactUsPage } from './pages/Contacts/ContactUs'

export const useRoutes = (isAuthencticated: boolean) => {
    if (isAuthencticated) {
        return (
            <Switch>
                <Route path="/intentions" exact>
                    <IntentionsPage />
                </Route>
                <Route path="/" exact>
                    <MainPage />
                </Route>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Route path="/contacts" exact>
                    <ContactUsPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/login" exact>
                <AuthPage />
            </Route>
            <Redirect to="/login" />
        </Switch>
    )
}

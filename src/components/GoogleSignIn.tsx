import React, {useCallback, useContext, useState} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {MsgStates, MsgProps} from './CustomMsg'
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login'
import clientApi from "../api";
import {AuthContext} from "../context/AuthContext";

const useStyles = makeStyles((theme: Theme) => ({
    googleSignInButton: {
        marginTop: '10%',
    },
}), {index: 1})

export const GoogleSignIn = (Props: { setMsg?: React.Dispatch<React.SetStateAction<MsgProps>> }) => {
    const styles = useStyles()
    const [loading, setLoading] = useState<boolean>(false)
    const {setIsAuthenticated, setUserData} = useContext(AuthContext)

    const SignIn = useCallback(
        async (profile: any) => {
            setLoading(true)
            try {
                await clientApi.signUp({
                    email: profile.getEmail(),
                    password: profile.getId(),
                })
            } catch (err) {}

            try {
                await clientApi.login({
                    email: profile.getEmail(),
                    password: profile.getId(),
                })
                setIsAuthenticated(true)
                setUserData({...clientApi.userData})
            } catch (err) {
                console.log(err)
                if (Props.setMsg)
                    Props.setMsg({
                        text: 'You have not been logged in. Please, try again.',
                        type: MsgStates.Error,
                        isOpen: true,
                    })
            }
            setLoading(false)
        },
        [Props, setIsAuthenticated, setUserData]
    )

    const handleResponse = (response: any) => {
        try {
            const profile = response.getBasicProfile()
            SignIn(profile)
        } catch (err) {
            console.log(err)
            if (Props.setMsg)
                Props.setMsg({
                    text: 'You have not been logged in. Please, try again.',
                    type: MsgStates.Info,
                    isOpen: true,
                })
        }
    }

    const handleResponseError = (error: any) => {
        console.log('Error: ', error)
        if (Props.setMsg)
            Props.setMsg({
                text: 'You have not been logged in. Please, try again.',
                type: MsgStates.Error,
                isOpen: true,
            })
    }

    return (
        <div className={styles.googleSignInButton}>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_AUTH_TOKEN || ''}
                buttonText="Sign in with Google"
                onSuccess={handleResponse}
                onFailure={handleResponseError}
                cookiePolicy={'single_host_origin'}
                theme="dark"
                disabled={loading}
            />
        </div>
    )
}

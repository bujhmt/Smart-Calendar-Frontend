import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {LoginComponent} from '../components/LoginComponent'
import {SignUpComponent} from '../components/SignUpComponent'
import {CustomMsg, MsgStates, MsgProps} from '../components/CustomMsg'
import {GoogleSignIn} from '../components/GoogleSignIn'

const useStyles = makeStyles({
    root: {
        maxWidth: '30%',
        margin: '5% auto',
        backgroundColor: '#fff',
        borderRadius: 20,
    },

    logo: {
        height: '50%',
        width: '50%',
    },

    logoWrapper: {
        marginTop: '10%',
        display: 'flex',
        justifyContent: 'center',
    },

    logoTitle: {
        marginTop: '5%',
        display: 'flex',
        justifyContent: 'center',
    },

    logoDescription: {
        marginTop: '5%',
        display: 'flex',
        justifyContent: 'center',
    },

    buttonsWrapper: {
        marginTop: '10%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },

    signInButton: {
        marginRight: 0,
        width: '80%',
        backgroundColor: '#ef6c00',
        fontSize: '150%',
        borderRadius: 10,
        '&:hover': {
            backgroundColor: '#fb8c00',
        },
        '&:disabled': {
            backgroundColor: '#fb8c00',
        },
    },

    signUpButton: {
        marginRight: 0,
        marginTop: '3%',
        marginBottom: '5%',
        width: '80%',
        backgroundColor: '#303f9f',
        fontSize: '150%',
        borderRadius: 10,
        '&:hover': {
            backgroundColor: '#3949ab',
        },
        '&:disabled': {
            backgroundColor: '#3949ab',
        },
    },

    span: {
        color: '#ef6c00',
    },
}, {index: 1})

interface OpenStates {
    isLoginOpen: boolean
    isSignUpOpen: boolean
}

export const AuthPage = () => {
    const [openStates, setOpenStates] = useState<OpenStates>({isLoginOpen: false, isSignUpOpen: false})
    const styles = useStyles()
    const [msg, setMsg] = useState<MsgProps>({
        text: '',
        type: MsgStates.Info,
        isOpen: false,
    })

    return (
        <>
            <CustomMsg type={msg.type} text={msg.text} isOpen={msg.isOpen} setProps={setMsg}/>
            <Card className={styles.root}>
                <CardActionArea disableTouchRipple style={{backgroundColor: 'transparent'}} disableRipple>
                    <CardContent>
                        <div className={styles.logoWrapper}>
                            <img className={styles.logo} src="/logo.png" alt="logo"/>
                        </div>
                        <Typography classes={{root: styles.logoTitle}} gutterBottom variant="h5" component="h2">
                            Smart Calendar
                        </Typography>
                        <Typography
                            classes={{root: styles.logoDescription}}
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            Follow your plans!
                        </Typography>
                        <div className={styles.buttonsWrapper}>
                            {!openStates.isLoginOpen && !openStates.isSignUpOpen ? (
                                <>
                                    <Button
                                        onClick={() => {
                                            setOpenStates({...openStates, isLoginOpen: true})
                                        }}
                                        variant="contained"
                                        color="secondary"
                                        classes={{root: styles.signInButton}}
                                    >
                                        Log In
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setOpenStates({...openStates, isSignUpOpen: true})
                                        }}
                                        variant="contained"
                                        color="secondary"
                                        classes={{root: styles.signUpButton}}
                                    >
                                        Sign Up
                                    </Button>
                                </>
                            ) : null}
                            {openStates.isLoginOpen ? (
                                <>
                                    <LoginComponent setMsg={setMsg}/>
                                    <GoogleSignIn setMsg={setMsg}/>
                                    <Typography
                                        classes={{root: styles.logoDescription}}
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        Don't have account?&nbsp;
                                        <span
                                            className={styles.span}
                                            onClick={() => {
                                                setOpenStates({isLoginOpen: false, isSignUpOpen: true})
                                            }}
                                        >
                                            Sign Up
                                        </span>
                                    </Typography>
                                </>
                            ) : null}

                            {openStates.isSignUpOpen ? (
                                <>
                                    <SignUpComponent
                                        handleLoginOpen={() => {
                                            setOpenStates({isLoginOpen: true, isSignUpOpen: false})
                                        }}
                                        setMsg={setMsg}
                                    />
                                    <Typography
                                        classes={{root: styles.logoDescription}}
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        Already have an account?&nbsp;
                                        <span
                                            className={styles.span}
                                            onClick={() => {
                                                setOpenStates({isLoginOpen: true, isSignUpOpen: false})
                                            }}
                                        >
                                            Log in
                                        </span>
                                    </Typography>
                                </>
                            ) : null}
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}

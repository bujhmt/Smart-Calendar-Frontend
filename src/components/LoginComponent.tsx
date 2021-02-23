import React, {useState, useRef, useContext, useCallback} from 'react'
import {MsgProps, MsgStates} from './CustomMsg'
import { makeStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Button from '@material-ui/core/Button'
import * as emailValidator from 'email-validator'
import clientApi from "../api";
import {AuthContext} from "../context/AuthContext";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    signInButton: {
        marginRight: 0,
        marginTop: '3%',
        width: '80%',
        backgroundColor: '#ef6c00',
        fontSize: '150%',
        borderRadius: 10,
        '&:hover': {
            backgroundColor: '#fb8c00',
        },
        '&:disabled': {
            backgroundColor: '#fdd835',
            color: '#424242',
        },
    },

    inputField: {
        width: '80%',
        marginTop: '2%',
        marginRight: 0,
    },

    helperText: {
        color: '#f44336;',
    },
}), {index: 1})

interface Errors {
    email: boolean
    password: boolean
}

export const LoginComponent = (Props: { setMsg: React.Dispatch<React.SetStateAction<MsgProps>> }) => {
    const passwordRef = useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<Errors>({ email: false, password: false })
    const styles = useStyles()
    const [loading, setLoading] = useState<boolean>(false)
    const {setIsAuthenticated, setUserData} = useContext(AuthContext)

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const changeHandler = (event: React.FormEvent<EventTarget>) => {
        const target = event.target as HTMLInputElement
        setForm({ ...form, [target.name]: target.value })
    }

    const loginHandler = useCallback(async () => {
        setLoading(true)
        try {
            await clientApi.login({...form})
            setIsAuthenticated(true)
            setUserData({...clientApi.userData})
        } catch (err) {
            console.log(err)
            Props.setMsg({ text: 'Incorrect email or password', type: MsgStates.Error, isOpen: true })
        }
        setLoading(false)
    },[setIsAuthenticated, Props, form, setUserData])

    const isDisabledLoginButton = () => {
        return (
            loading ||
            errors.email ||
            errors.password ||
            form.email.length === 0 ||
            form.password.length === 0
        )
    }

    return (
        <>
            <TextField
                classes={{ root: styles.inputField }}
                error={errors.email}
                autoFocus
                helperText={errors.email ? 'Invalid email input' : ''}
                label="Email"
                type="email"
                fullWidth
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && passwordRef.current) passwordRef.current.focus()
                }}
                name="email"
                onChange={(event) => {
                    if (emailValidator.validate(event.target.value) || event.target.value.length === 0)
                        setErrors({ ...errors, email: false })
                    else setErrors({ ...errors, email: true })
                    changeHandler(event)
                }}
                variant="outlined"
            />
            <TextField
                variant="outlined"
                classes={{ root: styles.inputField }}
                inputRef={passwordRef}
                error={errors.password}
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                helperText={errors.password ? 'Password must be more than 5 characters' : ''}
                name="password"
                label="Password"
                onChange={(event) => {
                    if (event.target.value.length === 0 || event.target.value.length > 5)
                        setErrors({ ...errors, password: false })
                    else setErrors({ ...errors, password: true })
                    changeHandler(event)
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !isDisabledLoginButton()) loginHandler()
                }}
                fullWidth
                InputProps={{
                    endAdornment: (
                        <IconButton
                            aria-label="password visibility"
                            onClick={() => {
                                setShowPassword(!showPassword)
                            }}
                            onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                                event.preventDefault()
                            }}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    ),
                }}
            />
            <Button
                disabled={isDisabledLoginButton()}
                variant="contained"
                color="secondary"
                classes={{ root: styles.signInButton }}
                onClick={loginHandler}
            >
                Log In
            </Button>
        </>
    )
}

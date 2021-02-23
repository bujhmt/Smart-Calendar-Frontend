import React, {useState, useRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import * as emailValidator from 'email-validator'
import { MsgStates, MsgProps } from './CustomMsg'
import clientApi from "../api";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },

    signUpButton: {
        marginRight: 0,
        marginTop: '3%',
        width: '80%',
        backgroundColor: '#303f9f',
        fontSize: '150%',
        borderRadius: 10,
        '&:hover': {
            backgroundColor: '#3949ab',
        },
        '&:disabled': {
            backgroundColor: '#c5cae9',
            color: '#424242',
        },
    },

    inputField: {
        width: '80%',
        marginTop: '2%',
        backgroundColor: '#fff',
        marginRight: 0,
    },

    helperText: {
        color: '#f44336;',
    },
}), {index: 1})

interface Errors {
    email: boolean
    password: boolean
    passwordConfirm: boolean
}

export const SignUpComponent = (Props: { handleLoginOpen: () => any; setMsg: React.Dispatch<React.SetStateAction<MsgProps>> }) => {
    const styles = useStyles()
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const [errors, setErrors] = useState<Errors>({ email: false, password: false, passwordConfirm: false })
    const [loading, setLoading] = useState<boolean>(false)
    const [form, setForm] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
    })

    const changeHandler = (event: React.FormEvent<EventTarget>) => {
        const target = event.target as HTMLInputElement
        setForm({ ...form, [target.name]: target.value })
    }

    const signUpHandler = async () => {
        setLoading(true)
        try {
            const message = await clientApi.signUp({...form})
            Props.setMsg({ text: message, type: MsgStates.Success, isOpen: true })
            Props.handleLoginOpen()
        } catch (err) {
            Props.setMsg({ text: err.message, type: MsgStates.Error, isOpen: true })
        }
        setLoading(false)
    }

    const isDisabledSignUpButton = () => {
        return (
            loading ||
            errors.email ||
            errors.password ||
            errors.passwordConfirm ||
            form.email.length === 0 ||
            form.password.length === 0 ||
            form.passwordConfirm.length === 0
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
                classes={{ root: styles.inputField }}
                error={errors.password}
                helperText={errors.password ? 'Password must be more than 5 characters' : ''}
                label="Password"
                type="password"
                inputRef={passwordRef}
                fullWidth
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && confirmPasswordRef.current) confirmPasswordRef.current.focus()
                }}
                name="password"
                onChange={(event) => {
                    if (event.target.value.length === 0 || event.target.value.length > 5)
                        setErrors({ ...errors, password: false })
                    else setErrors({ ...errors, password: true })
                    changeHandler(event)
                }}
                variant="outlined"
            />
            <TextField
                classes={{ root: styles.inputField }}
                error={errors.passwordConfirm}
                helperText={errors.passwordConfirm ? 'Passwords must match' : ''}
                label="Password confirm"
                type="password"
                inputRef={confirmPasswordRef}
                fullWidth
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !isDisabledSignUpButton()) signUpHandler()
                }}
                name="passwordConfirm"
                onChange={(event) => {
                    if (event.target.value.length === 0 || event.target.value === form.password)
                        setErrors({ ...errors, passwordConfirm: false })
                    else setErrors({ ...errors, passwordConfirm: true })
                    changeHandler(event)
                }}
                variant="outlined"
            />
            <Button
                disabled={isDisabledSignUpButton()}
                variant="contained"
                color="secondary"
                classes={{ root: styles.signUpButton }}
                onClick={signUpHandler}
            >
                Sign Up
            </Button>
        </>
    )
}

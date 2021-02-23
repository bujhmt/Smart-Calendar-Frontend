import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'

const Alert = (props: AlertProps | { children: string }) => {
    return <MuiAlert variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}), {index: 1})

export interface MsgProps {
    type: MsgStates
    text: string
    isOpen: boolean
}

export enum MsgStates {
    Error = 'error',
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
}

export const CustomMsg = (Props: MsgProps & { setProps: any | undefined }) => {
    const styles = useStyles()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        if (Props.setProps) Props.setProps({ ...Props, isOpen: !Props.isOpen })
    }

    return (
        <div className={styles.root}>
            <Snackbar open={Props.isOpen} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={Props.type}>
                    {Props.text}
                </Alert>
            </Snackbar>
        </div>
    )
}

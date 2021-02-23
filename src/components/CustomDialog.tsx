import React, {useCallback, useState} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {color: '#303f9f'},
        defaultButton: {
            display: 'flex',
            alignItems: 'center',
            color: '#000',
        }
    }), {index: 1}
)

interface DialogProps {
    clickHandler: (event: any) => void
    title: string
    text: string
    externalButtonStyle?: any
}

export const CustomDialog = (Props: DialogProps) => {
    const [open, setOpen] = useState(false)
    const styles = useStyles()

    const handleClickOpen = useCallback( (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        setOpen(true)
    }, [setOpen])

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Button
                className={Props.externalButtonStyle ? Props.externalButtonStyle : styles.defaultButton}
                color="primary"
                onClick={handleClickOpen}
            >
                {Props.title}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{Props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{Props.text}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button classes={{textPrimary: styles.button}} onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button
                        classes={{textPrimary: styles.button}}
                        onClick={(event: any) => {
                            handleClose()
                            Props.clickHandler(event)
                        }}
                        color="primary"
                        autoFocus
                    >
                        OK!
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

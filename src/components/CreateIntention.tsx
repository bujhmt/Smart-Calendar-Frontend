import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import ChipInput from 'material-ui-chip-input'
import moment from 'moment'
import { Intention } from '../models/Intention'
import {MsgStates, MsgProps } from './CustomMsg'
import clientApi from "../api";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
            color: '#fff',
        },
        submitButton: { color: '#303f9f' },

        fieldWrapper: {
            width: '100%',
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
        },

        dateWrapper: {
            display: 'flex',
            justifyContent: 'space-evenly',
        },
    }), {index: 1}
)

export const CreateIntentionDialog = (Props: { refreshPageFunc?: () => any, setMsg?: React.Dispatch<React.SetStateAction<MsgProps>>}) => {

    const styles = useStyles()
    const [open, setOpen] = useState(false)
    const [titleErr, setTitleErr] = useState(false)
    const [submitDisabled, setSubmitDisabled] = useState(true)

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [importance, setImportance] = useState<number>(2)
    const [chips, setChips] = useState<Array<string>>([])
    const [selectedDate, setSelectedDate] = useState(new Date().setDate(new Date().getDate() + 1))

    const handleTitleChange = (title: string) => {
        if (title.length < 3) setTitleErr(true)
        else setTitleErr(false)
        setTitle(title)
    }

    const handleDateChange = (date: any) => {
        setSelectedDate(date)
    }

    const handleChips = (newChips: Array<string>) => {
        setChips(newChips)
    }

    const handleClickOpen = () => {
        setOpen(true)
        setSubmitDisabled(true)
    }

    const handleClose = () => {
        setTitleErr(false)
        setSubmitDisabled(true)
        setOpen(false)
    }

    useEffect(() => {
        if (
            title.length < 3 ||
            !moment(selectedDate, true).isValid() ||
            moment(selectedDate, true).isBefore()
        )
            setSubmitDisabled(true)
        else setSubmitDisabled(false)
    }, [title, selectedDate])

    const handleSubmit = async () => {
        try {
            const [date, time] = moment(selectedDate, true).format('DD-MM-YYYY HH:mm:ss').split(' ')
            const newIntention: Intention = {
                title,
                description,
                date,
                time,
                importance,
                tags: chips,
                fileLinks: [],
            }
            const message = await clientApi.createIntention(newIntention)
            if (Props.setMsg) Props.setMsg({ text: message, type: MsgStates.Success, isOpen: true })
    
            setOpen(false)
            if (Props.refreshPageFunc) await Props.refreshPageFunc()    
        } catch(err) {
            if (Props.setMsg) Props.setMsg({ text: err.message, type: MsgStates.Error, isOpen: true })
        }
    }

    return (
        <>
            <Button
                classes={{ textPrimary: styles.button }}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
            >
                New Intention
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create new intention</DialogTitle>
                <DialogContent>
                    <TextField
                        error={titleErr}
                        helperText={titleErr ? 'Incorrect entry' : ''}
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        onChange={(event: any) => {
                            handleTitleChange(event.target.value)
                        }}
                    />
                    <div className={styles.dateWrapper}>
                        <KeyboardDatePicker
                            margin="normal"
                            autoOk
                            animateYearScrolling
                            id="date-picker-dialog"
                            label="Date"
                            format="dd-MM-yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            disablePast
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Time"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            autoOk
                            ampm={false}
                        />
                    </div>
                    <TextField
                        id="filled-multiline-static"
                        multiline
                        rows={2}
                        label="Description"
                        type="text"
                        fullWidth
                        onChange={(event: any) => {
                            setDescription(event.target.value)
                        }}
                    />
                    <div className={styles.fieldWrapper}>
                        <Typography id="discrete-slider" gutterBottom>
                            Importance
                        </Typography>
                        <Slider
                            defaultValue={2}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={5}
                            onChange={(event: any, number: any) => {
                                setImportance(number)
                            }}
                        />
                    </div>
                    <div className={styles.fieldWrapper}>
                        <Typography id="discrete-slider" gutterBottom>
                            Tags
                        </Typography>
                        <ChipInput defaultValue={['remind']} onChange={handleChips} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        classes={{ textPrimary: styles.submitButton }}
                        onClick={handleClose}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        size="large"
                        className={styles.button}
                        classes={{ textPrimary: styles.submitButton }}
                        startIcon={<SaveIcon />}
                        disabled={submitDisabled}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

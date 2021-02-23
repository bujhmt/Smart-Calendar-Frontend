import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Intention } from '../models/Intention'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment'
import { MsgStates, MsgProps } from './CustomMsg'
import clientApi from '../api'

const useStyles = makeStyles(
    {
        root: {
            maxWidth: '95%',
            marginTop: 15,
            marginRight: 10,
            marginLeft: 10,
        },

        intentionTitleWrapper: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    },
    { index: 1 }
)

interface IntentionComponentProps {
    intention: Intention
    refreshPageFunc?: () => any
    setMsg?: React.Dispatch<React.SetStateAction<MsgProps>>
}

export const IntentionComponent = (Props: IntentionComponentProps) => {
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(false)
    const styles = useStyles()

    const handleDelete = async () => {
        setIsDeleteDisabled(true)

        try {
            const message = await clientApi.deleteIntentionById(String(Props.intention._id))
            if (Props.setMsg) Props.setMsg({ text: message, type: MsgStates.Success, isOpen: true })
        } catch (err) {
            if (Props.setMsg) Props.setMsg({ text: err.message, type: MsgStates.Success, isOpen: true })
        }
        if (Props.refreshPageFunc) Props.refreshPageFunc()
        setIsDeleteDisabled(false)
    }

    return (
        <>
            <Card className={styles.root} style={{ backgroundColor: '#ffecb3' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        <div className={styles.intentionTitleWrapper}>
                            <div>{Props.intention.title}</div>
                            <div>
                                {moment(
                                    Props.intention.date + Props.intention.time,
                                    'DD/MM/YYYY HH:mm'
                                ).format('dddd Do MMMM, YYYY HH:mm')}
                            </div>
                        </div>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {Props.intention.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton
                        disabled={isDeleteDisabled}
                        size="medium"
                        color="secondary"
                        aria-label="delete"
                        onClick={handleDelete}
                    >
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </>
    )
}

import React, {useCallback, useContext, useState} from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import Avatar from "@material-ui/core/Avatar"
import {Button} from "@material-ui/core"
import {CustomLoading} from "./CustomLoading"
import clientApi from "../api"
import {MsgProps, MsgStates} from "./CustomMsg"
import {AuthContext} from "../context/AuthContext";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto'
        },
        avatar: {
            width: theme.spacing(15),
            height: theme.spacing(15),
            cursor: 'pointer',
            borderRadius: 60,
            border: '2px solid #303f9f',
        },
    }), {index: 1}
)

export const ProfileForm = (Props: { setMsg?: React.Dispatch<React.SetStateAction<MsgProps>> }) => {
    const [ava, setAva] = useState<File | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const styles = useStyles()
    const {setUserData} = useContext(AuthContext)

    const handleSubmit = useCallback(async (event: React.MouseEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            setLoading(true)
            if (ava) {
                const response = await clientApi.uploadFiles(ava)
                if (response) {
                    clientApi.userData.avaUrl = response.url
                    const message = await clientApi.updateUserData()
                    setUserData({...clientApi.userData})
                    if (Props.setMsg) Props.setMsg({text: message, type: MsgStates.Success, isOpen: true})
                }
            }
        } catch (err) {
            if (Props.setMsg) Props.setMsg({text: err.message, type: MsgStates.Error, isOpen: true})
        }
        setLoading(false)
    }, [ava, setLoading, Props, setUserData])

    const handleChooseAvatar = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files)
            setAva(event.currentTarget.files[0] ?? null)
    }, [setAva])

    return (
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
            <input
                accept="/"
                id="file-picker"
                type="file"
                hidden={true}
                onChange={handleChooseAvatar}
            />
            <label htmlFor="file-picker">
                {loading ?
                    <CustomLoading size={80}/> :
                    <Avatar alt="User Avatar" src={ ava ? URL.createObjectURL(ava): clientApi.userData.avaUrl} className={styles.avatar}/>
                }
            </label>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
            >
                Submit
            </Button>
        </form>
    )
}

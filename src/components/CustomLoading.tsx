import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
    loading: {
        color: '#ef6c00',
    },
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10%'
    }
}), {index: 1})

interface ILoading {
    size?: number | string
}

export const CustomLoading = ({size = 40}: ILoading) => {
const styles = useStyles()

    return (
        <div className={styles.root}>
            <CircularProgress disableShrink size={size} className={styles.loading}/>
        </div>
    )
}

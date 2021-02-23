import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { useHistory } from 'react-router-dom'
import { CustomDialog } from './CustomDialog'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { CustomMenu } from './CustomMenu'
import clsx from 'clsx'
import { AuthContext } from '../context/AuthContext'
import clientApi from '../api'
import { Today } from '@material-ui/icons'

export const useStyles = makeStyles(
    (theme: Theme) =>
        createStyles({
            barItemsEnd: {
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
            },

            button: {
                color: '#fff !important',
            },

            barItem: {
                marginRight: 20,
            },

            logoWrapper: {
                marginLeft: 20,
            },

            avatar: {
                width: theme.spacing(6),
                height: theme.spacing(6),
                marginRight: 20,
            },

            menuButton: {
                minWidth: 100,
                padding: '10px 20px 10px 20px',
                display: 'flex',
                alignItems: 'center',
                color: '#000',
            },

            logoutButton: {
                color: '#ff3d00',
                width: theme.spacing(5),
                height: theme.spacing(5),
            },

            logo: {
                cursor: 'pointer',
                width: theme.spacing(5),
                height: theme.spacing(5),
            },
        }),
    { index: 1 }
)

export const NavBar = () => {
    const styles = useStyles()
    const history = useHistory()
    const { userData } = useContext(AuthContext)
    const { setIsAuthenticated } = useContext(AuthContext)

    const logoutHandler = (event: any) => {
        event.preventDefault()
        clientApi.logout()
        setIsAuthenticated(false)
        history.push('/')
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Button
                    className={clsx(styles.menuButton, styles.button)}
                    color="primary"
                    onClick={() => {
                        history.push('/main')
                    }}
                    startIcon={<Today className={styles.logo} />}
                >
                    Smart Calendar
                </Button>
                <div className={styles.barItemsEnd}>
                    <Button
                        className={styles.barItem}
                        classes={{ textPrimary: styles.button }}
                        color="primary"
                        onClick={() => {
                            history.push('/intentions')
                        }}
                    >
                        Intentions
                    </Button>
                    <CustomMenu
                        externalComponent={
                            <Button
                                className={styles.barItem}
                                classes={{ textPrimary: styles.button }}
                                color="primary"
                                endIcon={
                                    <Avatar
                                        alt="User Avatar"
                                        src={userData.avaUrl}
                                        className={styles.avatar}
                                    />
                                }
                            >
                                {userData.fullname ? userData.fullname : userData.email}
                            </Button>
                        }
                        items={[
                            <Button
                                className={styles.menuButton}
                                color="primary"
                                onClick={() => {
                                    history.push('/profile')
                                }}
                            >
                                Profile
                            </Button>,
                            <CustomDialog
                                externalButtonStyle={clsx(styles.menuButton, styles.logoutButton)}
                                clickHandler={logoutHandler}
                                title={'Logout'}
                                text={'Are you sure you want to get out?'}
                            />,
                        ]}
                    />
                </div>
            </Toolbar>
        </AppBar>
    )
}

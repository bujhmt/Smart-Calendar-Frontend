import React, { useState, useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { newId } from '../utils/newId'

const useStyles = makeStyles(
    (theme: Theme) => ({
        element: {
            padding: '0 !important',
            display: 'flex',
            justifyContent: 'center',
        },
        root: {
            left: '90% !important',
        },
    }),
    { index: 1 }
)

interface ICustomMenu {
    items: any[]
    externalComponent?: any
}

export const CustomMenu = (Props: ICustomMenu) => {
    const styles = useStyles()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [items, setItems] = useState<any[]>([])

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        if (Props.items && Props.items.length) setItems(Props.items)
    }, [Props.items])

    return (
        <>
            <div onClick={handleClick}>
                {Props && Props.externalComponent ? (
                    Props.externalComponent
                ) : (
                    <Button aria-controls="simple-menu" aria-haspopup="true">
                        Open Menu
                    </Button>
                )}
            </div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                classes={{ paper: styles.root }}
            >
                {items.map((item) => {
                    return (
                        <MenuItem className={styles.element} onClick={handleClose} key={newId()}>
                            {item}
                        </MenuItem>
                    )
                })}
            </Menu>
        </>
    )
}

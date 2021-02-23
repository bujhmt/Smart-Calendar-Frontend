import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { newId } from '../utils/newId'

interface TabPanelProps {
    children?: React.ReactNode
    index: any
    value: any
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

const useStyles = makeStyles(
    (theme: Theme) => ({
        root: {
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            height: 300,
            width: '80%',
            marginTop: '2%',
            borderRadius: 15,
            margin: 'auto',
            paddingTop: 10,
        },
        tabs: {
            borderRight: `1px solid ${theme.palette.divider}`,
        },
    }),
    { index: 1 }
)

interface ITab {
    label: string
    component: React.ReactNode
}

export default function CustomTabs(Props: { tabs: ITab[] }) {
    const { tabs } = Props
    const classes = useStyles()
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Custom vertical tabs"
                className={classes.tabs}
            >
                {tabs.map((tab, index) => (
                    <Tab key={newId()} label={tab.label} {...a11yProps(index)} />
                ))}
            </Tabs>
            {tabs.map((tab, index) => (
                <TabPanel value={value} index={index} key={newId()}>
                    {tab.component}
                </TabPanel>
            ))}
        </div>
    )
}

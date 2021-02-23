import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '15px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(26),
        fontWeight: theme.typography.fontWeightRegular,
    },
    accordin: {
        padding: '0 0 0 15px',
        marginRight: 0,
        paddingRight: 20,
    },
    accordinWrapper: {
        backgroundColor: '#f7f7f7 !important',
    },
    accordionTitleFocused: {
        backgroundColor: '#f7f7f7 !important',
    },
}), {index: 1})

interface AccordionProps {
    content: () => void
    title: string
    defaultExpanded?: boolean
    disabled?: boolean
    expanded?: boolean
}

export const CustomAccordion = (Props: AccordionProps) => {
    const styles = useStyles()
    const contentComponent: any = Props.content()

    return (
        <div className={styles.root}>
            <Accordion
                defaultExpanded={Props.defaultExpanded}
                disabled={Props.disabled}
                expanded={Props.expanded}
                className={styles.accordinWrapper}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={styles.accordin}
                    classes={{ focused: styles.accordionTitleFocused }}
                >
                    <Typography component={'span'} className={styles.heading}>{Props.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component={'span'}>{contentComponent}</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

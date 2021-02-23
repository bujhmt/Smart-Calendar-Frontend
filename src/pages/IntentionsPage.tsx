import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import { CustomAccordion } from '../components/CustomAccordion'
import { CreateIntentionDialog } from '../components/CreateIntention'
import { Intention } from '../models/Intention'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { CustomMsg, MsgStates, MsgProps } from '../components/CustomMsg'
import { IntentionComponent } from '../components/IntentionComponent'
import clientApi from '../api'

const useStyles = makeStyles(
    (theme: Theme) =>
        createStyles({
            newIntentionButtonWrapper: {
                position: 'fixed',
                paddingTop: 30,
                zIndex: 99999,
                left: '5%',
            },
            emptyPicture: {
                display: 'flex',
                justifyContent: 'center',
            },
            intentionsSeparator: {
                display: 'flex',
                justifyContent: 'space-between',
            },
            intentionsWrapper: {
                marginLeft: '20%',
                paddingTop: 15,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '50%',
            },
            img: {
                width: '100%',
            },
        }),
    { index: 1 }
)

export const IntentionsPage = () => {
    const styles = useStyles()
    const [msg, setMsg] = useState<MsgProps>({
        text: '',
        type: MsgStates.Info,
        isOpen: false,
    })

    const [intentions, setIntentions] = useState<Intention[]>([])

    const getData = useCallback(async () => {
        try {
            const intentions: any = await clientApi.getUserIntentions()
            setIntentions(
                intentions.sort((firstIntention: Intention, secondIntention: Intention) => {
                    return (
                        moment(firstIntention.date + firstIntention.time, 'DD/MM/YYYY HH:mm').valueOf() -
                        moment(secondIntention.date + secondIntention.time, 'DD/MM/YYYY HH:mm').valueOf()
                    )
                })
            )
        } catch (err) {
            setMsg({ text: err.message, type: MsgStates.Error, isOpen: true })
        }
    }, [setIntentions])

    // work with time
    const isToday = (intention: Intention): boolean => {
        return (
            moment(intention.date + intention.time, 'DD/MM/YYYY HH:mm') > moment() &&
            moment(intention.date, 'DD/MM/YYYY').isSame(moment(), 'day')
        )
    }

    const isFuture = (intention: Intention): boolean => {
        return (
            moment(intention.date, 'DD/MM/YYYY') > moment() &&
            !moment(intention.date, 'DD/MM/YYYY').isSame(moment(), 'day')
        )
    }

    const isPastIntentionsExists = (): boolean => {
        return !!intentions.find(
            (intention) => moment(intention.date + intention.time, 'DD/MM/YYYY HH:mm') < moment()
        )
    }

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <>
            <CustomMsg type={msg.type} text={msg.text} isOpen={msg.isOpen} setProps={setMsg} />
            <div className={styles.intentionsSeparator}>
                <div className={styles.intentionsWrapper}>
                    <CustomAccordion
                        title={'Past'}
                        content={() => {
                            return intentions.map((intention) => {
                                if (moment(intention.date + intention.time, 'DD/MM/YYYY HH:mm').isBefore()) {
                                    return (
                                        <IntentionComponent
                                            key={intention._id}
                                            intention={intention}
                                            refreshPageFunc={getData}
                                            setMsg={setMsg}
                                        />
                                    )
                                }
                                return null
                            })
                        }}
                        disabled={!isPastIntentionsExists()}
                        defaultExpanded={false}
                    />
                    <CustomAccordion
                        title={'Today'}
                        defaultExpanded
                        content={() => {
                            if (
                                !intentions.find((intention) => {
                                    return isToday(intention)
                                })
                            )
                                return (
                                    <div className={styles.emptyPicture}>
                                        <img alt="empty list" src="/empty.jpg" className={styles.img} />
                                    </div>
                                )
                            return intentions.map((intention) => {
                                if (isToday(intention)) {
                                    return (
                                        <IntentionComponent
                                            key={intention._id}
                                            intention={intention}
                                            refreshPageFunc={getData}
                                            setMsg={setMsg}
                                        />
                                    )
                                }
                                return null
                            })
                        }}
                    />
                    <CustomAccordion
                        title={'Future'}
                        content={() => {
                            if (
                                !intentions.find((intention) => {
                                    return isFuture(intention)
                                })
                            )
                                return (
                                    <div className={styles.emptyPicture}>
                                        <img alt="empty list" src="/empty.jpg" className={styles.img} />
                                    </div>
                                )
                            return intentions.map((intention) => {
                                if (isFuture(intention)) {
                                    return (
                                        <IntentionComponent
                                            key={intention._id}
                                            intention={intention}
                                            refreshPageFunc={getData}
                                            setMsg={setMsg}
                                        />
                                    )
                                }
                                return null
                            })
                        }}
                    />
                </div>
                <div className={styles.newIntentionButtonWrapper}>
                    <CreateIntentionDialog refreshPageFunc={getData} setMsg={setMsg} />
                </div>
            </div>
        </>
    )
}

import React, { useState } from 'react'
import CustomTabs from '../components/CustomTabs'
import { ProfileForm } from '../components/ProfileForm'
import { CustomMsg, MsgProps, MsgStates } from '../components/CustomMsg'

export const ProfilePage = () => {
    const [msg, setMsg] = useState<MsgProps>({
        text: '',
        type: MsgStates.Info,
        isOpen: false,
    })

    return (
        <div>
            <CustomMsg type={msg.type} text={msg.text} isOpen={msg.isOpen} setProps={setMsg} />
            <CustomTabs
                tabs={[
                    {
                        label: 'Profile',
                        component: <ProfileForm setMsg={setMsg} />,
                    },
                    {
                        label: 'Settings',
                        component: <h1>In dev...</h1>,
                    },
                ]}
            />
        </div>
    )
}

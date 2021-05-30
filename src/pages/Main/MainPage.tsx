import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs'

export const MainPage = () => {
    return (
        <>
            <Breadcrumb links={[
                {
                    url: '/',
                    title: 'Home',
                }
            ]}/>
            <h1>Welcome to Smart Calendar!</h1>
        </>
    )
}

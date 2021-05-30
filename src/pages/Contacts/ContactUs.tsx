import React from 'react'
import './index.scss'

export const ContactUsPage = () => {
    return (
        <>
            <section className='container column'>
                <div className='contact-block'>
                    <iframe
                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12380.406448086873!2d30.506784750681184!3d50.44734544062639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xbfd6af29bde32c99!2sBarduck!5e0!3m2!1sru!2sua!4v1622313035772!5m2!1sru!2sua'
                        width='400' height='300' loading='lazy' className='map'></iframe>
                    <div className='card-block'>
                        <p className='card-title'>Find us:</p>
                        <p className='card-text'>вулиця Тарасівська, 3, Київ</p>
                        <p className='card-text'>+380634153331</p>
                        <a href='https://www.barduck.com.ua/' className='card-text'>barduck.com.ua</a>
                    </div>
                </div>
                <div className='contact-block'>
                    <iframe
                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14672.998236954472!2d30.51239023807709!3d50.44389987606551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5b7ad696192c3a9d!2z0JHQsNGAICLQkdC10LfQtNC10LvRjNC90LjQutC4Ig!5e0!3m2!1sru!2sua!4v1622315385167!5m2!1sru!2sua'
                        width='400' height='300' loading='lazy' className='map'></iframe>
                    <div className='card-block'>
                        <p className='card-title'>Find us:</p>
                        <p className='card-text'>вулиця Саксаганського, 38, Київ</p>
                        <p className='card-text'>+380681583838</p>
                        <a href='https://m.facebook.com/bezdelnikiev/?locale2=ru_RU'
                           className='card-text'>m.facebook.com</a>
                    </div>
                </div>
            </section>
        </>
    )
}

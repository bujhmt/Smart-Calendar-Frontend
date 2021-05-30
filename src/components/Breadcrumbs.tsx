import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault()
    console.info('You clicked a breadcrumb.')
}

interface simpleLink {
    url: string,
    title: string,
}

export default function Breadcrumb(Props: {links: simpleLink[]}) {
    const {links} = Props;

    return (
        <Breadcrumbs aria-label='breadcrumb'>
            {links.map((link, index) => {
                if (index < links.length - 1) {
                    return (
                        <Link color='inherit' href={link.url} onClick={handleClick}>
                            {link.title}
                        </Link>
                    )
                } else {
                    return (
                        <Link
                            color='textPrimary'
                            href={link.url}
                            onClick={handleClick}
                            aria-current='page'
                        >
                            {link.title}
                        </Link>
                    )
                }
            })}
        </Breadcrumbs>
    )

}

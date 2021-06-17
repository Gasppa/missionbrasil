import React from 'react'
import { Link } from 'react-router-dom'
import '../views/public/home.css'

export default function HomeScreen(props) {
    return (
        <div>
            <div className="menu_noticias">
                <Link to={{
                    pathname: '/noticias',
                    state: props.state
                }}>
                    Noticias
                </Link>
            </div>
        </div>
    )
}

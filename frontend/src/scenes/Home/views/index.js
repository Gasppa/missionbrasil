import React, { useEffect } from 'react'
import { useLocation, useHistory } from 'react-router'
import HomeScreen from '../components/HomeScreen'

export default function Home() {
    const location = useLocation();
    const history = useHistory()

    const isTokenValid = () => {
        return location.state !== undefined && location.state.token !== ''
    }

    useEffect(() => {
       if(!isTokenValid()){
           alert('Você deve logar-se para acessar essa página.')
           history.push('/')
       }
    })

    return (
        <div>
            <HomeScreen state={{ ...location.state }}/>
        </div>
    )
}


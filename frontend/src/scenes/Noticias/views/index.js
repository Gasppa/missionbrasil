import React, { useEffect } from 'react'
import { useLocation, useHistory } from 'react-router'
import ListaNoticias from '../components/ListaNoticias'

export default function Noticias() {
    const location = useLocation();
    const history = useHistory()

    const isTokenValid = () => {
        return location.state !== undefined && location.state.token !== ''
    }

    const isRoleValid = () => {
        return location.state.role === 'ADMIN'
    }

    useEffect(() => {
       if(!isTokenValid() || !isRoleValid()){
           alert('Você não possui autenticação ou permissão para visualizar essa página.')
           history.push('/')
       }
    })

    return (
        <div>
            <ListaNoticias state={location.state}/>
        </div>
    )
}


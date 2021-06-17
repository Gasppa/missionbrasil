import React, { useEffect, useState } from 'react'
import CardNoticia from './CardNoticia'
import NoticiasForm from './NoticiasForm'
import axios from 'axios'
import '../views/public/noticias.css'

export default function ListaNoticias(props) {
    const [listaNoticias, setListaNoticias] = useState([])

    useEffect(() => {
        const fetchNoticias = async () =>{
            const apiKey = process.env.REACT_APP_API_KEY
            const headers = {
                'apikey': apiKey,
                'x-auth-token': props.state.token
            }
    
            try {
                const result = await axios.get(
                    'http://localhost:3010/api/get-noticias',
                    { headers: headers })
                setListaNoticias(result.data.noticias)
            } catch (error) {
                throw error
            }
        }

        fetchNoticias()
    },[])

    return (
        <div>
            <div className="table_noticias">
                <NoticiasForm location={props.state} listaNoticias={listaNoticias} setListaNoticias={setListaNoticias}/>
                {listaNoticias.map((noticia) => <CardNoticia title={noticia.title} description={noticia.description}/>)}
            </div>
        </div>
    )
}

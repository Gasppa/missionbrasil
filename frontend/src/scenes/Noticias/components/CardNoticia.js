import React from 'react'
import '../views/public/noticias.css'

function CardNoticia(props) {
    return (
        <div className="card-noticia">
            <div className="card-noticia_title">
                {props.title}
            </div>
            <div className="card-noticia_content">
                {props.description}
            </div>
        </div>
    )
}

export default CardNoticia

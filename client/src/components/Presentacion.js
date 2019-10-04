import React, {useEffect, useState} from 'react'

export default function Presentacion({cartelInfo, Artists}) {
const [imagen, setImg] = useState('')
  const lugar = cartelInfo._embedded.venues[0].name
  const estado = cartelInfo._embedded.venues[0].state.name
  const imagenes = cartelInfo.images
  const url = cartelInfo.url
  const {name} = cartelInfo
  const { localDate, localTime } = cartelInfo.dates.start
  useEffect( e => {
    imagenes.map(respuesta => {
 
      if ( respuesta.width > 900 && respuesta.height > 700){
        setImg(respuesta.url)
      }else{
        return
      }
    }) 

  }, [])


  return (
<div className="card cartel has-text-light">
  <div className="card-image">
    <figure className="image is-128x128px">
      <img src={imagen} alt={name}/>
    </figure>
  </div>

  <div className="card-content">
    <div className="media">
      <div className="media-content">
        <p className="title is-4 has-text-warning">{name}</p>
        <p className="subtitle is-6 has-text-link">@{Artists}</p>
      </div>
    </div>

    <div className="content is-1">
      <p className='describcion'>Precios: entre ${cartelInfo.priceRanges[0].min} y ${cartelInfo.priceRanges[0].max}. {lugar}, {estado}.  </p>
      <a className="button is-link" href={url}>Buscar Boletos</a>
      <br/>
      <time className="has-text-light date"> Fecha: {localTime} - {localDate}</time>
    </div>
  </div>
</div>
  )
}

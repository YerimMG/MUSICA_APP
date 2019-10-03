import React from 'react'

export default function Cancion({cancionInfo}) {
  const {songName, album, images, authors, albumURL, songURL} = cancionInfo
  const authorsNames = authors.map( res => {
    return res.name
  })

  return (

<div className=" cardSong card column">
 <div className="card-image ">
   <img src={images[1].url}  alt={songName}/>
  </div>
  <h4 className="title has-text-white is-Roboto Condensed">{songName}</h4>
  <h5 className="title has-text-white is-Roboto Condensed is-size-6 ">Album: {album}</h5>
  
  <div className="card-footer ">
        <div className="botones">
        {
    authorsNames.forEach( e => {
      return console.log

    })
  }
        <a className="button is-success" href={albumURL}> Descubrir el Álbum</a>
        <a className="button is-success" href={songURL}> Escuchar la Canción</a>
       
        </div>
  </div>
</div>









  )
}

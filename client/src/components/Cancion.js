import React from 'react'

export default function Cancion({cancionInfo}) {
  const {songName, album, images, authors, albumURL, songURL} = cancionInfo
  const authorsNames = authors.map( res => {
    return res.name
  })

  return (
    <div>
      <a href={albumURL}>
      <img alt={songName} src={images[1].url} />
      </a>
      <p><a href={songURL}>{songName}</a>, del album {album}{
        authorsNames.map((res, i) => {
             return `, ${res}`
        })
        }</p>
    </div>
  )
}

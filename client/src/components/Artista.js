import React from 'react'

export default function Artista({artista}) {
  // console.log(artista.images[2].url)
  const {name} = artista
  return (
<div class="card">
  <div>
   <img src={artista.images[1].url}alt="Placeholder image"/>
  </div>
  <div>
    <p>{name}</p>
  </div>
</div>

  )
}


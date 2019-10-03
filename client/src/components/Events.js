import React, {useState} from 'react'
import Presentacion from "./Presentacion"

export default function Events({event}) {


  const [eventos] = useState([event.events[0]])
  const presentaciones = event.events[0].events
  const texto = eventos[0].events[0].info
  
  return (
    <div className="ArtistPresentacions">
       <h3 className="namePrinc" > {event.name}</h3>

          <p className="has-text-justified txtInfo">{texto}</p>
      <div className="eventInfo columns">

        {  
          presentaciones.slice(0,4).map((res, i) => {
             return <Presentacion key= {i} cartelInfo = {res} Artists={event.name}></Presentacion>
          })
        }
      </div>
     </div>

  )
}

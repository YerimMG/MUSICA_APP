import React, {useEffect, useState} from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
//Componentes 
import Events from './Events'


export default function ConcertsByArtists({token}) {
const [events, setEvents] = useState([])
const [check, setCheck] = useState(false)


const urlTM = async () => {
const timer = [1,2,3,4,5,6,7,9,10,11,12,13,14,15]
    timer.forEach((response, i) => {
      setTimeout( async () => {
        try {
          let url = `https://shielded-crag-67706.herokuapp.com/ticketMaster/${token}`
          const res = await axios.get(url)
          const info = res.data[0].events
          setEvents(info)
          setCheck(true)
        } catch (error) {
          return <Redirect to='/login'/>;
        }
      }, 3000 * i)
    }) 
} 


  useEffect( () => {
   
    urlTM()
  }, [ events ])


  return (
    <div >
      
        <ul>
          {check ? events.map((e,i) => {
            return <Events key={i} event={e} />
          }) : <h1>No hay conciertos, pero no te apures, estamos al pendiente  <span  role="img" >😉</span> </h1>}
        </ul>
    </div>
  )
}

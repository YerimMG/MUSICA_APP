import React, {useEffect, useState} from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default function ConcertsByArtists({userArtists,token}) {
const [events, setEvents] = useState([])
const [check, setCheck] = useState(false)


const urlTM = async () => {
const timer = [1,2,3,4,5,6,7,9,10,11,12,13,14,15]
  timer.forEach((response, i) => {
    setTimeout( async () => {
      try {
        let url = `http://localhost:3000/ticketMaster/${token}`
        const res = await axios.get(url)
        const info = res.data[0].events
        setEvents(info)
        setCheck(true)
      } catch (error) {
        return <Redirect to='/login'/>;
      }
    }, 1000 * i)
  }) 
  
} 


  useEffect( () => {
   
    urlTM()
  }, [])


  return (
    <div>
      <h3>Hola desde concerts Artists</h3>
      <ul>
        {check ? events.map((e,i) => {
          return <li key={i}>{e.events[0].name} </li>
        }) : '...'}
      </ul>
    </div>
  )
}

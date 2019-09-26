import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Consumer_Key = 'Qb6pA8Oldl61grNVvrMAold4UdZPBokz'
const Consumer_Secret = 'oQ22NIDQpZtxBfcS'

export default function ConcertsByArtists({userArtists}) {
  // console.log(userArtists)
  const [info, setInfo] = useState({})
 console.log(userArtists)
  // const apiTM = () => {
  //   // userArtists.map( async (art) => {
  //   //   const res = await axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=${Consumer_Key}&keyword=${art.name}&locale=*&countryCode=MX`)
  //   //   try {
  //   //   const info = await [res.data]
  //   //   console.log(info)
  //     // const setinfo = info.map(res => { 
  //     //   if (res.page.totalElements >= 1 ){
  //         // return {events: res._embedded || null, link: res._links.self.href}
  //     //   }
  //     // })
  //   // setInfo(setinfo)
  //   } catch (error) {
  //       console.log(error)
  //     }

  //     })
  // }

  // apiTM()
  return (
    <div>
      <h3>Hola desde concerts Artists</h3>
      <ul>
        {userArtists.map((e,i) => {
          return <li key={i}>{e.name}</li>
        })}
      </ul>
    </div>
  )
}

// {…}
// ​
// _embedded: {…}
// ​​
// events: (4) […]
// ​​​
// 0: {…}
// ​​​​
// _embedded: {…}
// ​​​​​
// attractions: (1) […]
// ​​​​​​
// 0: Object { name: "The Raconteurs", type: "attraction", id: "K8vZ9175MNf", … }
// ​​​​​​
// length: 1
// ​​​​​​
// <prototype>: Array []
// ​​​​​
// venues: (1) […]
// ​​​​​​
// 0: Object { name: "El Plaza Condesa", type: "venue", id: "KovZpZAJnJeA", … }
// ​​​​​​
// length: 1
// ​​​​​​
// <prototype>: Array []
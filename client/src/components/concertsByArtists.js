import React from 'react'
// import axios from 'axios'

// const Consumer_Key = 'Qb6pA8Oldl61grNVvrMAold4UdZPBokz'
// const Consumer_Key2 = '8vC67wFZzHEalRTSX6GFZAWcUGeYFAOD'
// const Consumer_Key3 = 'll2A7sGoANTI9jzxf2HtywdUm8JGp32V'
// const Consumer_Secret = 'oQ22NIDQpZtxBfcS'

export default function ConcertsByArtists({userArtists}) {

  // const [ artists, setartists ] = useState([])
  // const [ Links, setLinks ] = useState([])
  

  // useEffect( () => {

  // const apiTM = () => {
  //   userArtists.forEach( async (art) => {
  //     const arr = art.name.replace(' ','+')
  //     const ar1 = arr.replace(' ', '+')
  //     const ar2 = ar1.replace(' ', '+')
  //     const ar3 = ar2.replace(' ', '+')
  //     const ar4 = ar3.replace(' ', '+')
  //     const ar5 = ar4.replace(' ', '')
  //     // console.log(ar5)
  //     // console.log(`https://app.ticketmaster.com/discovery/v2/events?apikey=${Consumer_Key2}&keyword=${ar4}&countryCode=MX`)
  //     const res = await axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=${Consumer_Key}&keyword=${ar5}&countryCode=MX`)
  //     // console.log(res)
  //     // const res = `https://app.ticketmaster.com/discovery/v2/events?apikey=${Consumer_Key}&keyword=${ar5}&countryCode=MX`
  //     // console.log(res)
  //       try {
  //       const info = await [res.data]
  //       const setinfo = await info.map(res => { 
  //           return {events: res._embedded || null, link: res._links.self.href}
  //           })
  //       console.log(setinfo)
  //       // setartists(setinfo)

  //     } catch (error) {
  //         console.log(error)
  //       }
  //     })}

  //   apiTM() 
    
  // }, [ userArtists ])


  return (
    <div>
      <h3>Hola desde concerts Artists</h3>
      <ul>
        {userArtists.slice(0,10).map((e,i) => {
          return <li key={i}>{e.name}</li>
        })}
      </ul>
    </div>
  )
}

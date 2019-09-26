// import React, {useState, useEffect} from 'react'
// import axios from 'axios'


// //Componentes 
// import ConcertsByArtists from './concertsByArtists'

// export default function SuccesRoute({userInfo}) {

//   // const UserInfo = userInfo.userInfo

//   //All the user Artists
//   const [ userArtists, setUserArtist] = useState([])
//   //All the user Tracks
//   const [ userTracks, setUsertraks  ] = useState([])
//   //top 10 artists
//   const [ topTenArtists, setTopTenArt  ] = useState([])
//   //top 10 songs
//   const [ topTenSongs, setTopSongs  ] = useState([])
//   //get genres
//   const [ genres, setGenres  ] = useState([])

//     //Obtener Token
//     let params = new URLSearchParams(window.location.search);
//     let tokenUser  = params.get('token')
//   //Guardar en Local Storage
//     localStorage.setItem('tokenUser', JSON.stringify(tokenUser))
//   //obtener token del localStorage
//     let token = JSON.parse(localStorage.getItem('tokenUser'))

//   //Consultar api's
//     const urlArtists = async () =>{
//         const res = await axios.get(`http://localhost:3000/info/${token}/Artists`);
//         const allInfo = await res.data[0].items;
//         const arr = allInfo.map(res =>{
//           return {name: res.name, images: res.images}
//         }); 
//       setUserArtist(arr)
//         //get top ten
//           const topTen = await arr.slice(0,10);
//           setTopTenArt(topTen);
//         //get genres
//           const allGenres = allInfo.map(resp => { 
//             return resp.genres
//           })  
        
//           const genresArr = allGenres.flat(1)
//           const filterGenders = [...new Set(genresArr)]
//           setGenres(filterGenders)

//           const tracks = await axios.get(`http://localhost:3000/info/${token}/tracks`);
//           const getInfo = await tracks.data.items;
//           const array = getInfo.map(res =>{
//             return  res.name
//           });      
//         setUsertraks(array)
//         //Get top ten Songs
//           const topten = array.slice(0,10);
//           setTopSongs(topten)
//     }

//  useEffect( () => {
//       urlArtists()
//   }, [])



//     return (
//       <div>
//         <h2> Estos son los conciertos que te pueden interesar</h2 >
//           <p>Tu top 10 de artistas: </p>
//             <ul>
//               {topTenArtists.map((resp, i) => 
//                 <li key={i}>{resp.name}</li>
//               )}
//             </ul>
//             <p>Tu top 10 de canciones: </p>
//             <ul>
//               {topTenSongs.map((resp, i) => 
//                 <li key={i}>{resp}</li>
//               )}
//             </ul>
//             <h4>conciertos por artista </h4>
//             <ConcertsByArtists userArtists = {userArtists}/>
//             <p>conciertos por genero </p>
//       </div>
//     )
// }


import React, { Component } from 'react'
import axios from 'axios'
import ConcertsByArtists from './concertsByArtists'



export class ComponentePrincipal extends Component {
  state ={
    userArtists: [{
      name:   '',
      images: [],
    }],
    userTracks: []
}

componentDidMount() {
  //Obtener Token
    let params = new URLSearchParams(window.location.search);
    let tokenUser  = params.get('token')
  //Guardar en Local Storage
    localStorage.setItem('tokenUser', JSON.stringify(tokenUser))
  //obtener token del localStorage
    let token = JSON.parse(localStorage.getItem('tokenUser'))

    const getApi = async () => {
      const res = await axios.get(`http://localhost:3000/info/${token}/Artists`);
      
      const allInfo = await res.data[0].items;
      const arr = allInfo.map(res =>{
        return {name: res.name, images: res.images}
      }); 
      this.setState({
        userArtists: arr
      })


      const tracks = await axios.get(`http://localhost:3000/info/${token}/tracks`);
        const getInfo = await tracks.data.items;
        const array =  getInfo.map(res =>{
          return  res.name
        });
        this.setState({
          userTracks: array
        })
      }
        
    getApi()
  }
  



  render() {  
    
    // console.log(this.state)
    return (
      <div>
         <h2> Estos son los conciertos que te pueden interesar</h2 >
          <p>Tu top 10 de artistas: </p>
            <ul>
               {this.state.userArtists.slice(0,10).map((resp, i) => 
                <li key={i}>{resp.name}</li>
              )}
            </ul>
            <p>Tu top 10 de canciones: </p>
            {/* <ul>
              {topTenSongs.map((resp, i) => 
                <li key={i}>{resp}</li> 
              )}
            </ul> */}
            <h4>conciertos por artista </h4>
            <ConcertsByArtists userArtists = {this.state.userArtists}/>
            <p>conciertos por genero </p>
      </div>
    )
  }
}

export default ComponentePrincipal

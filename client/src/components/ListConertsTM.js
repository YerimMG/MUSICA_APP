import React, {useState, useEffect} from 'react'
import axios from 'axios'


export default function SuccesRoute() {
  //All the user Artists
  const [ userArtists, setUserArtist] = useState([])
  //All the user Tracks
  const [ userTracks, setUsertraks  ] = useState([])
  //top 10 artists
  const [ topTenArtists, setTopTenArt  ] = useState([])
  //top 10 songs
  const [ topTenSongs, setTopSongs  ] = useState([])
  //get genres
  const [ genres, setGenres  ] = useState([])  


 useEffect( () => {
    //Obtener Token
      let params = new URLSearchParams(window.location.search);
      let tokenUser  = params.get('token')
    //Guardar en Local Storage
      localStorage.setItem('tokenUser', JSON.stringify(tokenUser))
    //obtener token del localStorage
      let token = JSON.parse(localStorage.getItem('tokenUser'))

    //Consultar api Artists
      const urlArtists = async () =>{
          const res = await axios.get(`http://localhost:3000/info/${token}/Artists`);
          const allInfo = res.data[0].items;
          const arr = allInfo.map(res =>{
            return {name: res.name, images: res.images}
          }); 
        setUserArtist(arr)
          //get top ten
            const topTen = arr.slice(0,10);
            setTopTenArt(topTen);
          //get genres
            const allGenres = allInfo.map(resp => { 
              return resp.genres
            })  
            
            const genres = allGenres.flat(1)
            setGenres(genres)
      }

      //Consultar api tracks
      const urltracks = async () => {
          const res = await axios.get(`http://localhost:3000/info/${token}/tracks`);
          const allInfo = res.data.items;
          const arr = allInfo.map(res =>{
            return  res.name
          });      
        setUsertraks(arr)
        //Get top ten Songs
          const topten = arr.slice(0,10);
          setTopSongs(topten)
      }

      urlArtists()
      urltracks()
  }, [])
  

    return (
      <div>
        <h2> Estos son los conciertos que te pueden interesar</h2 >
          <p>Tu top 10 de artistas: </p>
            <ul>
              {topTenArtists.map((resp, i) => 
                <li key={i}>{resp.name}</li>
              )}
            </ul>
            <p>Tu top 10 de canciones: </p>
            <ul>
              {topTenSongs.map((resp, i) => 
                <li key={i}>{resp}</li>
              )}
            </ul>
      </div>
    )
}

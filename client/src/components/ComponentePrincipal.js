
import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'


//Componentes 
import ConcertsByArtists from './concertsByArtists'
import Artista from './Artista'
import Cancion from './Cancion'

export default function SuccesRoute({userInfo, token}) {
  //All the user Artists
  const [ userArtists, setUserArtist] = useState([])
  //All the user Tracks
  const [ userTracks, setUsertraks  ] = useState([])

     //Consultar api's
       const urlArtists = async () =>{
        const res = await axios.get(`http://localhost:3000/info/${token}/Artists`);
        const allInfo = await res.data[0].items;
        const arr = allInfo.map(res =>{
          return {name: res.name, images: res.images}

        }); 
        setUserArtist(arr)
      }

      const getUserTracks = async () => {
        const tracks = await axios.get(`http://localhost:3000/info/${token}/tracks`);
        const getInfo = await tracks.data.items;
        const array = getInfo.map(res =>{
        const authors = res.artists.map(res => {
            return res
          })
          return {songName: res.name, 
                  album: res.album.name, 
                  images: res.album.images, 
                  albumURL: res.album.external_urls.spotify, 
                  songURL: res.external_urls.spotify,
                  authors: authors
                 }
        });      
        setUsertraks(array)
      }

      // EJECUTAR APIS
      useEffect( () => {
          if (userArtists === undefined || userTracks === undefined){
            window.location.reload()
          }
            urlArtists()
            getUserTracks()
        }, [   ])
        
    return (
      <Fragment>
      <div className="componentePrincipal">
        <div className="container">
          <h2>{userInfo.display_name}, tus MÚSICOS favoritos son! </h2>
            {userArtists.slice(0,10).map((resp, i) => 
              <Artista key ={i} artista={resp}></Artista>
            )}
        </div>

            <h2>Tus Canciones favoritas! </h2>
            <h3>
              Da click en la portada del álbum para descubrir mas canciones o
              en el nombre de la cancion para escucharla directamente en spotify!
            </h3>

              {userTracks.slice(0,10).map((resp, i) => 
                 <Cancion key={i} cancionInfo = {resp}/>
              )}
          
           
            <h2>conciertos por artista </h2>
            <ConcertsByArtists userArtists = {userArtists}/>
           
      </div>
      </Fragment>
    )
}
  
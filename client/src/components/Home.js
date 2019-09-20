import React, {useEffect, useState} from 'react'
import axios from 'axios'


export default function SuccesRoute() {
  const [info, setInfo] = useState('hola')

  // useEffect(() => {
  //       //Consultar API
  //       const url = async () => {
  //       const res = await axios.get( 'https://accounts.spotify.com/api/token')
  //       //Actualiza el State
  //       setInfo(res.data)
  //       console.log(res)
  //       }
  //       url()
  //       console.log(info)
  // });

  return (
    <div>
      <h1> HOME!!! </h1>
    </div>
  )
}

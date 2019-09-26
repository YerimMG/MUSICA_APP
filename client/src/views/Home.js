//Este es el componente que tiene la informacion del usuario, NavBar y Footer

import React, {useEffect, useState} from 'react'
import axios from 'axios'
//COMPONENTES
import ComponentePrincipal from '../components/ComponentePrincipal'

export default function SuccesRoute() {
  const [ userInfo, setUserInfo ] = useState([])




  useEffect( () => {
    //Obtener Token
      let params = new URLSearchParams(window.location.search);
      let tokenUser  = params.get('token')
    //Guardar en Local Storage
      localStorage.setItem('tokenUser', JSON.stringify(tokenUser))
    //obtener token del localStorage
      let token = JSON.parse(localStorage.getItem('tokenUser'))
    //Consultar api info del usuario
      const url = async () =>{
        const res = await axios.get(`http://localhost:3000/info/${token}`)
        try {
          setUserInfo(res.data[0])
        }
        catch(err) {
          console.log(err)
        }
      }
      url()
  }, [])
  
  return (
    <div>
      <h1> Bienvenido {userInfo.display_name}!!</h1>
      <ComponentePrincipal
      userInfo = {userInfo}
      />
    </div>
  )
}


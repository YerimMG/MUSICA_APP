//Este es el componente que tiene la informacion del usuario, NavBar y Footer

import React, {useEffect, useState, Fragment} from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Logo from '../images/musicAPP-08.png'
//COMPONENTES
import ComponentePrincipal from '../components/ComponentePrincipal'

export default function SuccesRoute() {
    //Obtener Token
      let params = new URLSearchParams(window.location.search);
      let tokenUser  = params.get('token')
    //Guardar en Local Storage
      localStorage.setItem('tokenUser', JSON.stringify(tokenUser))
    //obtener token del localStorage
      let token = JSON.parse(localStorage.getItem('tokenUser'))

  const [ userInfo, setUserInfo ] = useState([])



  useEffect( () => {
    if (userInfo === undefined ){
      window.location.reload()
    }
    //Consultar api info del usuario
      const urls = async () =>{
        try {
          const res = await axios.get(`http://localhost:3000/info/${token}`)
          setUserInfo(res.data[0]) 
       
        }
        catch(err) {
          return <Redirect to='/login'/>;        }
      }
      urls()
  }, [ userInfo ])

  return (
    <Fragment>
      <div className='home'>  

        <div className='header' >
          <h1 > Hola {userInfo.display_name}!!</h1>
          <img src={Logo} alt=""/>
        </div>
 
      
        
          <ComponentePrincipal
          userInfo = {userInfo}
          token = {token}
          />

      </div>
    </Fragment>

  )
}


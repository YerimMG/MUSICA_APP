import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function () {
const [tester, setTester] = useState('hola')


useEffect(() => {
      //Consultar API
      const url = async () => {
      const res = await axios.get( 'http://localhost:3000/tester')
      //Actualiza el State
      setTester(res.data)
      }
      url()

});

const hola = () => {
  console.log("hola")
}


  return (
    <div>
      <h1>Hola desde login</h1>
      <p>Que dice el API: {tester}</p>
      
      <containter className='spotyButtons'>
      <a type="button" href="http://localhost:3000/login" className="spotyButton">INICIAR SECION CON SPOTIFY</a>
      <a type="button" href="http://localhost:3000/login" className="spotyButton">REGÍSTRATE CON SPOTIFY</a>
      </containter>
    </div>
  )
}









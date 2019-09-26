import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function () {
const [tester, setTester] = useState('hola')



  return (
    <div>
      <h1>Hola desde login</h1>
      <p>Que dice el API: {tester}</p>
      
      <containter className='spotyButtons'>
      <a type="button" href="http://localhost:3000/login" className="spotyButton"><i className="fab fa-spotify"></i> INICIAR SESIÓN CON SPOTIFY</a>
      <a type="button" href="http://localhost:3000/login" className="spotyButton"><i className="fab fa-spotify"></i> REGÍSTRATE CON SPOTIFY</a>
      </containter>
    </div>
  )
}









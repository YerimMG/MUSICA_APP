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
      console.log("spoty")

});


  return (
    <div>
      <h1>Hola desde Tester</h1>
      <p>Que dice el API: {tester}</p>
    </div>
  )
}









import React, {useState} from 'react'
import axios from 'axios'

export default function () {
const [tester, setTester] = useState('hola')



    //Consultar API
    const url = async () => {
    const res = await axios.get( 'http://localhost:3000/tester')
    //Actualiza el State
    setTester(res.data)
    }
    url()

  return (
    <div>
      <h1>Hola desde Tester</h1>
      <p>Que dice el API: {tester}</p>
    </div>
  )
}









import React, {Fragment, useState, useEffect} from 'react'
import Logo from '../images/musicAPP-09.png'
import Logo2 from '../images/musicAPP-07.png'

export default function () {
const [image, setImage ] = useState({frase: 'You are just like an angel, your skin makes me cry.', author: "Radiohead"})
const array =  [
  {frase: 'You are just like an angel, your skin makes me cry.', author: "Radiohead"}, 
  {frase: 'My world is a better place because of you.', author: "Celine Dion"}, 
  {frase: 'A falling star fell from your heart and landed in my eyes.', author: "Florence and the Machine"}, 
  {frase: 'I feel wonderful because I see the love light in your eyes.', author: "Eric Clapton"}, 
  {frase: 'Something in the way she moves, attracts me like no other lover.', author: "The Beatles"}, 
  {frase: 'Now I can`t think of air without thinking of you, I doubt that comes as a surprise. ', author: "Arctic Monkeys"}, 
  {frase: 'My rights, my wrongs; I write `til I`m right with God.', author: "Kendrick Lamar"}, 
  {frase: 'Dale', author: "Pitbull"}, 
  {frase: 'Ella usó mi cabeza como un revólver e incendió mi conciencia con sus demonios', author: "Soda Stereo'"}, 
  {frase: 'Aunque nos hagan la fama de que somos vendedores de la droga que sembramos, ustedes son consumidores', author: "Molotov"}, 
  {frase: 'Quisiera ser el aire que escapa de tu risa. ', author: "Alejandro Sanz"}
]
useEffect(() => {
  setInterval(() => {
    var item = array[Math.floor(Math.random()*array.length)]; 
    setImage(item)
  },3000)
}, [])
  
 
  return (
    <Fragment>
     <div className='parent'>
        <div  className='left' >
          <h1>MUSICAPP</h1>
          <img src={Logo} alt=""/>
          <h3>
          Bienvenido a la plataforma perfecta para 
          consultar conciertos que solo a ti te interesan!
          </h3>
          <containter className='spotyButtons'>
          <a type="button" href="http://localhost:3000/login" className="spotyButton secondary"><i className="fab fa-spotify"></i> INICIAR SESIÓN CON SPOTIFY</a>
          <a type="button" href="http://localhost:3000/login" className="spotyButton primary"><i className="fab fa-spotify"></i> REGÍSTRATE CON SPOTIFY</a>
          </containter>
        </div>

        <div className='right' >
        <img src={Logo2} alt=""/>
          <h1>
          {image.frase}
          </h1>
          <p>"{image.author}"</p>
        </div>
    </div>

    </Fragment>
  )
}









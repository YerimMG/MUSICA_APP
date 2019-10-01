const express = require('express');
const router  = express.Router();
const axios   = require('axios')

//MODELS
const spotyUser         = require('../models/UserSpoty')
const spotyUserArtists  = require('../models/userArtists')
const spotyUserTracks   = require('../models/userTracks')

// const Consumer_Key = 'Qb6pA8Oldl61grNVvrMAold4UdZPBokz'
// const Consumer_Key2 = '8vC67wFZzHEalRTSX6GFZAWcUGeYFAOD'
const Consumer_Key3 = 'll2A7sGoANTI9jzxf2HtywdUm8JGp32V'
// const Consumer_Secret = 'oQ22NIDQpZtxBfcS'

//Ruta de prueba
router.get('/', (req, res) => {
  res.json('Listo perros!!')
})

// router.get('/:token', (req, res) => {
//   const {token} =req.params
//   let data = ''

//   spotyUser.find({access_token: token})
//     .then(user => { data = user[0].display_name
//      res.json(data)
//     })
//     .catch(err => res.status(404).send('User Not Found, error: ' + err))

  

// console.log('=====>',data)

// })

router.get('/:token', (req, res) => {
  const {token} =req.params
  const names = []

  spotyUser.find({access_token: token})
    .then(user => {
      const userName = user[0].display_name
      spotyUserArtists.find({display_name : userName})
        .then(e => {
          const nameList = e[0].items[35].name
          const nameOk = nameList.replace(' ', '+')
          const res = `https://app.ticketmaster.com/discovery/v2/events?apikey=${Consumer_Key3}&keyword=${nameOk}&locale=*&countryCode=MX`
          console.log(res)
        })
        .catch(err => res.status(404).send('Artists Model Not Found'))
    })
    .catch(err => res.status(404).send('User Not Found'))
})
module.exports = router;


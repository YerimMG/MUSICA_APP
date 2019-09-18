const express           = require("express");
const router            = express.Router();

//MODELS
const spotyUser         = require('../models/UserSpoty')
const spotyUserArtists  = require('../models/userArtists')
const spotyUserTracks  = require('../models/userTracks')

//PRIMERA PRUEBA CON POSTMAN
router.get('/', ( req,res,next ) => {
  res.json('okay')
})

//GET ALL THE USER INFO
router.get('/:id', (req, res, next) => {
  const { id } = req.params
  //jordymcrgd76
  spotyUser.find({ spotyId: id })
    .then(respuesta => res.json( respuesta ))
    .catch(err => res.json( err ))
})


//GET ALL THE USER ARTIST INFO (NAME AND IMG)

router.get('/:id/Artists', (req, res, next) => {
  const { id } = req.params

  spotyUserArtists.find({ spotyId: id })
    .then(Artists =>{ 
      res.json(Artists[0].items)
  }
    )
    .catch(err => res.json( err ))
// router.get('/:id/Artists', (req, res, next) => {
//   const { id } = req.params
//   const artistas = []
//   //jordymcrgd76
//   spotyUserArtists.find({ spotyId: id })
//     .then(Artists =>{ 
//       Artists[0].items.map(resp => {
//         artistas.push({name : resp.name, images: resp.images})
//       })
//       res.json(artistas)
//   }
//     )
//     .catch(err => res.json( err ))
// })
})


//GET ALL THE USER TRACKS INFO (NAME AND IMG)
router.get('/:id/tracks', (req, res, next) => {
  const { id } = req.params
  let tracks = ''

  spotyUserTracks.find({ spotyId: id })
  .then(respuesta => {
    respuesta.map(resp => {
      console.log(resp.items)
      tracks = resp.items
    })
    res.json(tracks)
    })
})




module.exports = router;
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
router.get('/:display_name', (req, res, next) => {
  const { display_name } = req.params
  //Jordy Bellamy
  spotyUser.find({ display_name: display_name })
    .then(respuesta => res.json( respuesta ))
    .catch(err => res.json( err ))
})


//GET ALL THE USER ARTIST INFO (NAME AND IMG)

router.get('/:display_name/Artists', (req, res, next) => {
  const { display_name } = req.params

  spotyUserArtists.find({ display_name: display_name })
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
router.get('/:display_name/tracks', (req, res, next) => {
  const { display_name } = req.params
  let tracks = ''

  spotyUserTracks.find({ display_name: display_name })
  .then(respuesta => {
    respuesta.map(resp => {
      tracks = resp.items
    })
    res.json(tracks)
    })
})




module.exports = router;
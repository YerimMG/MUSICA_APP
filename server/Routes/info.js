const express           = require("express");
const router            = express.Router();

//MODELS
const spotyUser         = require('../models/UserSpoty')
const spotyUserArtists  = require('../models/userArtists')
const spotyUserTracks  = require('../models/userTracks')
// const allArtists       = require('../models/Events')

//PRIMERA PRUEBA CON POSTMAN
// router.get('/', ( req,res,next ) => {
//   res.json('okay')
// })

//GET ALL THE USER TRACKS INFO (NAME AND IMG)
        // router.put('/artistas/array', (req, res, next) => {
        //   const array = []

        //     spotyUserArtists.findByIdAndUpdate()
        //       .then(resp => {
        //         resp.forEach(user => {
        //             const items = user.items
        //             items.forEach(res => {
        //               array.push(res.name)
        //             }) 
        //         })
        //         const filterGenders = [...new Set(array)]
        //         const newList = new allArtists
        //         newList.Artists = filterGenders
        //         newList.save()
        //         .then(respuesta => res.json(respuesta))
        //         .catch(err => res.status(404).send('Not Saved', err))
        //       })
        //       .catch(err => res.status(404).send('Model Not Found', err))
        // })



//GET ALL THE USER INFO
router.get('/:token', (req, res, next) => {
  const { token } = req.params
  spotyUser.find({ access_token: token })
    .then(respuesta => res.json( respuesta ))
    .catch(err => res.json( err ))
})


//GET ALL THE USER ARTIST INFO (NAME AND IMG)
router.get('/:token/Artists', (req, res, next) => {
  const { token } = req.params
  spotyUser.find({ access_token: token })
    .then(user =>{
      spotyUserArtists.find({ display_name: user[0].display_name})
      .then(e => {
        if (e) {
          res.json(e);
          return;
        }
        
        res.json([{items:[]}])
      })
      .catch(err => res.json( err ))
    })
    .catch(err => res.json( err ))
})

//GET ALL THE USER TRACKS INFO (NAME AND IMG)
router.get('/:token/tracks', (req, res, next) => {
    const { token } = req.params
    let tracks = ''

    spotyUser.find({ access_token: token })
    .then(respuesta => { 
      spotyUserTracks.find({ display_name: respuesta[0].display_name })
        .then(respuesta => { 
          respuesta.map(e => {tracks=respuesta[0]})
          res.json(tracks)
        })
        .catch(err => res.json(err))
      })
    .catch(err => { res.json(err) })
})







module.exports = router;  
//SpotifyStrategy
//Esta esla configuracion inicial de spoty, tambein genera las BBD.
//Espero hacerlo bien, saludos.


const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const request     = require('request')
const SpotyControl = require ('./SpotyControl/spotyFunctions');

const stateKey     = 'spotify_auth_state';

//BBD 
const UserSpoty  = require('../models/UserSpoty')
const userTracks = require('../models/userTracks')
const userArtists = require('../models/userArtists')
// const FollowedArtsist = require('../models/FollowedArtists')


//Solicitud de permisos y generacion del token.
  router.get('/login', SpotyControl.scope);

router.get('/callback/', function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'

      }));
  } else {

    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: 'http://localhost:3000/callback/',
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(process.env.Client_ID+ ':' + process.env.Client_Secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      
      if (!error && response.statusCode === 200) {
       
        const access_token = body.access_token,
            refresh_token = body.refresh_token;
        
        //GET CURRENT USER'S PROFILE
        const userInfo = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true,

        };

        request.get(userInfo,function(error, response, body) {

          const newUser = new UserSpoty(body)
          newUser.spotyId = body.id    
          
          const spotyId = newUser.spotyId
            UserSpoty.findOne({spotyId})
            .then(res => {
              //Si la respuesta es diferente a nulll, solo actualiza el token
              if( res !== null){
                UserSpoty.findOneAndUpdate({ _id: res._id }, { access_token  : access_token, refresh_token : refresh_token })
                .then(user => {
                  // res.redirect('www.google.com')
                  // console.log(request)
                  res.statusCode(400)
                })
                .catch(err => console.log(err)) 
                res.redirect(`http://localhost:3001/Home/?user=${res.display_name}`)
                //Si la respuesta en null, crea el usuario y genera un id a -
                //todos los modelos relacionados con la informacion del usuario.
              } else {
                  //Genera el modelo con la informacion del usuario
                  newUser.access_token  = access_token,
                  newUser.refresh_token = refresh_token

                  newUser.save()
                  .then(resp => { 
                    resp.json(resp)
                  })
                  .catch(err => console.log(err)) 

                  // //Genera un id a las listas de tracks de los usuarios
                  const newIdTrack   = new userTracks( body )
                  newIdTrack.spotyId = body.id
                  newIdTrack.display_name = body.display_name

                  newIdTrack.save()
                  .then(resp => {
                    res.json(resp)
                  })
                  .catch(err => console.log(err)) 

                  // //Genera un Id a la lista de artistas de los usuarios
                  const idArtisit = new userArtists( body )
                  idArtisit.spotyId = body.id
                  idArtisit.display_name = body.display_name

                  idArtisit.save()
                  .then(resp => {
                    res.json(resp)
                  })
                  .catch(err => console.log(err)) 

                  // //Genera un id a los artistas que sigue el usuario.
                  // const idFollow = new FollowedArtsist(body)
                  // console.log(body.id, body.display_name)
                  // idFollow.spotyId = body.id
                  // idFollow.display_name = body.display_name

                  // idFollow.save()
                  // .then(resp => {
                  //   res.json(resp)
                  // })
                  // .catch(err => console.log(err)) 


                  //GET A USER'S TOP ARTISTS 
                  var userTopArtists = {
                    url: 'https://api.spotify.com/v1/me/top/artists?limit=50&offset=0',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true,
          
                  };
                  request.get(userTopArtists, function(error, response, body) {
          
                    UserSpoty.find({access_token: access_token})
                    .then(res => {
                      console.log(res)
                        const {display_name} = res[0]
                        userArtists.findOneAndUpdate({ display_name: display_name}, {items : body.items, 
                            total : body.total, href : body.href })
                            .then(resp => console.log(resp))
                            .catch(err => console.log(err))
                    })
                })
                  //GET A USER'S TOP TRACKS 
                  var userTopTracks = {
                    url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true,

                  };
                  request.get(userTopTracks, function(error, response, body) {
                    UserSpoty.find({access_token: access_token})
                    .then(resp => { 

                        let {display_name} = resp[0]
                        userTracks.findOneAndUpdate({ display_name: display_name }, { items: body.items , 
                          total : body.total, href : body.href })

                        .then( resp => res.status(400).json(resp)  )
                        .catch(err => console.log(err))
                      })
                  })
              }
            })
            
            res.redirect(`http://localhost:3001/Home/?user=${body.display_name}`)
        });
       

    } else {
        res.redirect('http://localhost:3001?' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

  //Refres Token
  router.get('/refresh_token', SpotyControl.refresToken);


module.exports = router;


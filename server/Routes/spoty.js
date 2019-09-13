//SpotifyStrategy
//Esta esla configuracion inicial de spoty, tambein genera las BBD.
//Espero hacerlo bien, saludos.


const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const request     = require('request')
// const SpotifyStrategy = require('passport-spotify').Strategy;
// const passport        = require('passport')
// const consolidate     = require('consolidate');
// const swig            = require('swig');
// const session         = require('express-session');


//BBD 
const UserSpoty  = require('../models/UserSpoty')
const userTracks = require('../models/userTracks')
const userArtists = require('../models/userArtists')
const FollowedArtsist = require('../models/FollowedArtists')


//Genera el Token
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;

};


var stateKey = 'spotify_auth_state';

//Solicitud de permisos y generacion del token.
router.get('/login', function(req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-library-read user-top-read user-follow-read user-read-recently-played';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.Client_ID,
      scope: scope,
      redirect_uri: "http://localhost:3000/callback/",
      state: state
    }));
});




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

        request.get(userInfo, function(error, response, body) {

        const NewUser = new UserSpoty(body)
        NewUser.spotyId = body.id

        const spotyId = NewUser.spotyId
        UserSpoty.findOne({spotyId})
          .then(res => {
            if( res !== null){
              UserSpoty.findOneAndUpdate({ _id: res._id }, {access_token  : access_token, refresh_token : refresh_token})

            } else {
              NewUser.access_token  = access_token,
              NewUser.refresh_token = refresh_token

              NewUser.save()
              .then(resp => {
                res.json(resp)
              })
              .catch(err => console.log(err))             
            }
          })
        });


      //GET A USER'S TOP ARTISTS 
      //   var userTopArtists = {
      //     url: 'https://api.spotify.com/v1/me/top/artists?limit=50&offset=0',
      //     headers: { 'Authorization': 'Bearer ' + access_token },
      //     json: true,

      //   };
      //   request.get(userTopArtists, function(error, response, body) {
      //   const newUserArtists = new userArtists(body)
      //   newUserArtists.spotyId = 
    


      //   newUserArtists.save()
      //   .then(resp => {
      //     res.json(resp)
      //   })
      //   .catch(err => console.log(err))
      // })


      //GET A USER'S TOP TRACKS 
      //   var userTopTracks = {
      //     url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0',
      //     headers: { 'Authorization': 'Bearer ' + access_token },
      //     json: true,

      //   };

      //   request.get(userTopTracks, function(error, response, body) {

      //   const userTopTracks = new userTracks(body)

      //     userTopTracks.save()
      //     .then(resp => {
      //       res.json(resp)
      //       console.log(res)
      //     })
      //     .catch(err => console.log(err))
      // })
      
      //Get User's Followed Artists
      //   var userFollowed = {
      //     url: 'https://api.spotify.com/v1/me/following?type=artist',
      //     headers: { 'Authorization': 'Bearer ' + access_token },
      //     json: true,

      //   };

      //   request.get(userFollowed, function(error, response, body) {
      //   const newUserFollowed = new FollowedArtsist(body)
      //   newUserFollowed.save()
      //     .then(resp => {
      //       res.json(resp)
      //     })
      //     .catch(err => console.log(err))
      // })

        res.redirect('http://localhost:3001?' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('http://localhost:3001?' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});


router.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer.alloc(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) { 
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});




module.exports = router;


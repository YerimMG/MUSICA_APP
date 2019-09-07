// CONFIG
require("dotenv").config();

//LIBRERIAS 
const bodyParser      = require('body-parser');
const cookieParser    = require('cookie-parser');
const express     = require('express');
const mongoose    = require('mongoose');
const cors        = require('cors')
const logger      = require('morgan');
const path        = require('path');
const querystring = require('querystring');
const request     = require('request')

// const SpotifyStrategy = require('passport-spotify').Strategy;
// const passport        = require('passport')
// const consolidate     = require('consolidate');
// const swig            = require('swig');
// const session         = require('express-session');

//BBD 
const UserSpoty = require('./models/UserSpoty')

const app           = express();
const PORT          = process.env.PORT



//ROUTES
const tester = require('./Routes/Tester.js')

// CONNECTION TO MONGO 
const name = "MUSICAPP"
mongoose.connect(`mongodb://localhost:27017/${name}`, { useNewUrlParser: true })
    .then(db => console.log(`conected to ${name}`))
    .catch(err => Console.log(err))

//EXPRESS CONFIG
const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

//MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(cors());
app.use(logger('dev'))

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next();
});


//SpotifyStrategy


var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;

};

var stateKey = 'spotify_auth_state';

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.Client_ID,
      scope: scope,
      redirect_uri: "http://localhost:3000/callback/",
      state: state
    }));
});




app.get('/callback/', function(req, res) {
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

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
        console.log(body);
        const NewUser = new UserSpoty(body)

        NewUser.save()
        .then(resp => {
          res.json(resp)
        })
        .catch(err => console.log(err))

        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});






app.get('/refresh_token', function(req, res) {

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






app.use('/', tester)


//SERVER
app.listen(PORT, () => {
  console.log(`server on port: ${PORT}`)
})
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

const app           = express();
const PORT          = process.env.PORT


//ROUTES
const Home     = require('./Routes/Home')
const SpotyLogin = require('./Routes/spoty')
const info = require('./Routes/info')

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

//ROUTES
app.use('/home', Home)
app.use('/', SpotyLogin)
app.use('/info', info)


//SERVER
app.listen(PORT, () => {
  console.log(`server on port: ${PORT}`)
})




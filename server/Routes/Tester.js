const express = require('express');
const router = express.Router();

//Ruta de prueba

router.get('/tester', (req, res) => {
  const numer = 123
  res.json('Hola desde API')
})

module.exports = router;


// router.get('/userView', ( req,res) => {
//   User.find().then(data => res.status(200).json(data))
//   .catch(err => console.log(err))
// })

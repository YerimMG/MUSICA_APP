const express = require('express');
const router = express.Router();

//Ruta de prueba

router.get('/', (req, res) => {
  const numer = 123
  res.json('Listo perros!!')
})



module.exports = router;

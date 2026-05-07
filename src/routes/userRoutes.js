const express = require('express');
const router = express.Router();

//Ruta temporal(mientras desarrollamos)
router.get('/', (req, res) => {
  res.json({ message: 'Ruta de usuarios - en desarrollo' });
});

//Registro temporal
router.post('/register', (req, res) => {
  res.json({ message: 'Registro de usuario - en desarrollo' });
});

//Login temporal
router.post('/login', (req, res) => {
  res.json({ message: 'Login de usuario - en desarrollo' });
});

module.exports = router;
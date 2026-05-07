const express = require('express');
const router = express.Router();

// Ruta temporal(mientras desarrollamos)
router.get('/', (req, res) => {
  res.json({ message: 'Ruta de categorías - en desarrollo' });
});

module.exports = router;
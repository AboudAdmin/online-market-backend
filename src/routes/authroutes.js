const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

router.post("/inscription", authController.inscription);
router.post("/connexion", authController.conexion);

module.exports = router;

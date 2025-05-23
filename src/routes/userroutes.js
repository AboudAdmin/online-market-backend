const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

router.get('/users', userController. getAllUsers);
router.get('/users/:userId', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);
router.patch('/:userId/ban', userController.toggleBanUser);

module.exports = router;

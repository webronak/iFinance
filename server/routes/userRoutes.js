const express = require('express');
const router = express.Router();
const {addUser, loginUser} = require('../controllers/userController');

router.post('/signup', addUser);
router.post('/login', loginUser);

module.exports = router;
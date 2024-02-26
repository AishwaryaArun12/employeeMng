const express = require('express');
const multer = require('multer');
const user = require('../controller/users')
const router = express.Router();
const auth = require('../middlewears/auth');


router.post('/register',user.register);
router.post('/login', user.login);
router.get('/getUsers',auth.jwtAuth, user.getUsers);
router.put('/editProfile/:id',auth.jwtAuth, user.editProfile);
router.get('/getUser/:id',auth.jwtAuth, user.getUser);



module.exports = router;
const express = require('express');
const multer = require('multer');
const user = require('../controller/users')
const router = express.Router();
const auth = require('../middlewears/auth');


router.post('/register',user.register);
router.post('/login', user.login);
router.get('/getUsers',auth, user.getUsers);
router.put('/editProfile/:id',auth, user.editProfile);



module.exports = router;
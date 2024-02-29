const express = require('express');
const employee = require('../controller/employee');
const router = express.Router();
const auth = require('../middlewears/auth');

router.post('/add/:id', auth.jwtAuth, employee.add);
router.get('/all/:id', auth.jwtAuth, employee.getAll);
router.post('/edit/:id',auth.jwtAuth, employee.edit);
router.get('/get/:userId/:empId',auth.jwtAuth, employee.get);

module.exports = router;
const express = require('express');
const employee = require('../controller/employee');
const router = express.Router();

router.post('/add/:id', employee.add);
router.get('/all/:id', employee.getAll);
router.post('/edit/:id', employee.edit);

module.exports = router;
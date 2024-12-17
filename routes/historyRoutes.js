// routes/authRoutes.js
const express = require('express');
const { createHistory, getHistory } = require('../controllers/historyController');
const router = express.Router();

router.post('/',createHistory );
router.get('/',getHistory );
// router.delete('/', deleteUser);

module.exports = router;

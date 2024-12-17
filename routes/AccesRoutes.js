const express = require('express');
const { createUtilisateur,checkRFIDInAccessList, getAccessList } = require('../controllers/AccesController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create',protect, createUtilisateur);
router.get('/access', getAccessList);
router.get('/', checkRFIDInAccessList);
module.exports = router;

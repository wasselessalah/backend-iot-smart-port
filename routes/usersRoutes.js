// routes/authRoutes.js
const express = require('express');
const {  deleteUser,getUser,updateUser } = require('../controllers/userController');
const router = express.Router();

router.put('/:id',updateUser );
router.get('/:id',getUser );
router.delete('/:id', deleteUser);

module.exports = router;

const express = require('express');
const UserController = require('../controllers/users.controllers');
const router = express.Router();

router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

module.exports = router;
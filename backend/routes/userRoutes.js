const express = require('express');
const { registerUser, fetchUsers, authUser, changePassword, updateProfile } = require('../controllers/userControllers');

const Router = express.Router();

Router.post('/register-user', registerUser);
Router.get('/fetch-users', fetchUsers);
Router.post('/login', authUser);
Router.post('/change-password', changePassword);
Router.post('/update-profile', updateProfile);

module.exports = Router
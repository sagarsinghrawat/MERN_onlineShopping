const express = require('express')
const { authenticateUser, userRegistration, getUserProfile, updateUserProfile } = require('../controllers/userController')
const { getUsersByAdmin, userDeleteByadmin, getUserByIdAdmin, updateUserByAdmin } = require('../controllers/adminController')
const { protect, isAdmin } = require('../middleware/authMiddleware')

const router = express.Router();

router.route('/')
.post( userRegistration )
.get(protect, isAdmin, getUsersByAdmin);

router.route('/login')
.post(authenticateUser );

router.route('/profile')
.get( protect , getUserProfile )
.put(protect, updateUserProfile);

router.route('/:id')
.delete(protect, isAdmin, userDeleteByadmin)
.get(protect, isAdmin, getUserByIdAdmin  )
.put( protect, isAdmin, updateUserByAdmin )

module.exports = router
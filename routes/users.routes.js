const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  getMe,
  logout
} = require('../controllers/user.controller');

const { protect } = require('../middlewares/auth');

router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/auth/login')
  .post(login)

router.route('/auth/me')
  .get(protect, getMe)

router.route('/auth/logout')
  .get(protect, logout)

module.exports = router;
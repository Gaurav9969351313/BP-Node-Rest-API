const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  getMe
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

module.exports = router;
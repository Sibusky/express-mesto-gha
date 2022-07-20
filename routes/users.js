const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

// Возвращаю всех пользователей
router.get('/', getUsers);

// Возвращаю пользователя по ID
router.get('/:userId', getUserById);

// Создаю пользователя
router.post('/', createUser);

// Обновляю пофиль
router.patch('/me', updateProfile);

// Обновляю аватар
router.patch('/me/avatar', updateAvatar);

module.exports = router;

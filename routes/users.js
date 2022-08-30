const router = require('express').Router();
const {
  getUsers, getUserById, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users');

// Возвращаю всех пользователей
router.get('/', getUsers);

// Возвращаю пользователя по ID
router.get('/:userId', getUserById);

// Получаю информацию о текущем пользователе
router.get('/me', getCurrentUser);

// // Создаю пользователя
// router.post('/', createUser);

// Обновляю пофиль
router.patch('/me', updateProfile);

// Обновляю аватар
router.patch('/me/avatar', updateAvatar);

module.exports = router;

const router = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

// Возвращаю всех пользователей
router.get('/', getUsers);

// Возвращаю пользователя по ID
router.get('/:userId', getUserById);

// Создаю пользователя
router.post('/', createUser);

module.exports = router;

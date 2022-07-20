const router = require('express').Router();
const { getCards, createCard, deleteCardById } = require('../controllers/cards');

// Возвращаю все карточки
router.get('/', getCards);

// Создаю карточку
router.post('/', createCard);

// Удаляю карточку по id
router.delete('/:cardId', deleteCardById);

module.exports = router;

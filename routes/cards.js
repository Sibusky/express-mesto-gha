const router = require('express').Router();
const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

// Возвращаю все карточки
router.get('/', getCards);

// Создаю карточку
router.post('/', createCard);

// Удаляю карточку по id
router.delete('/:cardId', deleteCardById);

// Ставлю лайк карточке
router.put('/:cardId/likes', likeCard);

// Убираю лайк с карточки
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;

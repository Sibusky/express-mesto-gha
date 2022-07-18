const router = require('express').Router();

// Возвращаем всех пользователей
router.get('/', (req, res) => {
  res.send('hello to you');
  console.log(req.params);
});

// // Возвращаем пользователя по ID
// router.get('/:userId', (req, res) => {

// });

// // Создаём пользователя
// router.post('/', (req, res) => {

// });

module.exports = router;

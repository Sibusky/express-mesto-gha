const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const NOT_FOUND_ERROR = 404;

const app = express();
const PORT = 3000;

// Подключаю БД
mongoose.connect('mongodb://localhost:27017/mestodb');

// Превращаю тело запроса в удобный формат JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Роуты не требующие авторизации: логин и регистрация
app.post('/signin', login);
app.post('/signup', createUser);

// Роут авторизации
app.use(auth);

// Роуты, требующие авторизации
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

// Роут на ненайденную страницу
app.use('/*', (req, res) => res.status(NOT_FOUND_ERROR).send({ message: 'Страница не найдена' }));

// Обработчик ошибок
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляю 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяю статус и выставляю сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log('App started and listen port', PORT);
});

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
const PORT = 3000;

// Подключаю БД
mongoose.connect('mongodb://localhost:27017/mestodb');

// Превращаю тело запроса в удобный формат JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware для временной авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '62d7bd20c7ccb600853f76d5',
  };

  next();
});

// Использую роуты
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log('App started and listen port', PORT);
});

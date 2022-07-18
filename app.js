const express = require('express');
// const mongoose = require('mongoose');
const usersRouter = require('./routes/users');

const app = express();
const PORT = 3000;

// // Подключаю БД
// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

app.use('/users', usersRouter);

// app.get('/users', (req, res) => {
//   res.send('hello user');
//   console.log(req.params);
// });

app.listen(PORT, () => {
  console.log('App started and listen port', PORT);
});

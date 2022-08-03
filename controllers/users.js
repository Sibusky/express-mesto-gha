const User = require('../models/users');

const BAD_REQUIEST_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const INTERNAL_SERVER_ERROR = 500;

// Возвращаю всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

// Возвращаю пользователя по ID
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Пользователя с таким _id не существует' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(BAD_REQUIEST_ERROR).send({ message: 'Пользователь по указанному _id не найден' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Что-то пошло не так' });
    });
};

// Создаю пользователя
module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUIEST_ERROR).send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Что-то пошло не так' });
    });
};

// Обновляю пофиль
module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  }, {
    new: true, // обработчик then получает на вход обновлённую запись
    runValidators: true, // запуск валидации
  })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUIEST_ERROR).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Что-то пошло не так' });
    });
};

// Обновляю аватар
module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    avatar: req.body.avatar,
  }, {
    new: true, // обработчик then получает на вход обновлённую запись
    runValidators: true, // запуск валидации
  })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUIEST_ERROR).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Что-то пошло не так' });
    });
};

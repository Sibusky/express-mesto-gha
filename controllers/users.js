const User = require('../models/users');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
// const InternalServerError = require('../errors/InternalServerError');

// Возвращаю всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
};

// Возвращаю пользователя по ID
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
      } else {
        next(err);
      }
    });
};

// Создаю пользователя
module.exports.createUser = (req, res, next) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

// Обновляю пофиль
module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  }, {
    new: true, // обработчик then получает на вход обновлённую запись
    runValidators: true,
  })
    .then((user) => {
      console.log(user);
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.status(201).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

// Обновляю аватар
module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    avatar: req.body.avatar,
  }, {
    new: true, // обработчик then получает на вход обновлённую запись
  })
    .then((user) => res.status(201).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

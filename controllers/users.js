const User = require('../models/users');

// Возвращаю всех пользователей
module.exports.getUsers = (req, res) => {
  // const { name, about, avatar } = req.body;

  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Возвращаю пользователя по ID
module.exports.getUserById = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Создаю пользователя
module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Обновляю пофиль
module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  }, {
    new: true, // обработчик then получает на вход обновлённую запись
  })
    .then((user) => res.status(201).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
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

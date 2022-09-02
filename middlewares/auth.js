const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // достаю авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаюсь, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  // извлекаю токен
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    // пытаюсь верифицировать токен
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    // отправляю ошибку, если не получилось
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываю пейлоуд в объект запроса

  return next(); // пропускаю запрос дальше
};

const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function authenticate(req, res, next) {
  const token = req.headers['x-auth-token'];

  try {
    const payload = jwt.verify(
      token,
      Buffer.from(secret, 'base64')
    );

    req.user = payload;
    next();
  } catch (error) {
    res.status(401).send({
      error: 'Unable to authenticate - please use a valid token'
    });
  }
}

module.exports = {
  authenticate
};
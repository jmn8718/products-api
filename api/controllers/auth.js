'use strict';
const bCrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const User = require('../../db/models').User;

const { JWT_SECRET = 'jwt', JWT_EXPIRES_IN = 3600 } = process.env;

const generateHash = (password) => bCrypt.hashSync(password, bCrypt.genSaltSync(), null);
const validatePassword = (userPassword, password) => bCrypt.compareSync(password, userPassword);
const createToken = (user) => jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

const authenticate = (req, res) => {
  const data = req.swagger.params.data.value;

  User.findOne(({ where: { email: data.email }}))
    .then((user) => {
      if (!user) {
        return new Error("User not found");
      } else if (!validatePassword(user.password, data.password)) {
        return new Error("Invalid password");
      }
      const token = createToken({
        id: user.id,
        email: user.email,
      });
      const tokenInfo = verifyToken(token);
      res.json({
        token,
        expires: tokenInfo.exp,
      });
    })
    .catch((e) => res.status(400).json({ message: e.message }));
}

module.exports = {
  authenticate,
  generateHash,
};

console.log(generateHash('dev'))
console.log(generateHash('user'))

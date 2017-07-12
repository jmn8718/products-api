const { generateHash } = require('../../api/controllers/auth');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    email: 'dev@dev.com',
    password: generateHash('dev'),
    name: 'Developer',
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    email: 'user@dev.com',
    password: generateHash('user'),
    name: 'User',
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};

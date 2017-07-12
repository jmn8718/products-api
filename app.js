'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const passport = require('passport');
const { authMiddleware } = require('./middleware');

module.exports = app; // for testing

authMiddleware.applyAuthMiddleware(app);

const config = {
  swaggerSecurityHandlers: authMiddleware.swaggerSecurityHandlers,
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});

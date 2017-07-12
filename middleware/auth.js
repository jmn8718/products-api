const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const { JWT_SECRET = 'jwtSecret' } = process.env;

const options = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET,
}

const verify = (payload, done) => {
  if (payload.id && payload.email) {
    return done(null, payload);
  }

  const error = new Error('Unauthorized');
  error.status = 401;
  done(error);
}

const applyAuthMiddleware = (app) => {
  app.use(passport.initialize());
  passport.use('jwt', new Strategy(options, verify));
}

const swaggerSecurityHandlers = {
  Bearer: (req, authOrSecDef, token, done) => {
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
      if (error) {
        return done(error);
      } else if (!user) {
        return done(new Error('Invalid jwt token'))
      }
      req.user = user;
      done();
    })(req, null, done);
  }
};

module.exports = {
  applyAuthMiddleware,
  swaggerSecurityHandlers,
};

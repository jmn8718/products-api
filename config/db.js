const developmentConfig = {
  username: "dev",
  password: "dev",
  database: "products",
  host: "db",
  dialect: "postgres"
};

const {
  DB_USERNAME = 'dev',
  DB_PASSWORD = 'dev',
  DB_DATABASE = 'products',
  DB_HOST = 'db',
  DB_DIALECT = 'postgres',
  DATABASE_URL,
} = process.env;

const productionConfig = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: DB_HOST,
  dialect: DB_DIALECT,
  use_env_variable: !!DATABASE_URL ? 'DATABASE_URL' : false,
};

module.exports = {
  development: developmentConfig,
  test: developmentConfig,
  production: productionConfig,
};

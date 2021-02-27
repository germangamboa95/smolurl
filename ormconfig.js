
module.exports = [
  {
    "name": "default",
    "type": "mysql",
    host: process.env.DATABASE_URL,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    "synchronize": false,
    "logging": true,
    "entities": ["src/links/*.ts"],
    "migrations": ["migrations/**/*.ts"],
    "subscribers": ["src/subscriber/**/*.ts"],
    "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "migrations",
      "subscribersDir": "src/subscriber"
    }
  },
  {
    "name": "production",
    "type": "mysql",
    host: process.env.DATABASE_URL,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    "synchronize": false,
    "logging": false,
    "entities": ["build/**/*.js"],
    "migrations": ["migrations/**/*.ts"],
    "subscribers": ["build/subscriber/**/*.js"],

  }
]

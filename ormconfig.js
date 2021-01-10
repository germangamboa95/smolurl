module.exports = [
  {
    "name": "default",
    "type": "sqlite",
    "database": "database.sqlite",
    "synchronize": false,
    "logging": true,
    "entities": ["src/**/*.ts"],
    "migrations": ["src/migration/**/*.ts"],
    "subscribers": ["src/subscriber/**/*.ts"],
    "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
    }
  },
  {
    "name": "production",
    "type": "mysql",
    host: process.env.DATABASE_URL,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    "synchronize": false,
    "logging": false,
    "entities": ["build/**/*.js"],
    "migrations": ["build/migration/**/*.js"],
    "subscribers": ["build/subscriber/**/*.js"],

  }
]

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
    "type": "sqlite",
    "database": "database.sqlite",
    "synchronize": false,
    "logging": true,
    "entities": ["build/**/*.js"],
    "migrations": ["build/migration/**/*.js"],
    "subscribers": ["build/subscriber/**/*.js"],
  
  }
]

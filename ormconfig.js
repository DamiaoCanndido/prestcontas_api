module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "logging": true,
    // "synchronize": true,
    "migrations": [process.env.MIGRATIONS_DEV],
    "entities": [process.env.ENTITIES_DEV],
    "cli": {
        "migrationsDir": "./src/database/migrations",
        "entitiesDir": "./src/models"
    }
 }
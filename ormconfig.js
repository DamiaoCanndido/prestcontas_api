module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "logging": true,
    // "synchronize": true,
    "migrations": [process.env.MIGRATIONS_PROD],
    "entities": [process.env.ENTITIES_PROD],
    "cli": {
        "migrationsDir": "./src/database/migrations",
        "entitiesDir": "./src/models"
    }
 }
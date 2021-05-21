module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "logging": true,
    "migrations": process.env.NODE_ENV === "development" 
        ? ["./src/database/migrations/**.ts"]
        : ["./dist/database/migrations/**.js"],
    "entities": process.env.NODE_ENV === "development" 
        ? ["./src/models/**.ts"]
        : ["./dist/models/**.js"],
    "cli": {
        "migrationsDir": "./src/database/migrations",
        "entitiesDir": "./src/models"
    }
 }
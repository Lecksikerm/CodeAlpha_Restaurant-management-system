require("dotenv").config();
const { DataSource } = require("typeorm");

let dbConfig;
if (process.env.DATABASE_URL) {
    // Parse DATABASE_URL (e.g., postgresql://user:pass@host:port/db)
    const url = new URL(process.env.DATABASE_URL);
    dbConfig = {
        type: "postgres",
        host: url.hostname,
        port: Number(url.port),
        username: url.username,
        password: url.password,
        database: url.pathname.slice(1), // remove leading /
        synchronize: false,
        logging: true,
        entities: [
            __dirname + "/entities/*.js",
            __dirname + "/models/*.js"
        ],
        migrations: [__dirname + "/migrations/*.js"],
    };
} else {
    // Fallback to individual env vars
    dbConfig = {
        type: "postgres",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: false,
        logging: true,
        entities: [
            __dirname + "/entities/*.js",
            __dirname + "/models/*.js"
        ],
        migrations: [__dirname + "/migrations/*.js"],
    };
}

const AppDataSource = new DataSource(dbConfig);

module.exports = AppDataSource;




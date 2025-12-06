require("dotenv").config();
const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
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
});

module.exports = AppDataSource;




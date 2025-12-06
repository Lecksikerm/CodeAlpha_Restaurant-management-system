const app = require("./app");
const AppDataSource = require("./data-source");

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log("Server running on port", PORT);
            console.log(`Swagger docs → http://localhost:${PORT}/api/docs`);
        });
    })
    .catch((err) => console.error("DB error:", err));


const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orderRoutes");

require("dotenv").config();

const app = express();
app.use(express.json());

// Swagger setup
const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: { title: "Restaurant API", version: "1.0.0" }
    },
    apis: ["./src/routes/*.js"]
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => res.json({ status: "ok" }));

module.exports = app;

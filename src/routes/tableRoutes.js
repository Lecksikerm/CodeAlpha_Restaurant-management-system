const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableController");

/**
 * @swagger
 * /api/tables:
 *   get:
 *     summary: Get all tables
 *     tags: [Tables]
 *     responses:
 *       200:
 *         description: List of tables
 */
router.get("/", tableController.getTables);

/**
 * @swagger
 * /api/tables:
 *   post:
 *     summary: Create a new table
 *     tags: [Tables]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               table_number:
 *                 type: integer
 *               capacity:
 *                 type: integer
 *             required:
 *               - table_number
 *               - capacity
 *     responses:
 *       201:
 *         description: Table created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", tableController.createTable); 

module.exports = router;



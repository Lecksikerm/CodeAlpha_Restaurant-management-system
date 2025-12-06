const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory management and stock updates
 */

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of inventory items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   item_name:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *                   unit:
 *                     type: string
 *                   threshold:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 */
router.get("/", inventoryController.getInventory);

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Add a new inventory item
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - item_name
 *             properties:
 *               item_name:
 *                 type: string
 *                 example: "Tomatoes"
 *               quantity:
 *                 type: integer
 *                 example: 50
 *               unit:
 *                 type: string
 *                 example: "kg"
 *               threshold:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Inventory item created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 */
router.post("/", inventoryController.createInventory);

/**
 * @swagger
 * /api/inventory/{id}:
 *   patch:
 *     summary: Update an inventory item
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 40
 *               unit:
 *                 type: string
 *                 example: "kg"
 *               threshold:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Inventory item updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 */
router.patch("/:id", inventoryController.updateInventory);

/**
 * @swagger
 * /api/inventory/{id}:
 *   delete:
 *     summary: Delete an inventory item
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Inventory item deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inventory item deleted successfully"
 */
router.delete("/:id", inventoryController.deleteInventory);

module.exports = router;


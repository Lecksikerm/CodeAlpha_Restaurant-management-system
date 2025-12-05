const router = require("express").Router();
const { getMenu, createMenuItem } = require("../controllers/menuController");

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: List of menu items
 */
router.get("/", getMenu);

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Create a menu item
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price in Naira (₦)
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item created
 */
router.post("/", createMenuItem);

module.exports = router;

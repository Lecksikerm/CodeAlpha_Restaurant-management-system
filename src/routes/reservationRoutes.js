const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               table_id:
 *                 type: integer
 *               customer_name:
 *                 type: string
 *               customer_phone:
 *                 type: string
 *               reservation_time:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - table_id
 *               - customer_name
 *               - customer_phone
 *               - reservation_time
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", reservationController.createReservation);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: List of reservations
 */
router.get("/", reservationController.getReservations);

module.exports = router;


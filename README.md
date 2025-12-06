# Restaurant Management System

**Backend**: Node.js, Express.js, TypeORM, PostgreSQL
**Features**: Orders, Tables, Reservations, Inventory
**API Documentation**: Swagger UI available at `/api/docs`

---

## Table of Contents

* Project Overview
* Tech Stack
* Setup & Installation
* Database Migrations
* Available Endpoints
* Inventory Auto-Update
* Sales Reports
* Testing
* Future Enhancements

---

## Project Overview

This project is a backend system for managing restaurant operations, including:

* **Orders**: Placing orders and updating order status.
* **Tables**: Viewing and managing table availability.
* **Reservations**: Reserving tables for customers.
* **Inventory**: Tracking ingredient quantities, thresholds, and auto-updating inventory when orders are placed.
* **Sales Reports**: Generating daily, weekly, and monthly sales reports.

---

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* TypeORM
* Swagger (for API documentation)
* dotenv (for environment variables)

---

## Setup & Installation

1. **Clone the repository**

```bash
git clone https://github.com/Lecksikerm/CodeAlpha_Restaurant-management-system.git
cd restaurant-management-system
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file:

```
PORT=5000
DATABASE_URL=postgres://postgres:password@localhost:5434/restaurant_management_system

```

4. **Run database migrations**

```bash
npm run typeorm migration:run
```

5. **Start the server**

```bash
npm run dev
```

The server should run at `http://localhost:5000`.

---

## Database Migrations

Database models include:

* `MenuItem`
* `Order` & `OrderItem`
* `Table`
* `Reservation`
* `Inventory`

Migrations are handled using **TypeORM**, ensuring database schema matches entity definitions.

---

## Available Endpoints

### Orders

| Method | Endpoint                 | Description         |
| ------ | ------------------------ | ------------------- |
| POST   | `/api/orders`            | Create a new order  |
| GET    | `/api/orders`            | Get all orders      |
| GET    | `/api/orders/:id`        | Get order by ID     |
| PATCH  | `/api/orders/:id/status` | Update order status |

### Tables

| Method | Endpoint      | Description        |
| ------ | ------------- | ------------------ |
| GET    | `/api/tables` | List all tables    |
| POST   | `/api/tables` | Create a new table |

### Reservations

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| POST   | `/api/reservations` | Create a reservation |
| GET    | `/api/reservations` | Get all reservations |

### Inventory

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| GET    | `/api/inventory`     | Get all inventory items  |
| POST   | `/api/inventory`     | Add a new inventory item |
| PATCH  | `/api/inventory/:id` | Update an inventory item |
| DELETE | `/api/inventory/:id` | Delete an inventory item |

---

## Inventory Auto-Update

* When an order is placed, inventory items corresponding to the ordered menu items are automatically reduced.
* If an item falls below its threshold, a **low-stock warning** is logged.
* Inventory thresholds can be configured per item.

---

## Testing

* Use **Postman** or **Swagger UI** to test endpoints.
* Swagger UI: `http://localhost:5000/api/docs`
* Example: To test inventory auto-update, place an order and verify inventory quantities are reduced accordingly.

---

## Future Enhancements

* Add **Admin Dashboard** with charts and visual reporting.
* Generate **PDF/Excel export** of sales reports.
* Add **user authentication** for admin vs staff roles.
* Implement **notification system** for low stock or completed orders.
* Add **menu category management** and **ingredient-level inventory**.

---

### Author

Lecksikerm


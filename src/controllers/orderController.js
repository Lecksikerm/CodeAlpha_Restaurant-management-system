const AppDataSource = require("../data-source");
const Order = require("../entities/Order");
const OrderItem = require("../entities/OrderItem");
const MenuItem = require("../entities/MenuItem");
const Inventory = require("../entities/Inventory");

const orderRepo = () => AppDataSource.getRepository(Order);
const orderItemRepo = () => AppDataSource.getRepository(OrderItem);
const menuRepo = () => AppDataSource.getRepository(MenuItem);
const inventoryRepo = () => AppDataSource.getRepository(Inventory);

const VALID_STATUSES = ["pending", "preparing", "completed", "cancelled"];

exports.createOrder = async (req, res) => {
    try {
        const { table_number, items } = req.body;
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Order must contain items" });
        }

        const menuItemsMap = new Map();
        for (const it of items) {
            if (!it || typeof it.menu_item_id === "undefined" || !it.quantity) {
                return res.status(400).json({ message: "Each item requires menu_item_id and quantity" });
            }
            const menuItem = await menuRepo().findOneBy({ id: it.menu_item_id });
            if (!menuItem) return res.status(404).json({ message: `MenuItem ${it.menu_item_id} not found` });
            menuItemsMap.set(it.menu_item_id, menuItem);
        }

        let total = 0;
        for (const it of items) {
            const menuItem = menuItemsMap.get(it.menu_item_id);
            total += Number(menuItem.price) * Number(it.quantity);
        }

        let savedOrder;
        await AppDataSource.transaction(async (manager) => {
            const orderRepository = manager.getRepository(Order);
            const orderItemRepository = manager.getRepository(OrderItem);
            const menuRepository = manager.getRepository(MenuItem);
            const inventoryRepository = manager.getRepository(Inventory);

            const order = orderRepository.create({
                table_number,
                total_price: total,
                status: "pending",
            });
            savedOrder = await orderRepository.save(order);

            for (const it of items) {
                const menuItem = menuItemsMap.get(it.menu_item_id);

                const orderItem = orderItemRepository.create({
                    quantity: Number(it.quantity),
                    price: menuItem.price,
                    menuItem,
                    order: savedOrder,
                });
                await orderItemRepository.save(orderItem);

                const inventoryItem = await inventoryRepository.findOneBy({ item_name: menuItem.name });
                if (inventoryItem) {
                    inventoryItem.quantity = Math.max(0, inventoryItem.quantity - Number(it.quantity));
                    await inventoryRepository.save(inventoryItem);
                    if (inventoryItem.quantity <= inventoryItem.threshold) {
                        console.warn(`⚠ LOW STOCK: ${inventoryItem.item_name} is now ${inventoryItem.quantity}`);
                    }
                }
            }
        });

        const orderWithItems = await orderRepo().findOne({
            where: { id: savedOrder.id },
            relations: ["items", "items.menuItem"],
        });

        res.status(201).json(orderWithItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await orderRepo().find({ relations: ["items", "items.menuItem"] });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching orders" });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid order id" });

        const order = await orderRepo().findOne({
            where: { id },
            relations: ["items", "items.menuItem"],
        });

        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching order" });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { status } = req.body;
        if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid order id" });
        if (!status || typeof status !== "string") return res.status(400).json({ message: "Missing or invalid status" });
        if (!VALID_STATUSES.includes(status)) return res.status(400).json({ message: `Status must be one of: ${VALID_STATUSES.join(", ")}` });

        const order = await orderRepo().findOneBy({ id });
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = status;
        await orderRepo().save(order);

        const updated = await orderRepo().findOne({
            where: { id },
            relations: ["items", "items.menuItem"],
        });

        res.json({ message: "Status updated", order: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating status" });
    }
};
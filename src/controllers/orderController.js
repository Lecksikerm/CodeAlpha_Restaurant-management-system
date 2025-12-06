const AppDataSource = require("../data-source");
const Order = require("../entities/Order");
const OrderItem = require("../entities/OrderItem");
const MenuItem = require("../entities/MenuItem");

const orderRepo = () => AppDataSource.getRepository(Order);
const orderItemRepo = () => AppDataSource.getRepository(OrderItem);
const menuRepo = () => AppDataSource.getRepository(MenuItem);

exports.createOrder = async (req, res) => {
    try {
        const { table_number, items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Order must contain items" });
        }

        let total = 0;
        const orderItems = [];

        for (const it of items) {
            const menuItem = await menuRepo().findOneBy({ id: it.menu_item_id });
            if (!menuItem)
                return res.status(404).json({ message: `MenuItem ${it.menu_item_id} not found` });

            total += Number(menuItem.price) * it.quantity;

            orderItems.push(orderItemRepo().create({
                quantity: it.quantity,
                price: menuItem.price,
                menuItem
            }));
        }

        const order = orderRepo().create({
            table_number,
            total_price: total,
            items: orderItems
        });

        await orderRepo().save(order);

        res.status(201).json(order);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await orderRepo().find({
            relations: ["items", "items.menuItem"]
        });

        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching orders" });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await orderRepo().findOne({
            where: { id: Number(id) },
            relations: ["items", "items.menuItem"]
        });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching order" });
    }
};

exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await orderRepo().findOneBy({ id });
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = status;
        await orderRepo().save(order);

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating order status" });
    }
};

const AppDataSource = require("../data-source");
const Inventory = require("../entities/Inventory");

const inventoryRepo = () => AppDataSource.getRepository(Inventory);

exports.createInventory = async (req, res) => {
    try {
        const { item_name, quantity = 0, unit = "units", threshold = 5 } = req.body;
        if (!item_name) return res.status(400).json({ message: "item_name is required" });

        const item = inventoryRepo().create({ item_name, quantity, unit, threshold });
        await inventoryRepo().save(item);
        res.status(201).json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating inventory item" });
    }
};

exports.getInventory = async (req, res) => {
    try {
        const items = await inventoryRepo().find();
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching inventory" });
    }
};

exports.updateInventory = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { quantity, unit, threshold, item_name } = req.body;

        const item = await inventoryRepo().findOneBy({ id });
        if (!item) return res.status(404).json({ message: "Item not found" });

        if (quantity !== undefined) item.quantity = Number(quantity);
        if (unit !== undefined) item.unit = unit;
        if (threshold !== undefined) item.threshold = Number(threshold);
        if (item_name !== undefined) item.item_name = item_name;

        item.updated_at = () => "CURRENT_TIMESTAMP";
        await inventoryRepo().save(item);

        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating inventory" });
    }
};

exports.deleteInventory = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const item = await inventoryRepo().findOneBy({ id });
        if (!item) return res.status(404).json({ message: "Item not found" });

        await inventoryRepo().remove(item);
        res.json({ message: "Item deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting inventory item" });
    }
};

exports.getInventoryRepo = () => inventoryRepo();

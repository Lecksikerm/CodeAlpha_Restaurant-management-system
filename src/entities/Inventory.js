const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Inventory",
    tableName: "inventory",
    columns: {
        id: { type: "int", primary: true, generated: true },
        item_name: { type: "varchar", nullable: false },
        quantity: { type: "int", default: 0 },
        unit: { type: "varchar", nullable: true, default: "units" },
        threshold: { type: "int", default: 5 },
        created_at: { type: "timestamp", default: () => "CURRENT_TIMESTAMP" },
        updated_at: { type: "timestamp", default: () => "CURRENT_TIMESTAMP" }
    }
});

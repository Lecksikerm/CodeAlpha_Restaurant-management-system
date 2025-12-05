const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Order",
    tableName: "orders",
    columns: {
        id: { primary: true, type: "int", generated: true },
        table_number: { type: "int" },
        total_price: { type: "numeric", default: 0 },
        status: { type: "varchar", default: "pending" },
        created_at: { type: "timestamp", default: () => "CURRENT_TIMESTAMP" }
    },
    relations: {
        items: {
            target: "OrderItem",
            type: "one-to-many",
            inverseSide: "order",
            cascade: true
        }
    }
});


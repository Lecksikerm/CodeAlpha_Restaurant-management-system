const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Reservation",
    tableName: "reservations",
    columns: {
        id: { type: "int", primary: true, generated: true },
        customer_name: { type: "varchar" },
        customer_phone: { type: "varchar" },
        reservation_time: { type: "timestamp" },
        status: { type: "varchar", default: "completed" },
        created_at: { type: "timestamp", default: () => "CURRENT_TIMESTAMP" }
    },
    relations: {
        table: {
            type: "many-to-one",
            target: "Table",
            joinColumn: { name: "table_id" },
            onDelete: "CASCADE"
        }
    }
});

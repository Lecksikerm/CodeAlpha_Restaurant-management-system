const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Table",
    tableName: "tables",
    columns: {
        id: { type: "int", primary: true, generated: true },
        table_number: { type: "int" },
        capacity: { type: "int" },
        status: { type: "varchar", default: "available" },
        created_at: { type: "timestamp", default: () => "CURRENT_TIMESTAMP" }
    }
});

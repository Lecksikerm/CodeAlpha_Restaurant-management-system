const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "MenuItem",
    tableName: "menu_items",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        price: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false
        },
        category: {
            type: "varchar",
            default: "main"
        },
        description: {
            type: "text",
            nullable: true
        },
        is_available: {
            type: "boolean",
            default: true
        }
    }
});



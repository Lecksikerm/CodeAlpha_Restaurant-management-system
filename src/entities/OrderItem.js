const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "OrderItem",
    tableName: "order_items",
    columns: {
        id: { primary: true, type: "int", generated: true },
        quantity: { type: "int", nullable: false },
        price: { type: "decimal", precision: 10, scale: 2, nullable: false } 
    },
    relations: {
        order: {
            target: "Order",
            type: "many-to-one",
            joinColumn: { name: "order_id" },
            inverseSide: "items"
        },
        menuItem: {
            target: "MenuItem",
            type: "many-to-one",
            joinColumn: { name: "menu_item_id" }
        }
    }
});



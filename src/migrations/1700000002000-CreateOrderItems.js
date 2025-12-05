module.exports = class CreateOrderItems1700000002000 {
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        menu_item_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price NUMERIC(10,2) NOT NULL
      );
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE order_items`);
  }
};


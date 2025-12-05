module.exports = class CreateOrders1700000001000 {
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        table_number INTEGER NOT NULL,
        total_price NUMERIC(10,2) DEFAULT 0,  -- changed here
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE orders`);
  }
};



module.exports = class CreateMenuItems1700000000000 {
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE menu_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        priceKobo INTEGER NOT NULL,
        category VARCHAR(255) DEFAULT 'main',
        description TEXT,
        is_available BOOLEAN DEFAULT true
      );
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE menu_items`);
  }
};

 

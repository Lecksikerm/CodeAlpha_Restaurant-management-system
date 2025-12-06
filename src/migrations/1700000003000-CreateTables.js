module.exports = class CreateTables1700000003000 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE tables (
        id SERIAL PRIMARY KEY,
        table_number INTEGER UNIQUE NOT NULL,
        capacity INTEGER NOT NULL,
        status VARCHAR(20) DEFAULT 'available', -- available, reserved, occupied
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE tables`);
    }
};

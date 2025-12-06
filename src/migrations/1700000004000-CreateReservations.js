module.exports = class CreateReservations1700000004000 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE reservations (
        id SERIAL PRIMARY KEY,
        table_id INTEGER NOT NULL REFERENCES tables(id) ON DELETE CASCADE,
        customer_name VARCHAR(100) NOT NULL,
        customer_phone VARCHAR(20),
        reservation_time TIMESTAMP NOT NULL,
        status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, cancelled
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE reservations`);
    }
};

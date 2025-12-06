const AppDataSource = require("../data-source");
const Reservation = require("../models/Reservation");
const Table = require("../models/Table");

const reservationRepo = AppDataSource.getRepository(Reservation);
const tableRepo = AppDataSource.getRepository(Table);

exports.createReservation = async (req, res) => {
    try {
        const { table_id, customer_name, customer_phone, reservation_time } = req.body;

        const table = await tableRepo.findOneBy({ id: table_id });
        if (!table) return res.status(404).json({ message: "Table not found" });

        const reservation = reservationRepo.create({
            table,
            customer_name,
            customer_phone,
            reservation_time,
            status: "reserved"
        });

        await reservationRepo.save(reservation);

        table.status = "reserved";
        await tableRepo.save(table);

        res.status(201).json({ message: "Reservation created", reservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getReservations = async (req, res) => {
    try {
        const reservations = await reservationRepo.find({ relations: ["table"] });
        res.json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch reservations" });
    }
};



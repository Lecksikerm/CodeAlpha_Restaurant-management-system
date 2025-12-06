const AppDataSource = require("../data-source");
const Table = require("../models/Table");

const tableRepo = AppDataSource.getRepository(Table);

exports.getTables = async (req, res) => {
    try {
        const tables = await tableRepo.find();
        res.json(tables);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch tables" });
    }
};

exports.createTable = async (req, res) => {
    try {
        const { table_number, capacity } = req.body;
        const table = tableRepo.create({ table_number, capacity });
        await tableRepo.save(table);
        res.status(201).json({ message: "Table created", table });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create table" });
    }
};







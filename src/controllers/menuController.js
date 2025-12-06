const AppDataSource = require("../data-source");
const MenuItem = require("../entities/MenuItem"); 

const menuRepo = () => AppDataSource.getRepository(MenuItem); 


const formatNaira = (amount) => `N${Number(amount).toFixed(2)}`;

exports.getMenu = async (req, res) => {
    try {
        const items = await menuRepo().find();

        const formattedItems = items.map(item => ({
            ...item,
            price: formatNaira(item.price) 
        }));

        res.json(formattedItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching menu items" });
    }
};

exports.createMenuItem = async (req, res) => {
    try {
        const { name, price, category, description, is_available } = req.body;

        if (price === undefined || price === null) {
            return res.status(400).json({ message: "Price is required" });
        }

        const item = menuRepo().create({
            name,
            price,
            category,
            description,
            is_available
        });

        await menuRepo().save(item);

        res.status(201).json({
            ...item,
            price: formatNaira(item.price)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating menu item" });
    }
};


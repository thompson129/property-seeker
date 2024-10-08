import { db } from "../db.js";


export const createHouse = (req, res) => {
    const { address, owner_name, price, type, area, pictures } = req.body;

    const query = `
        INSERT INTO houses (address, owner_name, price, type, area, pictures, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    db.query(query, [address, owner_name, price, type, area, JSON.stringify(pictures)], (err, result) => {
        if (err) {
            console.error("Error creating house:", err);
            return res.status(500).json({ error: "Error creating house" });
        }

        res.status(201).json({ message: "House created successfully", houseId: result.insertId });
    });
};

export const getHouse = async(req,res)=>{
    try{
        const houseId=req.query.houseId;
        const [houses]=await db.promise().query(`Select * from houses where house_id=?`,[houseId]);
        
        return res.status(200).json(houses);
    }
    catch(error){
        return res.status(500).json(error);
    }
};

export const getAllHouses = async (req, res) => {
    try {
      const [houses] = await db.promise().query(`SELECT * FROM houses`);
      return res.status(200).json(houses);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
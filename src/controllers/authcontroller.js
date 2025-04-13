const bycrypt = require('bcrypt');
const User = require('../models/user');



const inscription = async (req, res) => {
    const {   name, email , password , role , phone , adresse} = req.body; 
    try {
        const HashedPassword = await bycrypt.hash(password, 10);
        const newUser = await User.create({   name, email , password:HashedPassword , role , phone ,adresse});
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}
const conexion = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        const isPasswordValid = await bycrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'invalid password' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    inscription , conexion
}
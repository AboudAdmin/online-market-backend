const User = require("../models/user");
const crypto = require("bcrypt")
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getUserById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const createUser = async (req, res) => {
    const {   name, email , password , role , phone} = req.body; 
    try {
        const newUser = await User.create({   name, email , password , role , phone, password , role , phone});
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const {    name, email , password , role  } = req.body; 
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.update({   name, email , password , role , phone, password , role , phone});
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.destroy();
            res.json({ message: "User deleted" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { getAllUsers , getUserById , updateUser , deleteUser , createUser };

const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } // لا تعرض كلمة المرور
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId, {
            attributes: { exclude: ['password'] }
        });
        user ? res.json(user) : res.status(404).json({ message: "User not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, role, phone,adresse } = req.body;
        
        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            isBanned: false, // إضافة قيمة افتراضية
            adresse: req.body.adresse,// إضافة العنوان
            phone: req.body.phone // إضافة رقم الهاتف
        });
        
        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            adresse: newUser.adresse,
            phone: newUser.phone // إضافة رقم الهاتف
        });
    } catch (error) {
        res.status(500).json({ 
            error: "Validation error",
            details: error.errors?.map(e => e.message) || error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;
        const user = await User.findByPk(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updateData = { name, email, role, phone };
        
        // تحديث كلمة المرور فقط إذا تم توفيرها
        if (password) {
            updateData.password = await bcrypt.hash(password, saltRounds);
        }

        await user.update(updateData);
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({
            error: "Validation error",
            details: error.errors?.map(e => e.message) || error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.destroy();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const toggleBanUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.update({ isBanned: !user.isBanned });
        res.json({
            message: user.isBanned ? "User banned" : "User unbanned",
            isBanned: user.isBanned
        });
    } catch (error) {
        res.status(500).json({
            error: "Validation error",
            details: error.errors?.map(e => e.message) || error.message
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    toggleBanUser
};
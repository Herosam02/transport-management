import User from "../models/Users.js";
import bcrypt from "bcrypt";

// Register a new user

export const registerUser = async (req, res) => {
    try {
        const { firsrName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (!firsrName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ firsrName, lastName, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }


};
// Login a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firsrName, lastName, email, password } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const hashedPassword = password ? await bcrypt.hash(password, 12) : user.password;
        await user.update({ firsrName, lastName, email, password: hashedPassword });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }  
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};
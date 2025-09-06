import Products from "../models/Product.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Register a new user

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // put in .env

export const registerProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProduct = await Products.create({
            name,
            description,
            price,
            category,
        });

        res.status(201).json({
            message: "Product created successfully",
            product: {
                id: newProduct.id,
                name: newProduct.name,
                description: newProduct.description,
                price: newProduct.price,
                category: newProduct.category
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const getAllProducts = async (req, res) => {
    try {
        const Product = await Products.findAll();
        res.status(200).json(Product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const Product = await Products.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(Product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category } = req.body;

        const Product = await Products.findByPk(id);
        if (!Product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await Product.update({
            name: name || Product.name,
            description: description || Product.description,
            price: price || Product.price,
            category: category || Product.category
          });

        res.status(200).json(Product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteProduct = async (req, res) => {
  try {
    // req.user is the authenticated user (set by verifyUser)
    console.log("deleteUser called by:", req.user); // helps debugging

    const { id } = req.params;
    const productToDelete = await Products.findByPk(id);

    if (!productToDelete) {
      return res.status(404).json({ message: "User to delete not found" });
    }

    // Optional: prevent admin from deleting themselves (uncomment if wanted)
    // if (req.user.id === userToDelete.id) {
    //   return res.status(400).json({ message: "Admins cannot delete their own account" });
    // }

    await productToDelete.destroy();
    return res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("deleteProduct error:", err);
    return res.status(500).json({ message: err.message });
  }
};

export const loginProduct = async (req, res) => {
    try {
        const { name } = req.body;
        const product = await Products.findOne({ where: { name } });
        if (!product) {
            return res.status(401).json({ message: "Invalid product credentials" });
        }
        const token = jwt.sign(
            { id: product.id, name: product.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({
            message: "Login successful",
            token,
            product: {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductFromToken = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.status(401).json({ message: "No token provided" });
        const token = authHeader.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token provided" });
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        const product = await Products.findByPk(decoded.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
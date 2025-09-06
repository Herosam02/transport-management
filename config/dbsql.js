import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "EcommerceProductCatalogAPI",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DIALECT || "mysql",  // ✅ default to mysql
    logging: false, // optional: remove SQL logs
  }
);


// Function to connect to the database
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export default sequelize;

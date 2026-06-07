const { Sequelize } = require('sequelize');
require('dotenv').config();

// Determine pool size based on environment
const getPoolConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    return {
      max: 20,        // Allow up to 20 connections in production
      min: 5,         // Maintain minimum 5 connections
      acquire: 30000, // 30 second timeout to acquire a connection
      idle: 10000,    // Close idle connections after 10 seconds
    };
  }
  
  return {
    max: 5,         // Limited connections in development
    min: 1,
    acquire: 30000,
    idle: 10000,
  };
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: getPoolConfig(),
  }
);

module.exports = sequelize;

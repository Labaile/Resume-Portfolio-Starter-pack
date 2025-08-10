const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'neondb',
  process.env.DB_USER || 'neondb_owner',
  process.env.DB_PASSWORD || 'npg_jlSWNsQ3i5HX',
  {
    host: process.env.DB_HOST || 'ep-ancient-meadow-a56tof3y-pooler.us-east-2.aws.neon.tech',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Neon PostgreSQL Connected Successfully');
    
    // Sync all models (create tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized');
    
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };

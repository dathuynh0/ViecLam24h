import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import crypto from "crypto"

const generateId = () => crypto.randomBytes(5).toString('hex');

const User = sequelize.define("User", {
    id: {
        type: DataTypes.STRING(16),
        primaryKey: true,
        defaultValue: () => generateId()
    },
    googleId: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING(100),
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(100),
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },
    role: {
        type: DataTypes.ENUM('admin', 'company', 'candidate'),
        defaultValue: 'candidate',
    }
},
{
    timestamps: true
});

export default User;
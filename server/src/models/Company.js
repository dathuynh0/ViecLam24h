import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import crypto from "crypto"
import User from "./User.js";

const generateId = () => crypto.randomBytes(5).toString('hex')

const Company = sequelize.define('Company', {
    id: {
        type: DataTypes.STRING(16),
        primaryKey: true,
        defaultValue: () => generateId()
    },
    userId: {
        type: DataTypes.STRING(16),
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    companyName: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.JSONB,
        defaultValue: []
    },
    logoUrl: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM('pending', 'active', 'rejected'),
        defaultValue: 'pending'
    },
    follow: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    taxCode: {
        type: DataTypes.STRING(15)
    },
    companySize: {
        type: DataTypes.STRING(10),
        defaultValue: 0
    },
    slug: {
        type: DataTypes.STRING,
        unique: true
    }
},
{
    timestamps: true
});


Company.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(Company, { foreignKey: 'userId', as: 'company' });

export default Company;
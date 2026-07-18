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
        set(value) {
            if (value) {
                this.setDataValue('companyName', value.toUpperCase());
            }
        }
    },
    description: {
        type: DataTypes.JSONB,
        defaultValue: []
    },
    logoUrl: {
        type: DataTypes.STRING,
        defaultValue: 'public/uploads/avatars/default-company.jpg'
    },
    address: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM('pending', 'active', 'rejected'),
        defaultValue: 'pending'
    },
    taxCode: {
        type: DataTypes.STRING(15)
    },
    companySize: {
        type: DataTypes.STRING,
        defaultValue: 0
    },
    website: {
        type: DataTypes.STRING
    },
    field: {
        type: DataTypes.STRING,
        // allowNull: false,
        defaultValue: 'Sản xuất'
    },
    slug: {
        type: DataTypes.STRING,
        unique: true
    }
},
{
    timestamps: true
});


Company.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
User.hasOne(Company, { foreignKey: 'userId', as: 'company', onDelete: 'CASCADE' });

export default Company;
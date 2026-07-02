import sequelize from "../config/db.js"
import { DataTypes } from "sequelize"
import crypto from "crypto"

const generateId = () => crypto.randomBytes(5).toString('hex')

const CategoryJob = sequelize.define("CategoryJob", {
    id: {
        type: DataTypes.STRING(16),
        primaryKey: true,
        defaultValue: () => generateId()
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    iconUrl: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},
{
    timestamps: true
});

export default CategoryJob;
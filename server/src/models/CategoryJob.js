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
        defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB1ElSkMVoXspMf9k9r_rBjF2Bnd-JOcc9MTtGUx5Dhg&s=10"
    }
},
{
    timestamps: true
});

export default CategoryJob;
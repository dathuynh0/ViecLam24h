import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import crypto from "crypto"
import User from "./User.js"

const generateId = () => crypto.randomBytes(5).toString('hex');

const Candidate = sequelize.define('Candidate', {
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
    fullName: {
        type: DataTypes.STRING(100)
    },
    avatarUrl: {
        type: DataTypes.STRING(100),
        defaultValue: "https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg"
    },
    cvUrl: {
        type: DataTypes.STRING(100)
    },
    skill: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING(10)
    }
},
{
    timestamps: true
})

Candidate.belongsTo(User, { foreignKey: 'userId', as: 'user' })
User.hasOne(Candidate, { foreignKey: 'userId', as: 'candidate' })

export default Candidate;
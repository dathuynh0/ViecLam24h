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
    bio: {
        type: DataTypes.JSONB,
        defaultValue: []
    },
    avatarUrl: {
        type: DataTypes.STRING(100),
        defaultValue: "public/uploads/avatars/default-candidate.jpg"
    },
    cvUrl: {
        type: DataTypes.STRING(100)
    },
    major: {
        type: DataTypes.STRING
    },
    skill: {
        type: DataTypes.JSONB,
        defaultValue: []
    },
    phone: {
        type: DataTypes.STRING(10)
    },
    location: {
        type: DataTypes.STRING
    }
},
{
    timestamps: true
})

Candidate.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' })
User.hasOne(Candidate, { foreignKey: 'userId', as: 'candidate', onDelete: 'CASCADE' })

export default Candidate;
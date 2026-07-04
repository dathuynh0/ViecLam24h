import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import crypto from "crypto";

import User from "./User.js";

const generateId = () => crypto.randomBytes(5).toString("hex");

const Session = sequelize.define('Session', {
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
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
},
{
    timestamps: true,
    updatedAt: false,
})


Session.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Session, { foreignKey: 'userId', as: 'sessions' })

export default Session;
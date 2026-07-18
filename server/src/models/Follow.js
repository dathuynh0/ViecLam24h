import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import crypto from "crypto"
import Candidate from "./Candidate.js";
import Company from "./Company.js"

const generateId = () => crypto.randomBytes(5).toString('hex');

const Follow = sequelize.define('Follow', {
    id: {
        type: DataTypes.STRING(16),
        primaryKey: true,
        defaultValue: () => generateId()
    },
    companyId: {
        type: DataTypes.STRING(16),
        allowNull: false,
        references: {
            model: Company,
            key: 'id'
        }
    },
    candidateId: {
        type: DataTypes.STRING(16),
        allowNull: false,
        references: {
            model: Candidate,
            key: 'id'
        }
    }
},
{
    createdAt: true,
    indexes: [
        { unique: true, fields: ['candidateId', 'companyId'] } // Tránh trùng lặp follow
    ]
})

Candidate.belongsToMany(Company, { through: Follow, foreignKey: 'candidateId' });
Company.belongsToMany(Candidate, { through: Follow, foreignKey: 'companyId' });

export default Follow;
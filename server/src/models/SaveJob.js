import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import crypto from "crypto"


const generateId = () => crypto.randomBytes(5).toString('hex')

const SaveJob = sequelize.define('SaveJob', {
    id: {
        type: DataTypes.STRING(16),
        primaryKey: true,
        defaultValue: () => generateId()
    }
})

export default SaveJob;
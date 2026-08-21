import sequelize from '../config/db.js'
import { DataTypes } from 'sequelize'
import User from './User.js'
import crypto from 'crypto'
import Candidate from './Candidate.js'

const randomId = () => crypto.randomBytes(5).toString('hex')

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.STRING(16),
        primaryKey: true,
        defaultValue: () => randomId()
    },
    to: {
        type: DataTypes.STRING(16),
        allowNull: false,
        references: {
            model: Candidate,
            key: 'id'
        }
    },
    title: {
        type: DataTypes.TEXT,
        required: true
    },
    content: {
        type: DataTypes.TEXT,
        required: true
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    }
})

export default Notification
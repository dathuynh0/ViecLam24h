import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import crypto from "crypto"

import Candidate from './Candidate.js'
import Job from "./Job.js";

const generateId = () => crypto.randomBytes(5).toString('hex')

const JobApplication = sequelize.define('JobApplication', {
    id: {
        type: DataTypes.STRING(16),
        primaryKey: true,
        defaultValue: () => generateId()
    },
    candidateId: {
        type: DataTypes.STRING(16),
        allowNull: false,
        references: {
            model: Candidate,
            key: 'id'
        }
    },
    jobId: {
        type: DataTypes.STRING(16),
        allowNull: false,
        references: {
            model: Job,
            key: 'id'
        }
    },
    applyCVUrl: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    introduction: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    status: {
        type: DataTypes.ENUM('pending', 'reviewing', 'interviewing', 'accepted', 'rejected'),
        defaultValue: 'pending'
    }
},
{
    indexes: [
        {
            unique: true,
            fields: ['candidateId', 'jobId']
        }
    ],
    timestamps: true
});

// candidate 1 - n JobApplication
Candidate.hasMany(JobApplication, { foreignKey: 'candidateId', as: 'application' })
JobApplication.belongsTo(Candidate, { foreignKey: 'candidateId', as: 'candidate' })

// job 1 - n JobApplication
Job.hasMany(JobApplication, { foreignKey: 'jobId', as: 'applications' })
JobApplication.belongsTo(Job, { foreignKey: 'jobId', as: 'job' })

export default JobApplication;
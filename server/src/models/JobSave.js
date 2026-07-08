import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import crypto from "crypto"

import Candidate from './Candidate.js'
import Job from "./Job.js";

const generateId = () => crypto.randomBytes(5).toString('hex')

const JobSave = sequelize.define('JobSave', {
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
    savedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
},
{
    indexes: [
        {
            unique: true,
            fields: ['candidateId', 'jobId']
        }
    ]
});

// candidate n - 1 jobSave
Candidate.hasMany(JobSave, { foreignKey: 'candidateId', as: 'jobSaves'})
JobSave.belongsTo(Candidate, { foreignKey: 'candidateId', as: 'candidate'})

// job 1 - n jobsave
Job.hasMany(JobSave, { foreignKey: 'jobId', as: 'jobSaves',  onDelete: 'CASCADE', hooks: true })
JobSave.belongsTo(Job, { foreignKey: 'jobId', as: 'job', onDelete: "CASCADE" })

export default JobSave;
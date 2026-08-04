import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import crypto from "crypto"

import Company from "./Company.js";
import CategoryJob from "./CategoryJob.js";

const generateId = () => crypto.randomBytes(5).toString('hex')

const Job = sequelize.define("Job", {
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
        },
    },
    categoryId: {
        type: DataTypes.STRING(16),
        allowNull: false,
        references: {
            model: CategoryJob,
            key: 'id'
        }
    },
    title: {
        type: DataTypes.TEXT,
        unique: true,
    },
    jobRequirement: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
    },
    description: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
    },
    candidateRequirement: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
    },
    benefit: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
    },
    salaryMin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    salaryMax: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    workTime: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    workArrangement: {
        type: DataTypes.ENUM('remote', 'hybrid', 'on_site'),
        defaultValue: 'on_site'
    },
    workType: {
        type: DataTypes.ENUM('full_time', 'part_time', 'internship'),
        defaultValue: 'full_time'
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    slug: {
        type: DataTypes.STRING,
        unique: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'rejected', 'active'),
        defaultValue: 'pending'
    },
    expiredAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
},
{
    timestamps: true,
    indexes: [
        { fields: ['companyId'] }
    ]
})

// job n - 1 company
Job.belongsTo(Company, { foreignKey: 'companyId', as: 'createdBy', onDelete: 'CASCADE' })
Company.hasMany(Job, { foreignKey: 'companyId', as: 'job', onDelete: 'CASCADE' })

// job 1 - N categoryJob
Job.belongsTo(CategoryJob, { foreignKey: 'categoryId', as: 'category'})
CategoryJob.hasMany(Job, { foreignKey: 'categoryId', as: 'job'})


export default Job;
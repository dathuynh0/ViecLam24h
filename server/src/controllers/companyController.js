import { Op, where, Sequelize } from "sequelize";
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import Follow from "../models/Follow.js";
import fs from 'fs/promises'
import path from 'path'

const getAllCompany = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = 18;
        const offset = (page - 1) * limit;
        const { name } = req.query;
        const where = {
            status: 'active'
        }
        if (name) {
            where.companyName = { [Op.iLike]: `%${name}%` }
        }


        const { count, rows } = await Company.findAndCountAll({
            where,
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM "Jobs" AS job
                            WHERE job."companyId" = "Company"."id"
                            AND job."status" = 'active' AND job."expiredAt" > NOW()
                        )`),
                        'jobCount'
                    ]
                ]
            },
            order: [['jobCount', 'DESC']],
            limit: limit,
            offset: offset
        });

        const totalPage = Math.ceil(count / limit)

        return res.status(200).json({message: "Lấy dữ liệu thành công ", totalPage, company: rows})
    } catch (error) {
        console.log('Lỗi khi gọi hàm getAllCompany: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const getFeaturedCompany = async (req, res) => {
    try {
        const featuredCompany = await Company.findAll({
            where: { status: 'active' },
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM "Follows" AS follow
                            WHERE follow."companyId" = "Company"."id"
                        )`),
                        'followerCount'
                    ]
                ]
            },
            include: [{
                model: Job,
                as: 'job',
                where: {
                    expiredAt: { [Op.gt]: new Date() }
                },
                attributes: ['id', 'title'],
                required: false
            }],
            order: [
                [Sequelize.literal('"followerCount"'), 'DESC']
            ],
            //subQuery: false, // bắt buộc khi có limit + include (tránh lỗi order theo cột không nằm trong subquery)
            limit: 9
        });

        return res.status(200).json({ featuredCompany });
    } catch (error) {
        console.log('Lỗi khi gọi hàm getFeaturedCompany: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}


const getCompanyBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const company = await Company.findOne({
            where: { slug },
            include: [
                {
                    model: Job,
                    as: 'job',
                    where: {
                        status: 'active'
                    },
                    attributes: ['id', 'title', 'location', 'slug', 'salaryMin', 'salaryMax', 'createdAt'],
                    limit: 10,
                    order: [['createdAt', 'DESC']],
                }
            ]
        });
        if(!company) {
            return res.status(404).json({ message: "Không tìm thấy thông tin công ty" })
        }

        return res.status(200).json({ company })
    } catch (error) {
        console.log('Lỗi khi gọi hàm getCompanyById: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const updateMyCompany = async (req, res) => {
    try {
        const company = req.user.company;
        const { companyName, description, address, taxCode, companySize, website, field } = req.body;
        
        const update = await Company.update({
            companyName, description, address, taxCode, companySize, website, field
        }, {
            where: { id: company.id }
        })

        return res.status(200).json({ message: 'Cập nhật thông tin công ty thành công ', company})
    } catch (error) {
        console.log('Lỗi khi gọi hàm updateMyCompany: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const updateLogoMyCompany = async (req, res) => {
    try {
        const company = req.user.company;

        const oldLogoPath = company.logoUrl;

        company.logoUrl = req.file.path;
        await company.save();

        if (oldLogoPath) {
            await fs.unlink(path.resolve(oldLogoPath))
        }

        return res.status(200).json({ message: 'Cập nhật logo thành công ', company});
    } catch (error) {
        console.log('Lỗi khi gọi hàm updateLogoCompany: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const followCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        const candidate = req.user.candidate;

        const company = await Company.findByPk(companyId);

        if (!company) {
            return res.status(404).json({ message: 'Không tìm thấy công ty' });
        }

        const follow = await Follow.create({
            companyId: company.id,
            candidateId: candidate.id
        });

        return res.status(200).json({ follow });
    } catch (error) {
        console.log('Lỗi khi gọi hàm followCompany: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const unFollow = async (req, res) => {
    try {
        const { companyId } = req.params;
        const candidate = req.user.candidate;

        const follow = await Follow.findOne({
            where: { companyId, candidateId: candidate.id }
        })

        if (!follow) {
            return res.status(404).json({ message: 'Ứng viên chưa theo dõi công ty' });
        }

        await follow.destroy();

        return res.status(200).json({ message: 'Unfollow thành công'})
    } catch (error) {
        console.log('Lỗi khi gọi hàm unFollow: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const countFollow = async (req, res) => {
    try {
        const { companyId } = req.params;

        const follows = await Follow.findAll(
            {
                where: {
                    companyId
                }
            }
        );

        return res.status(200).json({ follows });
    } catch (error) {
        console.log('Lỗi khi gọi hàm countFollow: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

// Admin
const updateCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        const { companyName, description, taxCode, companySize, field, website } = req.body;

        const [updatedRowsCount] = await Company.update({
                companyName,
                description,
                taxCode,
                companySize,
                field,
                website
            },
            {
                where: { id: companyId }
            }
        );

        return res.status(200).json({ message: 'Cập nhật công ty thành công ', updatedRowsCount })
    } catch (error) {
        console.log('Lỗi khi gọi hàm updateCompany: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const updateLogoCompany = async (req, res) => {
    try {
        const { companyId } = req.body;

        const company = await Company.findByPk(companyId);
        if(!company) {
            return res.status(404).json({ message: 'Không tìm thấy công ty' });
        }

        company.logoUrl = req.file.path;
        await company.save();

        return res.status(200).json({ message: 'Cập nhật logo thành công ', company});
    } catch (error) {
        console.log('Lỗi khi gọi hàm updateLogoCompany: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const updateActiveStatusCompany = async (req, res) => {
    try {
        const { companyId } = req.body;

        const company = await Company.findByPk(companyId);
        if(!company) {
            return res.status(404).json({ message: 'Không tìm thấy công ty '});
        }

        if(company.status !== 'pending') {
            return res.status(400).json({ message: 'Công ty đã được kích hoạt hoặc từ chối '});
        }

        company.status = 'active';
        await company.save();

        return res.status(200).json({ message: 'Cập nhật trạng thái thành công', company })
    } catch (error) {
        console.log('Lỗi khi gọi hàm updateActiveStatusCompany: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const rejectCompany = async (req, res) => {
    try {
        const { companyId } = req.body;

        const company = await Company.findByPk(companyId);
        if(!company) {
            return res.status(404).json({ message: 'Không tìm thấy công ty '});
        }

        if(company.status !== 'pending') {
            return res.status(400).json({ message: 'Công ty đang hoạt động hoặc bị từ chối '});
        }

        company.status = 'rejected';
        await company.save();

        return res.status(200).json({ message: 'Từ chối duyệt công ty thành công ', company });
    } catch (error) {
        console.log('Lỗi khi gọi hàm rejectCompany: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}


const deleteCompany = async (req, res) => {
    try {
        const { companyId } = req.params;

        const company = await Company.findByPk(companyId);
        if(!company) {
            return res.status(404).json({ message: 'Không tìm thấy công ty '});
        }

        await company.destroy();

        return res.status(200).json({ message: 'Xóa công ty thành công ', company });
    } catch (error) {
        console.log('Lỗi khi gọi hàm deleteCompany: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const getAllCompanyByAdmin = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = 8;
        const offset = (page - 1) * limit;
        const status = req.query.status;

        const where = {};
        if (status && status !== 'all') {
            where.status = status
        }

        const { count, rows: company } = await Company.findAndCountAll({
            where,
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']]
        });

        const totalPage = Math.ceil(count / limit)

        return res.status(200).json({message: "Lấy dữ liệu thành công ", page, totalPage, company})
    } catch (error) {
        console.log('Lỗi khi gọi hàm getAllCompany: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export {
    getAllCompany,
    getCompanyBySlug,
    updateMyCompany,
    updateLogoCompany,
    deleteCompany,
    updateActiveStatusCompany,
    rejectCompany,
    getFeaturedCompany,
    updateCompany,
    updateLogoMyCompany,
    followCompany,
    countFollow,
    unFollow,
    getAllCompanyByAdmin
}
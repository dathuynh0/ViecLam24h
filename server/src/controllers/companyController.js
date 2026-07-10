import { Op, where } from "sequelize";
import Company from "../models/Company.js";
import Job from "../models/Job.js";

const getAllCompany = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = 12;
        const offset = (page - 1) * limit;

        const { count, rows } = await Company.findAndCountAll({
            where: {
                status: 'active'
            },
            limit: limit,
            offset: offset
        });

        const totalPage = Math.ceil(count / limit)

        return res.status(200).json({message: "Lấy dữ liệu thành công ", page, totalPage, company: rows})
    } catch (error) {
        console.log('Lỗi khi gọi hàm getAllCompany: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const getFeaturedCompany = async (req, res) => {
    try {
        const featuredCompany = await Company.findAll({
            where: { status: 'active' },
            include: [{
                model: Job, as: 'job', where: {
                    expiredAt: {
                        [Op.gt]: new Date()
                    }
                },
                attributes: [ 'id', 'title' ],
                required: false 
            }],
            order: [['follow', 'DESC']],
            limit: 9
        });

        return res.status(200).json({ featuredCompany });
    } catch (error) {
        console.log('Lỗi khi gọi hàm getFeaturedCompany: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}


const getCompanyById = async (req, res) => {
    try {
        const { companyId } = req.params;

        const company = await Company.findOne({
            where: { id: companyId },
            include: [
                {
                    model: Job,
                    as: 'job'
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
        const { companyName, description, address, taxCode, companySize } = req.body;
        
        company.companyName = companyName;
        company.description = description;
        company.address = address;
        company.taxCode = taxCode;
        company.companySize = companySize;
        await company.save();

        return res.status(200).json({ message: 'Cập nhật thông tin công ty thành công ', company})
    } catch (error) {
        console.log('Lỗi khi gọi hàm updateMyCompany: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const updateLogoMyCompany = async (req, res) => {
    try {
        const company = req.user.company;

        company.logoUrl = req.file.path;
        await company.save();

        return res.status(200).json({ message: 'Cập nhật logo thành công ', company});
    } catch (error) {
        console.log('Lỗi khi gọi hàm updateLogoCompany: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

// Admin
const updateCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        const { companyName, description, taxCode, companySize, field } = req.body;

        const [updatedRowsCount] = await Company.update({
                companyName,
                description,
                taxCode,
                companySize,
                field
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
        const { companyId } = req.body;

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

export {
    getAllCompany,
    getCompanyById,
    updateMyCompany,
    updateLogoCompany,
    deleteCompany,
    updateActiveStatusCompany,
    rejectCompany,
    getFeaturedCompany,
    updateCompany,
    updateLogoMyCompany
}
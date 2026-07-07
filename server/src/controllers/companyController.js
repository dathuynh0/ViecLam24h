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

export {
    getAllCompany,
    getCompanyById,
    updateMyCompany
}
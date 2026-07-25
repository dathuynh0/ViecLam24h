import Candidate from '../models/Candidate.js';
import Job from '../models/Job.js';
import JobSave from '../models/JobSave.js';
import User from '../models/User.js';
import fs from 'fs/promises'
import path from 'path'

const updateAvatar = async (req, res) => {
    try {
        const candidate = req.user.candidate;
        const file = req.file;

        const oldAvatarPath = candidate.avatarUrl;

        candidate.avatarUrl = file.path;
        await candidate.save();

        if (oldAvatarPath) {
            await fs.unlink(path.resolve(oldAvatarPath));
        }

        return res.status(200).json({ message: 'Cập nhật avatar thành công', candidate})
    } catch (error) {
        console.error('Lỗi khi gọi hàm updateAvatar: ', error);
        return res.status(500).json({ message: 'Lỗi server '})
    }
}

const updateCV = async (req, res) => {
    try {
        const candidate = req.user.candidate;

        const oldCVPath = candidate.cvUrl;

        candidate.cvUrl = req.file.path;
        await candidate.save();

        if (oldCVPath) {
            await fs.unlink(path.resolve(oldCVPath))
        }

        return res.status(200).json({ message: 'Tải CV lên thành công ', candidate })
    } catch (error) {
        console.error('Lỗi khi gọi hàm updateCV: ', error);
        return res.status(500).json({ message: 'Lỗi server '})
    }
}

const updateMyProfile = async (req, res) => {
    try {
        const candidate = req.user.candidate;
        const { fullName, bio, skill, phone, location, major } = req.body;
        
        candidate.fullName = fullName;
        candidate.bio = bio;
        candidate.skill = skill;
        candidate.phone = phone;
        candidate.location = location;
        candidate.major = major;
        await candidate.save();

        return res.status(200).json({ message: 'Cập nhật thông tin ứng viên thành công', candidate})
    } catch (error) {
        console.error('Lỗi khi gọi hàm updateMyProfile: ', error);
        return res.status(500).json({ message: 'Lỗi server '})
    }
}

// saveJob
const saveJob = async (req, res) => {
    try {
        const candidate = req.user.candidate;
        const { jobId } = req.body;

        const job = await Job.findByPk(jobId);
        if(!job) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng tuyển dụng' });
        }

        if(job.status !== 'active') {
            return res.status(400).json({ message: 'Bài đăng không trong trạng thái sẵn sàng '});
        }

        const jobSave = await JobSave.create({
            candidateId: candidate.id,
            jobId
        });

        return res.status(201).json({ message: 'Lưu job thành công', jobSave })
    } catch (error) {
        console.error('Lỗi khi gọi hàm saveJob: ', error);
        return res.status(500).json({ message: 'Lỗi server '})
    }
}

const getAllMySaveJob = async (req, res) => {
    try {
        const candidate = req.user.candidate;

        const jobSaves = await JobSave.findAll({ where: { candidateId: candidate.id }, include: [
            {
                model: Job, as: 'job', attributes: ['id', 'title', 'salaryMin', 'salaryMax', 'location', 'slug']
            }
        ]});    

        return res.status(200).json({ jobSaves });
    } catch (error) {
        console.error('Lỗi khi gọi hàm getAllSaveJob: ', error);
        return res.status(500).json({ message: 'Lỗi server '})
    }
}

const deleteSaveJob = async (req, res) => {
    try {
        const { jobsaveId } = req.params;

        const jobSave = await JobSave.findByPk(jobsaveId);
        if(!jobSave) {
            return res.status(404).json({ message: 'Không tìm thấy saveJob' });
        }

        await JobSave.destroy({ where: { id: jobsaveId }});
        
        return res.status(200).json({ message: 'Xóa thành công jobSave ', jobSave })
    } catch (error) {
        console.error('Lỗi khi gọi hàm deleteSaveJob: ', error);
        return res.status(500).json({ message: 'Lỗi server '})
    }
}

//ADMIN
const getAllCandidate = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = 8;
        const offset = (page - 1) * limit;

        const status = req.query.status;
        const where = { role: 'candidate' };
        if (status && status !== 'all') {
            where.status = status;
        }

        const { count, rows: candidates } = await Candidate.findAndCountAll({
            include: [
                { model: User, as: 'user', where, attributes: { exclude: ['password'] } }
            ],
            attributes: { exclude: ['bio', 'skill'] },
            limit: limit,
            offset: offset
        });
        const totalPage = Math.ceil(count / limit)

        return res.status(200).json({ message: 'Lấy danh sách ứng viên thành công ',
            totalPage,
            candidates
        })
    } catch (error) {
        console.error('Lỗi khi gọi hàm getAllCandidate: ', error);
        return res.status(500).json({ message: 'Lỗi server '})
    }
}

const activeCandidate = async (req, res) => {
    try {
        const { candidateId } = req.body;

        const candidate = await Candidate.findByPk(candidateId);
        if(!candidate) {
            return res.status(404).json({ message: 'Không tìm thấy ứng viên' });
        }

        const user = await User.findByPk(candidate.userId);
        user.status = 'active';
        await user.save();

        return res.status(200).json({ message: 'Active tài khoản thành công ', user})
    } catch (error) {
        console.error('Lỗi khi gọi hàm activeCandidate: ', error);
        return res.status(500).json({ message: 'Lỗi server '})
    }
}

const blockLoginCandidate = async (req, res) => {
    try {
        const { candidateId } = req.body;

        const candidate = await Candidate.findByPk(candidateId);
        if(!candidate) {
            return res.status(404).json({ message: 'Không tìm thấy ứng viên' });
        }

        const user = await User.findByPk(candidate.userId);
        user.status = 'inactive';
        await user.save();

        return res.status(200).json({ message: 'Khóa tài khoản thành công ', user})
    } catch (error) {
        console.error('Lỗi khi gọi hàm blockLoginCandidate: ', error);
        return res.status(500).json({ message: 'Lỗi server '})
    }
}

const deleteCandidate = async (req, res) => {
    try {
        const { candidateId } = req.params;

        const candidate = await Candidate.findByPk(candidateId);
        if(!candidate) {
            return res.status(404).json({ message: 'Không tìm thấy ứng viên'});
        }

        await candidate.destroy();

        return res.status(200).json({ message: 'Xóa ứng viên thành công ', candidate });
    } catch (error) {
        console.error('Lỗi khi gọi hàm deleteCandidate: ', error);
        return res.status(500).json({ message: 'Lỗi server '})
    }
}

export {
    activeCandidate,
    updateAvatar,
    updateCV,
    updateMyProfile,
    saveJob,
    getAllMySaveJob,
    deleteSaveJob,
    getAllCandidate,
    deleteCandidate,
    blockLoginCandidate
}
import Job from '../models/Job.js';
import JobSave from '../models/JobSave.js';

const updateAvatar = async (req, res) => {
    try {
        const candidate = req.user.candidate;
        const file = req.file;

        candidate.avatarUrl = file.path;
        await candidate.save();

        return res.status(200).json({ message: 'Cập nhật avatar thành công', candidate})
    } catch (error) {
        console.error('Lỗi khi gọi hàm updateAvatar: ', error);
        return res.status(500).json({ message: 'Lỗi server '})
    }
}

const updateCV = async (req, res) => {
    try {
        const candidate = req.user.candidate;

        candidate.cvUrl = req.file.path;
        await candidate.save();

        return res.status(200).json({ message: 'Tải CV lên thành công ', candidate })
    } catch (error) {
        console.error('Lỗi khi gọi hàm updateCV: ', error);
        return res.status(500).json({ message: 'Lỗi server '})
    }
}

const updateMyProfile = async (req, res) => {
    try {
        const candidate = req.user.candidate;
        const { fullName, skill, phone } = req.body;
        
        candidate.fullName = fullName;
        candidate.skill = skill;
        candidate.phone = phone;
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
                model: Job, as: 'job'
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

export {
    updateAvatar,
    updateCV,
    updateMyProfile,
    saveJob,
    getAllMySaveJob,
    deleteSaveJob
}
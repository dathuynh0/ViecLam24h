import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header.jsx';
import { createJob, deleteJob, getJobs, updateJob } from '../api/jobApi.js';

const emptyForm = {
  companyId: '',
  categoryId: '',
  title: '',
  salaryMin: '',
  salaryMax: '',
  location: '',
  workTime: 'Toàn thời gian',
  jobRequirement: '',
  description: '',
  candidateRequirement: '',
  benefit: '',
};

const demoJobs = [
  {
    id: 'demo-react',
    companyId: 'company-demo',
    categoryId: 'category-it',
    title: 'Lập trình viên ReactJS',
    salaryMin: 12,
    salaryMax: 18,
    location: 'TP. Hồ Chí Minh',
    workTime: ['Toàn thời gian'],
    createdBy: { companyName: 'ViecLam24h Technology' },
    category: { title: 'Công nghệ thông tin' },
    description: ['Phát triển giao diện website tuyển dụng.', 'Tích hợp API quản lý bài đăng.'],
    jobRequirement: ['Có kinh nghiệm ReactJS cơ bản.'],
    candidateRequirement: ['Biết HTML, CSS, JavaScript.'],
    benefit: ['Lương tháng 13', 'Môi trường trẻ trung'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-marketing',
    companyId: 'company-demo',
    categoryId: 'category-marketing',
    title: 'Nhân viên Marketing Executive',
    salaryMin: 10,
    salaryMax: 15,
    location: 'Hà Nội',
    workTime: ['Giờ hành chính'],
    createdBy: { companyName: 'Green Media' },
    category: { title: 'Marketing' },
    description: ['Lên kế hoạch nội dung và triển khai chiến dịch truyền thông.'],
    jobRequirement: ['Có tư duy nội dung và phân tích số liệu.'],
    candidateRequirement: ['Giao tiếp tốt, chủ động.'],
    benefit: ['Thưởng hiệu quả', 'Đào tạo chuyên môn'],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

function toText(value) {
  if (Array.isArray(value)) return value.join('\n');
  if (!value) return '';
  if (typeof value === 'string') return value;
  return Object.values(value).filter(Boolean).join('\n');
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  if (typeof value !== 'string') return Object.values(value).filter(Boolean);
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function formatSalary(min, max) {
  const minValue = Number(min);
  const maxValue = Number(max);
  if (Number.isFinite(minValue) && Number.isFinite(maxValue) && minValue > 0 && maxValue > 0) {
    return `${minValue} - ${maxValue} triệu`;
  }
  if (Number.isFinite(minValue) && minValue > 0) return `Từ ${minValue} triệu`;
  if (Number.isFinite(maxValue) && maxValue > 0) return `Đến ${maxValue} triệu`;
  return 'Thỏa thuận';
}

function formatDate(value) {
  if (!value) return 'Chưa cập nhật';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Chưa cập nhật';
  return date.toLocaleDateString('vi-VN');
}

function getCompanyName(job) {
  return job.createdBy?.companyName || job.company?.companyName || job.companyName || job.companyId || 'Chưa có công ty';
}

function getCategoryName(job) {
  if (Array.isArray(job.category)) return job.category[0]?.title || job.categoryId || 'Chưa phân loại';
  return job.category?.title || job.categoryName || job.categoryId || 'Chưa phân loại';
}

function buildPayload(form) {
  return {
    companyId: form.companyId.trim(),
    categoryId: form.categoryId.trim(),
    title: form.title.trim(),
    salaryMin: Number(form.salaryMin),
    salaryMax: Number(form.salaryMax),
    location: form.location.trim(),
    workTime: toArray(form.workTime),
    jobRequirement: toArray(form.jobRequirement),
    description: toArray(form.description),
    candidateRequirement: toArray(form.candidateRequirement),
    benefit: toArray(form.benefit),
  };
}

function validateForm(form) {
  if (!form.companyId.trim()) return 'Vui lòng nhập mã công ty.';
  if (!form.categoryId.trim()) return 'Vui lòng nhập mã ngành nghề.';
  if (!form.title.trim()) return 'Vui lòng nhập tiêu đề bài đăng.';
  if (!form.location.trim()) return 'Vui lòng nhập địa điểm làm việc.';
  if (!form.salaryMin || Number(form.salaryMin) < 0) return 'Vui lòng nhập lương tối thiểu hợp lệ.';
  if (!form.salaryMax || Number(form.salaryMax) < 0) return 'Vui lòng nhập lương tối đa hợp lệ.';
  if (Number(form.salaryMin) > Number(form.salaryMax)) return 'Lương tối thiểu không được lớn hơn lương tối đa.';
  return '';
}

export default function ManageJobPostsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [useDemoData, setUseDemoData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');

  const isEditing = Boolean(editingId);

  async function loadJobs() {
    setLoading(true);
    setError('');
    setUseDemoData(false);

    try {
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      setJobs(demoJobs);
      setUseDemoData(true);
      setError(err.message || 'Không thể kết nối API quản lý bài đăng');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const keyword = normalizeText(searchTerm);
    return jobs.filter((job) => {
      if (!keyword) return true;
      return (
        normalizeText(job.title).includes(keyword)
        || normalizeText(getCompanyName(job)).includes(keyword)
        || normalizeText(job.location).includes(keyword)
        || normalizeText(getCategoryName(job)).includes(keyword)
      );
    });
  }, [jobs, searchTerm]);

  const stats = useMemo(() => {
    const companies = new Set(jobs.map(getCompanyName).filter(Boolean));
    const locations = new Set(jobs.map((job) => job.location).filter(Boolean));
    return {
      total: jobs.length,
      companies: companies.size,
      locations: locations.size,
    };
  }, [jobs]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId('');
  };

  const handleEdit = (job) => {
    setEditingId(job.id);
    setForm({
      companyId: job.companyId || '',
      categoryId: job.categoryId || '',
      title: job.title || '',
      salaryMin: job.salaryMin ?? '',
      salaryMax: job.salaryMax ?? '',
      location: job.location || '',
      workTime: toText(job.workTime),
      jobRequirement: toText(job.jobRequirement),
      description: toText(job.description),
      candidateRequirement: toText(job.candidateRequirement),
      benefit: toText(job.benefit),
    });
    setSuccess('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess('');
    setError('');

    const validationMessage = validateForm(form);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    if (useDemoData) {
      setError('Đang dùng dữ liệu demo vì chưa kết nối được API. Hãy chạy backend trước khi thêm/sửa bài đăng.');
      return;
    }

    setSaving(true);
    try {
      const payload = buildPayload(form);
      if (isEditing) {
        await updateJob(editingId, payload);
        setSuccess('Cập nhật bài đăng thành công.');
      } else {
        await createJob(payload);
        setSuccess('Đăng bài tuyển dụng thành công.');
      }
      resetForm();
      await loadJobs();
    } catch (err) {
      setError(err.message || 'Không thể lưu bài đăng tuyển dụng');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (job) => {
    if (useDemoData) {
      setError('Đang dùng dữ liệu demo nên không thể xóa bài đăng thật.');
      return;
    }

    const ok = window.confirm(`Bạn có chắc muốn xóa bài đăng "${job.title}" không?`);
    if (!ok) return;

    setDeletingId(job.id);
    setSuccess('');
    setError('');
    try {
      await deleteJob(job.id);
      setSuccess('Xóa bài đăng thành công.');
      if (editingId === job.id) resetForm();
      await loadJobs();
    } catch (err) {
      setError(err.message || 'Không thể xóa bài đăng');
    } finally {
      setDeletingId('');
    }
  };

  return (
    <>
      <Header active="manage-jobs" />
      <main className="manage-job-page">
        <section className="page-hero compact-hero manage-job-hero">
          <div className="container manage-job-hero-grid">
            <div>
              <span className="pill">● Dashboard nhà tuyển dụng</span>
              <h1>Quản lý bài đăng tuyển dụng</h1>
              <p>Tạo mới, chỉnh sửa, xóa và theo dõi nhanh các tin tuyển dụng trên hệ thống ViecLam24h.</p>
            </div>
            <div className="manage-job-stats">
              <div><strong>{stats.total}</strong><span>Bài đăng</span></div>
              <div><strong>{stats.companies}</strong><span>Công ty</span></div>
              <div><strong>{stats.locations}</strong><span>Địa điểm</span></div>
            </div>
          </div>
        </section>

        <section className="container manage-job-layout">
          <aside className="manage-job-form-card">
            <div className="manage-section-head compact">
              <div>
                <h2>{isEditing ? 'Sửa bài đăng' : 'Đăng bài mới'}</h2>
                <p>{isEditing ? `Đang sửa mã tin: ${editingId}` : 'Nhập thông tin tuyển dụng để đăng bài.'}</p>
              </div>
              {isEditing && <button className="btn btn-ghost" type="button" onClick={resetForm}>Hủy sửa</button>}
            </div>

            {error && <div className="manage-alert error">{error}</div>}
            {success && <div className="manage-alert success">{success}</div>}

            <form className="manage-job-form" onSubmit={handleSubmit}>
              <label>Mã công ty *</label>
              <input name="companyId" value={form.companyId} onChange={handleChange} placeholder="VD: id công ty trong database" />

              <label>Mã ngành nghề *</label>
              <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="VD: id danh mục việc làm" />

              <label>Tiêu đề bài đăng *</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="VD: Lập trình viên ReactJS" />

              <div className="manage-two-fields">
                <div>
                  <label>Lương tối thiểu *</label>
                  <input type="number" name="salaryMin" value={form.salaryMin} onChange={handleChange} placeholder="12" />
                </div>
                <div>
                  <label>Lương tối đa *</label>
                  <input type="number" name="salaryMax" value={form.salaryMax} onChange={handleChange} placeholder="18" />
                </div>
              </div>

              <label>Địa điểm *</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="VD: TP. Hồ Chí Minh" />

              <label>Thời gian làm việc</label>
              <textarea name="workTime" value={form.workTime} onChange={handleChange} rows="2" placeholder="Mỗi dòng là một lựa chọn. VD: Toàn thời gian" />

              <label>Mô tả công việc</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows="3" placeholder="Mỗi dòng là một ý mô tả công việc" />

              <label>Yêu cầu công việc</label>
              <textarea name="jobRequirement" value={form.jobRequirement} onChange={handleChange} rows="3" placeholder="Mỗi dòng là một yêu cầu công việc" />

              <label>Yêu cầu ứng viên</label>
              <textarea name="candidateRequirement" value={form.candidateRequirement} onChange={handleChange} rows="3" placeholder="Mỗi dòng là một yêu cầu với ứng viên" />

              <label>Quyền lợi</label>
              <textarea name="benefit" value={form.benefit} onChange={handleChange} rows="3" placeholder="Mỗi dòng là một quyền lợi" />

              <button className="btn btn-primary full-width" type="submit" disabled={saving}>
                {saving ? 'Đang lưu...' : isEditing ? 'Cập nhật bài đăng' : 'Đăng bài tuyển dụng'}
              </button>
            </form>
          </aside>

          <section className="manage-job-table-card">
            <div className="manage-section-head">
              <div>
                <h2>Danh sách bài đăng</h2>
                <p>Theo dõi các bài tuyển dụng đã tạo trong hệ thống.</p>
                {useDemoData && <span className="demo-note">Đang hiển thị dữ liệu demo vì chưa kết nối được API.</span>}
              </div>
              <div className="manage-table-actions">
                <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Tìm theo tiêu đề, công ty, địa điểm..." />
                <button className="btn btn-outline" type="button" onClick={loadJobs}>Làm mới</button>
              </div>
            </div>

            {loading ? (
              <div className="jobs-state">Đang tải danh sách bài đăng...</div>
            ) : filteredJobs.length === 0 ? (
              <div className="jobs-empty-state">
                <div>📭</div>
                <h3>Chưa có bài đăng phù hợp</h3>
                <p>Hãy đăng bài tuyển dụng mới hoặc thay đổi từ khóa tìm kiếm.</p>
              </div>
            ) : (
              <div className="manage-job-table-wrap">
                <table className="manage-job-table">
                  <thead>
                    <tr>
                      <th>Bài đăng</th>
                      <th>Công ty</th>
                      <th>Lương</th>
                      <th>Địa điểm</th>
                      <th>Ngày đăng</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map((job) => (
                      <tr key={job.id}>
                        <td>
                          <strong>{job.title || 'Chưa có tiêu đề'}</strong>
                          <span>Mã tin: {job.id}</span>
                          <em>{getCategoryName(job)}</em>
                        </td>
                        <td>{getCompanyName(job)}</td>
                        <td>{formatSalary(job.salaryMin, job.salaryMax)}</td>
                        <td>{job.location || 'Chưa cập nhật'}</td>
                        <td>{formatDate(job.createdAt)}</td>
                        <td>
                          <div className="manage-row-actions">
                            <button className="btn btn-outline" type="button" onClick={() => handleEdit(job)}>Sửa</button>
                            <button className="btn btn-danger" type="button" onClick={() => handleDelete(job)} disabled={deletingId === job.id}>
                              {deletingId === job.id ? 'Đang xóa...' : 'Xóa'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </section>
      </main>
    </>
  );
}

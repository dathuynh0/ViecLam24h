import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header.jsx';
import { getJobs } from '../api/jobApi.js';

const fallbackJobs = [
  {
    id: 'demo-1',
    title: 'Lập trình viên ReactJS',
    salaryMin: 12,
    salaryMax: 18,
    location: 'TP. Hồ Chí Minh',
    workTime: ['Toàn thời gian'],
    createdBy: { companyName: 'ViecLam24h Technology', address: 'TP. Hồ Chí Minh' },
    category: { title: 'Công nghệ thông tin' },
    description: ['Phát triển giao diện website tuyển dụng bằng ReactJS.', 'Phối hợp cùng backend để tích hợp API.'],
    candidateRequirement: ['Biết HTML, CSS, JavaScript, ReactJS.', 'Có tư duy UI/UX tốt.'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    title: 'Nhân viên Marketing Executive',
    salaryMin: 10,
    salaryMax: 15,
    location: 'Hà Nội',
    workTime: ['Toàn thời gian'],
    createdBy: { companyName: 'Green Media', address: 'Hà Nội' },
    category: { title: 'Marketing' },
    description: ['Lên kế hoạch nội dung và triển khai chiến dịch truyền thông.'],
    candidateRequirement: ['Có khả năng viết nội dung, phân tích số liệu cơ bản.'],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'demo-3',
    title: 'Chuyên viên tuyển dụng',
    salaryMin: 9,
    salaryMax: 14,
    location: 'Đà Nẵng',
    workTime: ['Giờ hành chính'],
    createdBy: { companyName: 'Human Plus', address: 'Đà Nẵng' },
    category: { title: 'Nhân sự' },
    description: ['Tìm kiếm, sàng lọc hồ sơ và liên hệ ứng viên phù hợp.'],
    candidateRequirement: ['Giao tiếp tốt, cẩn thận, chủ động trong công việc.'],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const initialFilters = {
  keyword: '',
  location: '',
  category: '',
  minSalary: '',
  maxSalary: '',
  sort: 'newest',
};

function normalizeText(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  if (typeof value === 'string') return [value];
  return Object.values(value).filter(Boolean);
}

function formatSalary(min, max) {
  const normalizeSalary = (value) => {
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) return null;
    return number >= 1000000 ? Math.round(number / 1000000) : number;
  };

  const salaryMin = normalizeSalary(min);
  const salaryMax = normalizeSalary(max);

  if (salaryMin && salaryMax) return `${salaryMin} - ${salaryMax} triệu`;
  if (salaryMin) return `Từ ${salaryMin} triệu`;
  if (salaryMax) return `Đến ${salaryMax} triệu`;
  return 'Thỏa thuận';
}

function formatDate(value) {
  if (!value) return 'Vừa cập nhật';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Vừa cập nhật';
  return date.toLocaleDateString('vi-VN');
}

function getCompanyName(job) {
  return job.createdBy?.companyName || job.company?.companyName || job.companyName || 'Công ty đang cập nhật';
}

function getCategoryName(job) {
  return job.category?.title || job.categoryName || 'Chưa phân loại';
}

function getWorkTime(job) {
  const workTimes = toArray(job.workTime);
  return workTimes.length ? workTimes.join(', ') : 'Toàn thời gian';
}

function getDescription(job) {
  const description = toArray(job.description);
  if (!description.length) return 'Thông tin mô tả công việc đang được cập nhật.';
  return description.slice(0, 2).join(' ');
}

function getCompanyLogo(job) {
  const company = getCompanyName(job).trim();
  return company
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

function JobCard({ job }) {
  return (
    <article className="job-card job-list-card">
      <div className="job-main">
        <div className="company-logo">{getCompanyLogo(job)}</div>
        <div className="job-content">
          <div className="job-title-row">
            <h3><a href={`#/detail?id=${job.id}`}>{job.title || 'Tin tuyển dụng chưa có tiêu đề'}</a></h3>
            <span className="status success">Đang tuyển</span>
          </div>
          <p className="company-name">{getCompanyName(job)}</p>
          <div className="job-meta">
            <span>💰 {formatSalary(job.salaryMin, job.salaryMax)}</span>
            <span>📍 {job.location || 'Chưa cập nhật'}</span>
            <span>💼 {getWorkTime(job)}</span>
            <span>🏷️ {getCategoryName(job)}</span>
          </div>
          <p className="job-summary">{getDescription(job)}</p>
          <div className="job-extra">
            <span>Ngày đăng: {formatDate(job.createdAt)}</span>
            <span>Mã tin: {job.id}</span>
          </div>
        </div>
      </div>
      <div className="job-actions stacked">
        <a className="btn btn-primary" href={`#/detail?id=${job.id}`}>Xem chi tiết</a>
        <button className="btn btn-outline" data-alert="Chức năng lưu việc sẽ được kết nối sau.">Lưu việc</button>
      </div>
    </article>
  );
}

export default function JobsPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [useDemoData, setUseDemoData] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadJobs() {
      setLoading(true);
      setError('');
      setUseDemoData(false);

      try {
        const data = await getJobs({
          keyword: filters.keyword,
          location: filters.location,
          minSalary: filters.minSalary,
          maxSalary: filters.maxSalary,
        });
        if (!ignore) setJobs(data);
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Không thể kết nối API danh sách việc làm');
          setJobs(fallbackJobs);
          setUseDemoData(true);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadJobs();
    return () => {
      ignore = true;
    };
  }, [filters.keyword, filters.location, filters.minSalary, filters.maxSalary]);

  const categoryOptions = useMemo(() => {
    const source = jobs.length ? jobs : fallbackJobs;
    return Array.from(new Set(source.map(getCategoryName))).filter(Boolean).sort();
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const keyword = normalizeText(filters.keyword);
    const location = normalizeText(filters.location);
    const category = normalizeText(filters.category);

    const result = jobs.filter((job) => {
      const title = normalizeText(job.title);
      const company = normalizeText(getCompanyName(job));
      const jobLocation = normalizeText(job.location);
      const jobCategory = normalizeText(getCategoryName(job));

      const matchKeyword = !keyword || title.includes(keyword) || company.includes(keyword);
      const matchLocation = !location || jobLocation.includes(location);
      const matchCategory = !category || jobCategory === category;

      return matchKeyword && matchLocation && matchCategory;
    });

    return [...result].sort((a, b) => {
      if (filters.sort === 'salary-desc') {
        return Number(b.salaryMax || 0) - Number(a.salaryMax || 0);
      }
      if (filters.sort === 'salary-asc') {
        return Number(a.salaryMin || 0) - Number(b.salaryMin || 0);
      }
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [jobs, filters]);

  const stats = useMemo(() => {
    const locations = new Set(jobs.map((job) => job.location).filter(Boolean));
    const companies = new Set(jobs.map(getCompanyName).filter(Boolean));
    return {
      total: jobs.length,
      locationTotal: locations.size,
      companyTotal: companies.size,
    };
  }, [jobs]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <>
      <Header active="jobs" />
      <section className="page-hero compact-hero jobs-hero">
        <div className="container jobs-hero-grid">
          <div>
            <span className="pill">● Danh sách việc làm mới nhất</span>
            <h1>Danh sách việc làm</h1>
            <p>Tìm kiếm, lọc và xem nhanh các bài tuyển dụng đang mở trên ViecLam24h.</p>
          </div>
          <div className="jobs-hero-stats">
            <div><strong>{stats.total}</strong><span>Việc làm</span></div>
            <div><strong>{stats.companyTotal}</strong><span>Công ty</span></div>
            <div><strong>{stats.locationTotal}</strong><span>Địa điểm</span></div>
          </div>
        </div>
      </section>

      <main className="container two-column jobs-page-layout">
        <aside className="filter-card jobs-filter-card">
          <h3>Bộ lọc tìm kiếm</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="keyword">Từ khóa</label>
            <input
              id="keyword"
              name="keyword"
              value={filters.keyword}
              onChange={handleInputChange}
              placeholder="Tên việc làm, công ty..."
            />

            <label htmlFor="location">Địa điểm</label>
            <select id="location" name="location" value={filters.location} onChange={handleInputChange}>
              <option value="">Tất cả địa điểm</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Cần Thơ">Cần Thơ</option>
              <option value="Trà Vinh">Trà Vinh</option>
            </select>

            <label htmlFor="category">Ngành nghề</label>
            <select id="category" name="category" value={filters.category} onChange={handleInputChange}>
              <option value="">Tất cả ngành nghề</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <div className="filter-group salary-filter">
              <label>Mức lương mong muốn</label>
              <div className="salary-row">
                <input
                  name="minSalary"
                  value={filters.minSalary}
                  onChange={handleInputChange}
                  placeholder="Từ"
                  type="number"
                  min="0"
                />
                <input
                  name="maxSalary"
                  value={filters.maxSalary}
                  onChange={handleInputChange}
                  placeholder="Đến"
                  type="number"
                  min="0"
                />
              </div>
              <small>Nhập theo đơn vị triệu, ví dụ 10 - 20.</small>
            </div>

            <button className="btn btn-outline full-width" type="button" onClick={resetFilters}>Xóa bộ lọc</button>
          </form>
        </aside>

        <section className="jobs-list-panel">
          <div className="list-toolbar jobs-toolbar">
            <div>
              <strong>{filteredJobs.length}</strong> việc làm phù hợp
              {useDemoData && <span className="demo-note">Đang hiển thị dữ liệu mẫu vì chưa kết nối được API.</span>}
            </div>
            <select name="sort" value={filters.sort} onChange={handleInputChange}>
              <option value="newest">Mới nhất</option>
              <option value="salary-desc">Lương cao nhất</option>
              <option value="salary-asc">Lương thấp nhất</option>
            </select>
          </div>

          {error && <div className="api-warning">⚠️ {error}</div>}
          {loading && <div className="jobs-state">Đang tải danh sách việc làm...</div>}

          {!loading && filteredJobs.length > 0 && (
            <div className="job-list">
              {filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}
            </div>
          )}

          {!loading && filteredJobs.length === 0 && (
            <div className="jobs-empty-state">
              <div>🔎</div>
              <h3>Chưa tìm thấy việc làm phù hợp</h3>
              <p>Database hiện chưa có bài đăng hoặc bộ lọc đang quá hẹp. Hãy thêm bài tuyển dụng bằng API POST hoặc xóa bộ lọc để xem lại.</p>
              <button className="btn btn-primary" onClick={resetFilters}>Xóa bộ lọc</button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

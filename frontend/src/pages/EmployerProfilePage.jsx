import Header from '../components/Header.jsx';

const employer = {
  companyName: 'ViecLam24h Technology',
  shortName: 'V24',
  industry: 'Công nghệ thông tin',
  status: 'Đã xác thực',
  address: 'Quận 1, TP. Hồ Chí Minh',
  email: 'hr@vieclam24h.vn',
  phone: '1900 8888',
  website: 'https://vieclam24h.vn',
  taxCode: '0312345678',
  companySize: '100 - 300 nhân sự',
  follow: 1280,
  description:
    'ViecLam24h Technology là doanh nghiệp phát triển nền tảng tuyển dụng trực tuyến, hỗ trợ nhà tuyển dụng đăng tin, quản lý hồ sơ ứng viên và theo dõi hiệu quả tuyển dụng.',
  benefits: ['Lương tháng 13', 'Đào tạo nội bộ', 'Bảo hiểm đầy đủ', 'Làm việc linh hoạt', 'Teambuilding hằng năm'],
  jobs: [
    { title: 'Lập trình viên ReactJS', location: 'TP. Hồ Chí Minh', salary: '12 - 18 triệu', applicants: 24, status: 'Đang tuyển' },
    { title: 'Backend NodeJS Developer', location: 'Hà Nội', salary: '18 - 30 triệu', applicants: 18, status: 'Đang tuyển' },
    { title: 'Chuyên viên tuyển dụng IT', location: 'Đà Nẵng', salary: '10 - 15 triệu', applicants: 11, status: 'Tạm dừng' },
  ],
  contacts: [
    { label: 'Người phụ trách', value: 'Phòng Nhân sự ViecLam24h' },
    { label: 'Email tuyển dụng', value: 'hr@vieclam24h.vn' },
    { label: 'Số điện thoại', value: '1900 8888' },
  ],
};

function CompanyField({ label, value }) {
  return (
    <div className="profile-info-field">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SectionCard({ title, subtitle, children, action }) {
  return (
    <section className="profile-info-card">
      <div className="profile-info-card-head">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export default function EmployerProfilePage() {
  return (
    <>
      <Header active="company" />
      <main className="profile-info-page">
        <section className="employer-cover">
          <div className="container employer-cover-inner">
            <span className="pill">● Hồ sơ nhà tuyển dụng</span>
          </div>
        </section>

        <section className="container employer-head-card">
          <div className="employer-logo">{employer.shortName}</div>
          <div className="employer-head-main">
            <div className="employer-title-row">
              <div>
                <h1>{employer.companyName}</h1>
                <p>{employer.industry} · {employer.address}</p>
              </div>
              <span className="status success">{employer.status}</span>
            </div>
            <div className="profile-info-contact">
              <span>✉️ {employer.email}</span>
              <span>📞 {employer.phone}</span>
              <span>🌐 {employer.website}</span>
            </div>
          </div>
          <div className="profile-info-actions">
            <button className="btn btn-outline" data-alert="Chức năng theo dõi công ty sẽ được kết nối sau.">Theo dõi</button>
            <a className="btn btn-primary" href="#/jobs">Xem việc đang tuyển</a>
          </div>
        </section>

        <div className="container profile-info-layout employer-layout">
          <aside className="profile-info-sidebar">
            <div className="company-mini-stats">
              <div><strong>{employer.jobs.length}</strong><span>Tin tuyển dụng</span></div>
              <div><strong>{employer.follow}</strong><span>Lượt theo dõi</span></div>
              <div><strong>53</strong><span>CV đã nhận</span></div>
            </div>
            <nav className="profile-info-menu">
              <a className="active" href="#company-overview">Tổng quan</a>
              <a href="#company-info">Thông tin doanh nghiệp</a>
              <a href="#company-jobs">Tin đang tuyển</a>
              <a href="#company-contact">Liên hệ tuyển dụng</a>
            </nav>
          </aside>

          <section className="profile-info-content">
            <SectionCard title="Giới thiệu nhà tuyển dụng" subtitle="Thông tin mô tả giúp ứng viên hiểu rõ doanh nghiệp" action={<button className="btn btn-outline" data-alert="Chức năng chỉnh sửa thông tin công ty sẽ được kết nối sau.">Chỉnh sửa</button>}>
              <div id="company-overview" className="company-description-box">
                <p>{employer.description}</p>
              </div>
              <div className="skill-list large benefit-list">
                {employer.benefits.map((benefit) => <span key={benefit}>{benefit}</span>)}
              </div>
            </SectionCard>

            <SectionCard title="Thông tin doanh nghiệp" subtitle="Dữ liệu định danh của nhà tuyển dụng">
              <div className="profile-info-grid" id="company-info">
                <CompanyField label="Tên công ty" value={employer.companyName} />
                <CompanyField label="Ngành nghề" value={employer.industry} />
                <CompanyField label="Mã số thuế" value={employer.taxCode} />
                <CompanyField label="Quy mô" value={employer.companySize} />
                <CompanyField label="Địa chỉ" value={employer.address} />
                <CompanyField label="Website" value={employer.website} />
              </div>
            </SectionCard>

            <SectionCard title="Tin tuyển dụng của công ty" subtitle="Danh sách bài đăng nổi bật của nhà tuyển dụng">
              <div className="company-job-list" id="company-jobs">
                {employer.jobs.map((job) => (
                  <article key={job.title}>
                    <div>
                      <h3>{job.title}</h3>
                      <p>📍 {job.location} · 💰 {job.salary} · 👥 {job.applicants} CV</p>
                    </div>
                    <span className={`status ${job.status === 'Đang tuyển' ? 'success' : 'warning'}`}>{job.status}</span>
                  </article>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Liên hệ tuyển dụng" subtitle="Thông tin liên hệ dành cho ứng viên và quản trị viên">
              <div className="contact-card-grid" id="company-contact">
                {employer.contacts.map((contact) => (
                  <div key={contact.label}>
                    <span>{contact.label}</span>
                    <strong>{contact.value}</strong>
                  </div>
                ))}
              </div>
            </SectionCard>
          </section>
        </div>
      </main>
    </>
  );
}

import Header from '../components/Header.jsx';

const candidate = {
  fullName: 'Nguyễn Minh Anh',
  position: 'Frontend Developer Intern',
  location: 'TP. Hồ Chí Minh',
  email: 'minhanh.dev@example.com',
  phone: '0901 234 567',
  birthday: '12/08/2003',
  gender: 'Nữ',
  experience: '1 năm kinh nghiệm',
  expectedSalary: '10 - 15 triệu',
  jobType: 'Toàn thời gian',
  careerGoal:
    'Mong muốn phát triển trong lĩnh vực lập trình giao diện, tham gia xây dựng sản phẩm web có trải nghiệm người dùng tốt và có cơ hội học hỏi từ đội ngũ kỹ thuật chuyên nghiệp.',
  skills: ['HTML/CSS', 'JavaScript', 'ReactJS', 'REST API', 'Git/GitHub', 'Figma cơ bản'],
  education: [
    {
      school: 'Trường Đại học Trà Vinh',
      major: 'Công nghệ thông tin',
      time: '2022 - 2026',
      note: 'Tập trung vào phát triển website, cơ sở dữ liệu và phân tích hệ thống.',
    },
  ],
  experiences: [
    {
      title: 'Thực tập sinh Frontend',
      company: 'ViecLam24h Project Team',
      time: '03/2026 - nay',
      description: 'Xây dựng giao diện ReactJS, thiết kế component, kết nối API danh sách việc làm và hoàn thiện trải nghiệm ứng viên.',
    },
  ],
  applications: [
    { job: 'Lập trình viên ReactJS', company: 'ViecLam24h Technology', date: '05/07/2026', status: 'Đang xem xét', className: 'warning' },
    { job: 'Frontend Intern', company: 'Green Media', date: '02/07/2026', status: 'Đã nộp', className: 'gray' },
    { job: 'Junior Web Developer', company: 'Human Plus', date: '28/06/2026', status: 'Mời phỏng vấn', className: 'success' },
  ],
};

function ProfileField({ label, value }) {
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

export default function CandidateProfilePage() {
  return (
    <>
      <Header active="candidate" />
      <main className="profile-info-page">
        <section className="profile-info-hero candidate-hero">
          <div className="container profile-info-hero-grid">
            <div className="profile-info-user">
              <div className="profile-info-avatar">NA</div>
              <div>
                <span className="pill">● Hồ sơ ứng viên</span>
                <h1>{candidate.fullName}</h1>
                <p>{candidate.position} · {candidate.location}</p>
                <div className="profile-info-contact">
                  <span>✉️ {candidate.email}</span>
                  <span>📞 {candidate.phone}</span>
                </div>
              </div>
            </div>
            <div className="profile-info-actions">
              <a className="btn btn-outline" href="#/jobs">Tìm việc phù hợp</a>
              <button className="btn btn-primary" data-alert="Chức năng chỉnh sửa hồ sơ sẽ được kết nối sau.">Cập nhật hồ sơ</button>
            </div>
          </div>
        </section>

        <div className="container profile-info-layout">
          <aside className="profile-info-sidebar">
            <div className="profile-info-score">
              <strong>86%</strong>
              <span>Mức độ hoàn thiện hồ sơ</span>
              <div className="profile-progress"><i style={{ width: '86%' }} /></div>
            </div>
            <nav className="profile-info-menu">
              <a className="active" href="#candidate-overview">Tổng quan</a>
              <a href="#candidate-skills">Kỹ năng</a>
              <a href="#candidate-cv">CV & học vấn</a>
              <a href="#candidate-applications">CV đã nộp</a>
            </nav>
            <div className="profile-info-note">
              <strong>Gợi ý</strong>
              <p>Bổ sung CV PDF, kỹ năng và mục tiêu nghề nghiệp sẽ giúp nhà tuyển dụng đánh giá hồ sơ nhanh hơn.</p>
            </div>
          </aside>

          <section className="profile-info-content">
            <SectionCard title="Thông tin cá nhân" subtitle="Thông tin cơ bản được hiển thị cho nhà tuyển dụng" action={<span className="status success">Đang tìm việc</span>}>
              <div className="profile-info-grid" id="candidate-overview">
                <ProfileField label="Họ và tên" value={candidate.fullName} />
                <ProfileField label="Vị trí mong muốn" value={candidate.position} />
                <ProfileField label="Ngày sinh" value={candidate.birthday} />
                <ProfileField label="Giới tính" value={candidate.gender} />
                <ProfileField label="Kinh nghiệm" value={candidate.experience} />
                <ProfileField label="Mức lương mong muốn" value={candidate.expectedSalary} />
                <ProfileField label="Hình thức làm việc" value={candidate.jobType} />
                <ProfileField label="Địa điểm" value={candidate.location} />
              </div>
              <div className="profile-info-summary">
                <h3>Mục tiêu nghề nghiệp</h3>
                <p>{candidate.careerGoal}</p>
              </div>
            </SectionCard>

            <SectionCard title="Kỹ năng chuyên môn" subtitle="Các kỹ năng nổi bật của ứng viên">
              <div className="skill-list large" id="candidate-skills">
                {candidate.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </SectionCard>

            <SectionCard title="CV, học vấn và kinh nghiệm" subtitle="Thông tin dùng để xét duyệt hồ sơ ứng tuyển">
              <div className="cv-box" id="candidate-cv">
                <div>
                  <strong>CV_NguyenMinhAnh_Frontend.pdf</strong>
                  <p>Cập nhật gần nhất: 06/07/2026 · Định dạng PDF</p>
                </div>
                <button className="btn btn-outline" data-alert="Chức năng xem CV sẽ được kết nối sau.">Xem CV</button>
              </div>
              <div className="timeline-list">
                {candidate.education.map((item) => (
                  <article key={item.school}>
                    <span>{item.time}</span>
                    <h3>{item.school}</h3>
                    <p><strong>{item.major}</strong> · {item.note}</p>
                  </article>
                ))}
                {candidate.experiences.map((item) => (
                  <article key={item.title}>
                    <span>{item.time}</span>
                    <h3>{item.title}</h3>
                    <p><strong>{item.company}</strong> · {item.description}</p>
                  </article>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Danh sách CV đã nộp" subtitle="Theo dõi trạng thái hồ sơ ứng tuyển của ứng viên">
              <div className="application-list" id="candidate-applications">
                {candidate.applications.map((application) => (
                  <article key={`${application.job}-${application.company}`}>
                    <div>
                      <h3>{application.job}</h3>
                      <p>{application.company} · Ngày nộp: {application.date}</p>
                    </div>
                    <span className={`status ${application.className}`}>{application.status}</span>
                  </article>
                ))}
              </div>
            </SectionCard>
          </section>
        </div>
      </main>
    </>
  );
}

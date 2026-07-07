export default function Header({ active = 'jobs' }) {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <a aria-label="ViecLam24h" className="brand" href="#/">
          <span className="brand-icon">24</span>
          <span className="brand-text">ViecLam24h</span>
        </a>
        <nav className="site-nav">
          <a className={active === 'home' ? 'active' : ''} href="#/">Trang chủ</a>
          <a className={active === 'jobs' ? 'active' : ''} href="#/jobs">Việc làm</a>
          <a className={active === 'company' ? 'active' : ''} href="#/company-profile">Nhà tuyển dụng</a>
          <a className={active === 'candidate' ? 'active' : ''} href="#/candidate-profile">Ứng viên</a>
          <a className={active === 'reports' ? 'active' : ''} href="#/reports">Báo cáo</a>
          <a href="#footer">Liên hệ</a>
        </nav>
        <div className="nav-actions">
          <a className="btn btn-ghost" href="#/login">Đăng nhập</a>
          <a className="btn btn-primary" href="#/register">Đăng ký</a>
        </div>
      </div>
    </header>
  );
}

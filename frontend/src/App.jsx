import { useEffect, useMemo, useState } from 'react';
import { pages } from './pages';
import JobsPage from './pages/JobsPage.jsx';
import CandidateProfilePage from './pages/CandidateProfilePage.jsx';
import EmployerProfilePage from './pages/EmployerProfilePage.jsx';
import './styles.css';

const routeMap = new Map(pages.map((page) => [page.path, page]));

function normalizePath(hashValue) {
  const raw = (hashValue || window.location.hash || '#/').replace(/^#/, '');
  if (!raw || raw === '/') return '/';
  return raw.startsWith('/') ? raw : `/${raw}`;
}

function getBasePath(path) {
  return (path || '/').split('?')[0] || '/';
}

function navigate(path) {
  window.location.hash = path;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function App() {
  const [path, setPath] = useState(normalizePath(window.location.hash));
  const basePath = useMemo(() => getBasePath(path), [path]);

  const page = useMemo(() => routeMap.get(basePath) || routeMap.get('/'), [basePath]);

  useEffect(() => {
    const onHashChange = () => setPath(normalizePath(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) window.location.hash = '/';
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.title = page.title || 'ViecLam24h';
    document.body.className = page.bodyClass || '';
  }, [page]);

  useEffect(() => {
    const onClick = (event) => {
      const alertEl = event.target.closest?.('[data-alert]');
      if (alertEl) {
        event.preventDefault();
        alert(alertEl.getAttribute('data-alert'));
        return;
      }

      const link = event.target.closest?.('a[href]');
      if (link) {
        const href = link.getAttribute('href');
        if (href?.startsWith('#/')) {
          event.preventDefault();
          navigate(href.slice(1));
        }
      }
    };

    const onSubmit = (event) => {
      const form = event.target.closest?.('[data-search-form]');
      if (form) {
        event.preventDefault();
        navigate('/jobs');
      }
    };

    document.addEventListener('click', onClick);
    document.addEventListener('submit', onSubmit);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('submit', onSubmit);
    };
  }, []);

  if (basePath === '/jobs') {
    return <JobsPage />;
  }

  if (basePath === '/candidate-profile') {
    return <CandidateProfilePage />;
  }

  if (basePath === '/company-profile' || basePath === '/employer-profile') {
    return <EmployerProfilePage />;
  }

  return (
    <main className="react-page" dangerouslySetInnerHTML={{ __html: page.html }} />
  );
}

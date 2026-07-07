const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function buildQuery(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      query.append(key, String(value).trim());
    }
  });

  return query.toString();
}

export async function getJobs(filters = {}) {
  const query = buildQuery({
    keyword: filters.keyword,
    location: filters.location,
    categoryId: filters.categoryId,
    companyId: filters.companyId,
    minSalary: filters.minSalary,
    maxSalary: filters.maxSalary,
  });

  const response = await fetch(`${API_BASE_URL}/api/jobs${query ? `?${query}` : ''}`);

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    throw new Error(errorPayload.message || 'Không thể tải danh sách việc làm');
  }

  const payload = await response.json();
  return Array.isArray(payload.data) ? payload.data : [];
}

export { API_BASE_URL };

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

async function parseResponse(response, defaultMessage) {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || defaultMessage);
  }

  return payload;
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
  const payload = await parseResponse(response, 'Không thể tải danh sách việc làm');

  return Array.isArray(payload.data) ? payload.data : [];
}

export async function createJob(data) {
  const response = await fetch(`${API_BASE_URL}/api/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const payload = await parseResponse(response, 'Không thể đăng bài tuyển dụng');
  return payload.data;
}

export async function updateJob(id, data) {
  const response = await fetch(`${API_BASE_URL}/api/jobs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const payload = await parseResponse(response, 'Không thể cập nhật bài tuyển dụng');
  return payload.data;
}

export async function deleteJob(id) {
  const response = await fetch(`${API_BASE_URL}/api/jobs/${id}`, {
    method: 'DELETE',
  });

  return parseResponse(response, 'Không thể xóa bài tuyển dụng');
}

export { API_BASE_URL };

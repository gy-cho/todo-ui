const API_URL = 'http://localhost:8080/api';

async function fetchData(path, method = 'GET', body = null) {
  const url = `${API_URL}${path}`;
  
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  // JWT 토큰이 있으면 Authorization 헤더에 추가
  const token = getLoginToken();
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch from ${url}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// POST 요청을 보낼 때 사용
export async function postData(endpoint, data) {
  return fetchData(endpoint, 'POST', data);
}

// GET 요청을 보낼 때 사용
export async function getData(endpoint) {
  return fetchData(endpoint, 'GET');
}


// PUT 요청을 보낼 때 사용
export async function putData(endpoint, data) {
  return fetchData(endpoint, 'PUT', data);
}

// DELETE 요청을 보낼 때 사용
export async function deleteData(endpoint, data) {
  return fetchData(endpoint, 'DELETE', data);
}

// JWT 토큰을 가져오는 함수
function getLoginToken() {
  return localStorage.getItem('token');
}
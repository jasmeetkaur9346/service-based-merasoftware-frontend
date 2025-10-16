const backendDomain = process.env.REACT_APP_BACKEND_URL || '';

const buildUrl = (path) => {
  if (!backendDomain) return path;
  if (backendDomain.endsWith('/') && path.startsWith('/')) {
    return `${backendDomain.slice(0, -1)}${path}`;
  }
  if (!backendDomain.endsWith('/') && !path.startsWith('/')) {
    return `${backendDomain}/${path}`;
  }
  return `${backendDomain}${path}`;
};

const SummaryApi = {
  signIn: {
    url: buildUrl('/api/signin'),
    method: 'post',
  },
  currentUser: {
    url: buildUrl('/api/user-details'),
    method: 'get',
  },
  logout: {
    url: buildUrl('/api/userLogout'),
    method: 'get',
  },
};

export const CUSTOMER_PORTAL_URL = process.env.REACT_APP_CUSTOMER_PORTAL_URL || '';
export const STAFF_PORTAL_URL = process.env.REACT_APP_STAFF_PORTAL_URL || '';

export default SummaryApi;

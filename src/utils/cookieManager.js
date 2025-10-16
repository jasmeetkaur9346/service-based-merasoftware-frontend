const DEFAULT_OPTIONS = {
  path: '/',
  sameSite: 'Lax',
};

const serialize = (value) => {
  try {
    return encodeURIComponent(JSON.stringify(value));
  } catch (error) {
    console.error('Failed to serialise cookie value:', error);
    return '';
  }
};

const parseValue = (value) => {
  if (!value) return null;
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch (_error) {
    return null;
  }
};

const setCookie = (name, value, options = {}) => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let cookie = `${name}=${serialize(value)}`;

  if (opts.path) cookie += `; path=${opts.path}`;
  if (opts.maxAge) cookie += `; max-age=${opts.maxAge}`;
  if (opts.expires) cookie += `; expires=${opts.expires.toUTCString()}`;
  if (opts.domain) cookie += `; domain=${opts.domain}`;
  if (opts.secure) cookie += '; Secure';
  if (opts.sameSite) cookie += `; SameSite=${opts.sameSite}`;

  document.cookie = cookie;
};

const removeCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; path=/`;
};

const getCookie = (name) => {
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (const cookie of cookies) {
    const [cookieName, ...rest] = cookie.split('=');
    if (cookieName === name) {
      return parseValue(rest.join('='));
    }
  }
  return null;
};

const CookieManager = {
  set(name, value, options) {
    setCookie(name, value, options);
  },

  get(name) {
    return getCookie(name);
  },

  remove(name) {
    removeCookie(name);
  },

  setUserDetails(user) {
    this.set('user-details', user, { maxAge: 7 * 24 * 60 * 60 });
  },

  clearAll() {
    this.remove('user-details');
  },
};

export default CookieManager;

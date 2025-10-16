import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import SummaryApi, {
  CUSTOMER_PORTAL_URL,
  STAFF_PORTAL_URL,
} from '../common';
import CookieManager from '../utils/cookieManager';
import StorageService from '../utils/storageService';

const AuthContext = createContext(null);

const normaliseUser = (rawUser) => {
  if (!rawUser) return null;
  // Ensure we always return a plain object with expected fields
  return {
    _id: rawUser._id || rawUser.id || null,
    name: rawUser.name || '',
    email: rawUser.email || '',
    role: rawUser.role || 'customer',
  };
};

const fetchJson = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data?.message || 'Request failed');
    error.response = data;
    throw error;
  }
  return data;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initialise = async () => {
      try {
        const storedUser = StorageService.getUserDetails();
        if (storedUser && isMounted) {
          setUser(normaliseUser(storedUser));
        }

        if (SummaryApi.currentUser.url) {
          const data = await fetchJson(SummaryApi.currentUser.url, {
            method: (SummaryApi.currentUser.method || 'get').toUpperCase(),
            credentials: 'include',
          });

          if (data?.success === false) {
            StorageService.clearUserDetails();
            CookieManager.clearAll();
            if (isMounted) {
              setUser(null);
            }
          } else {
            const payload =
              data?.data?.user ||
              data?.data ||
              data?.user ||
              null;

            if (payload && isMounted) {
              const normalised = normaliseUser(payload);
              setUser(normalised);
              StorageService.setUserDetails(normalised);
              CookieManager.setUserDetails({
                id: normalised._id,
                name: normalised.name,
                email: normalised.email,
                role: normalised.role,
              });
            }
          }
        }
      } catch (error) {
        console.warn('Auth initialisation failed:', error?.message || error);
        if (isMounted) {
          setUser(null);
          StorageService.clearUserDetails();
          CookieManager.clearAll();
        }
      } finally {
        if (isMounted) {
          setInitializing(false);
        }
      }
    };

    initialise();
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async ({ email, password, role = 'customer' }) => {
    if (!SummaryApi.signIn.url) {
      throw new Error('Backend URL is not configured.');
    }

    const data = await fetchJson(SummaryApi.signIn.url, {
      method: (SummaryApi.signIn.method || 'post').toUpperCase(),
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    });

    if (data?.success === false) {
      throw new Error(data?.message || 'Login failed. Please try again.');
    }

    const payload = data?.data?.user || data?.data || null;
    if (!payload) {
      throw new Error('User details are missing from the response.');
    }

    const normalised = normaliseUser(payload);
    setUser(normalised);
    StorageService.setUserDetails(normalised);
    CookieManager.setUserDetails({
      id: normalised._id,
      name: normalised.name,
      email: normalised.email,
      role: normalised.role,
    });

    return normalised;
  };

  const logout = async () => {
    if (SummaryApi.logout.url) {
      try {
        await fetchJson(SummaryApi.logout.url, {
          method: (SummaryApi.logout.method || 'get').toUpperCase(),
          credentials: 'include',
        });
      } catch (error) {
        console.warn('Logout request failed:', error?.message || error);
      }
    }

    setUser(null);
    StorageService.clearUserDetails();
    CookieManager.clearAll();
  };

  const value = useMemo(
    () => ({
      user,
      initializing,
      login,
      logout,
      customerPortalUrl: CUSTOMER_PORTAL_URL,
      staffPortalUrl: STAFF_PORTAL_URL,
    }),
    [user, initializing],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi, { ADMIN_PORTAL_URL, PARTNER_PORTAL_URL } from '../common';
import CookieManager from '../utils/cookieManager';
import StorageService from '../utils/storageService';
import { useAuth } from '../context/AuthContext';

const StaffLoginPopup = ({ isOpen, onClose }) => {
  const { setSessionUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const formRef = useRef(null);

  const adminPortalTarget = ADMIN_PORTAL_URL || 'https://admin.merasoftware.com';
  const partnerPortalTarget = PARTNER_PORTAL_URL || 'https://partner.merasoftware.com';

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setEmail('');
      setPassword('');
      setError('');
      setSelectedRole('admin');
      onClose?.();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);
    setError('');

    const requestedRole = selectedRole.toLowerCase();

    try {
      const response = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method.toUpperCase(),
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
          role: requestedRole,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data?.message || 'Login failed. Please try again.');
        return;
      }

      const userPayload = data?.data?.user || {};
      const userRoles = [
        userPayload.role,
        ...(Array.isArray(userPayload.roles) ? userPayload.roles : []),
      ]
        .filter(Boolean)
        .map((role) => role.toLowerCase());

      if (!userRoles.includes(requestedRole)) {
        const readableRole = requestedRole.charAt(0).toUpperCase() + requestedRole.slice(1);
        setError(`You do not have ${readableRole} access.`);
        return;
      }

      const normalisedUser = {
        _id: userPayload._id || userPayload.id || null,
        name: userPayload.name || '',
        email: userPayload.email || '',
        role: requestedRole,
      };

      CookieManager.setUserDetails({
        id: normalisedUser._id,
        name: normalisedUser.name,
        email: normalisedUser.email,
        role: normalisedUser.role,
      });
      StorageService.setUserDetails(normalisedUser);
      if (typeof setSessionUser === 'function') {
        setSessionUser(normalisedUser);
      }

      const readableRole = requestedRole.charAt(0).toUpperCase() + requestedRole.slice(1);
      toast.success(`${readableRole} login successful`);

      handleClose();

      const portalTargets = {
        admin: adminPortalTarget,
        partner: partnerPortalTarget,
      };

      const targetUrl = portalTargets[requestedRole];
      if (!targetUrl) {
        toast.info('Portal URL is not configured for this role yet.');
        return;
      }

      if (requestedRole === 'partner') {
        window.location.href = targetUrl;
        return;
      }

      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Staff login failed:', err);
      setError('Unable to login right now. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      style={{ animation: isClosing ? 'fadeOut 0.25s ease-in forwards' : 'fadeIn 0.25s ease-out' }}
    >
      <div
        ref={formRef}
        className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-700 relative"
        style={{ animation: isClosing ? 'slideDown 0.25s ease-in forwards' : 'slideUp 0.3s ease-out' }}
      >
        <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 focus:outline-none bg-white dark:bg-slate-800 rounded-full p-1.5 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-slate-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">Staff Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                Select Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                  if (error) setError('');
                }}
                className="w-full px-4 py-3 mt-1 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 focus:border-transparent text-sm"
              >
                <option value="admin">Admin</option>
                <option value="partner">Partner</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className="w-full px-4 py-3 mt-1 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 focus:border-transparent text-sm"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                className="w-full px-4 py-3 mt-1 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 focus:border-transparent text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 text-red-600 text-sm px-4 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 focus:outline-none transition-all duration-300 transform disabled:opacity-60"
            >
              {loading ? 'Please wait...' : 'Login'}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default StaffLoginPopup;

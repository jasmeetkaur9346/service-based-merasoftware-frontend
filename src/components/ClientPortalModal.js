import React, { useEffect, useRef, useState } from 'react';
import { Eye, EyeOff, Star, Zap, CreditCard, BarChart3, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Client Portal modal built from Practice.js content (Google option removed)
const ClientPortalModal = ({ isOpen, onClose, onSuccess, initialMode = 'signin' }) => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(initialMode !== 'signup');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [formError, setFormError] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    setIsLogin(initialMode !== 'signup');
  }, [initialMode]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      setFormError('');
      setIsLoading(false);
    }
  }, [isOpen]);

  const benefits = [
    { icon: <Star className="w-4 h-4" />, title: 'Free Demo Access', description: 'Test key features right away.' },
    { icon: <Zap className="w-4 h-4" />, title: 'Full Free Access', description: 'Use essential tools without limits.' },
    { icon: <CreditCard className="w-4 h-4" />, title: 'Purchase Services', description: 'Upgrade only when you need to.' },
    { icon: <BarChart3 className="w-4 h-4" />, title: 'Track Progress', description: 'Watch every milestone live.' },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!isLogin && !formData.name) newErrors.name = 'Name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    if (!isLogin) {
      setFormError('Account creation will be available soon. Please switch to Sign In.');
      return;
    }

    setIsLoading(true);
    try {
      const userDetails = await login({
        email: formData.email.trim(),
        password: formData.password,
        role: 'customer',
      });

      if (onSuccess) {
        onSuccess(userDetails);
      } else {
        onClose?.();
      }
    } catch (error) {
      setFormError(error?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <div
          ref={containerRef}
          className="relative max-w-4xl w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-y-auto lg:overflow-hidden animate-[fadeIn_0.25s_ease-out] max-h-[90vh] sm:max-h-none"
          role="dialog"
          aria-modal="true"
          aria-labelledby="client-portal-title"
        >
          <button
            type="button"
            onClick={onClose}
            className="sm:hidden absolute top-3 right-3 h-9 w-9 rounded-full bg-white/80 shadow-md border border-white flex items-center justify-center text-slate-600 hover:text-slate-900"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col md:flex-row items-stretch lg:min-h-[520px]">
            {/* Left Side - Benefits */}
            <div className="order-1 md:order-1 w-full md:w-1/2 lg:w-2/5 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 text-white">
              <div className="h-full flex flex-col justify-center px-4 py-5 sm:px-6 sm:py-7 lg:p-10 max-w-lg mx-auto lg:mx-0">
                <div className="mb-3 sm:mb-5 text-center lg:text-left">
                  <h2 id="client-portal-title" className="text-base sm:text-lg lg:text-4xl font-bold tracking-tight">
                    Client Portal
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-col sm:space-y-4 sm:gap-0">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3 group bg-white/5 sm:bg-transparent rounded-xl sm:rounded-none p-3 sm:p-0">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-105 text-blue-300 group-hover:text-white">
                        {benefit.icon}
                      </div>
                      <div className="pt-0.5">
                        <h3 className="text-sm font-semibold text-white lg:text-base">{benefit.title}</h3>
                        <p className="hidden sm:block text-slate-300 text-sm font-semibold lg:font-normal leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto hidden sm:block">
                  <div className="p-4 sm:p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="font-semibold text-white text-base">10,000+</span>
                      </div>
                      <p className="text-slate-300 text-sm">Active users growing daily</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="order-2 md:order-2 w-full md:w-1/2 lg:w-3/5 p-4 sm:p-6 lg:p-10 relative">
              <button
                onClick={onClose}
                className="hidden sm:flex absolute right-4 top-4 text-slate-400 hover:text-slate-700 bg-white/80 hover:bg-white rounded-full p-1.5"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="max-w-md mx-auto h-full flex flex-col justify-start sm:justify-center pt-2 sm:pt-0">
                <div className="text-center sm:text-left mb-3 sm:mb-5">
                  <h1 className="text-base sm:text-lg lg:text-4xl font-bold text-slate-900 mb-2 sm:mb-3">
                    {isLogin ? 'Welcome Back!' : 'Create Your Account'}
                  </h1>
                  <p className="text-slate-600 text-sm font-semibold sm:text-base sm:font-semibold">
                    {isLogin ? 'Continue managing your work seamlessly.' : 'Start planning, tracking, and collaborating now.'}
                  </p>
                </div>

                {/* Toggle Buttons */}
                <div className="flex bg-slate-100 rounded-xl p-1 mb-4 sm:mb-6">
                  <button
                    onClick={() => { setIsLogin(true); setErrors({}); setFormError(''); }}
                    className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLogin ? 'bg-white text-slate-900 shadow-lg shadow-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setIsLogin(false); setErrors({}); setFormError(''); }}
                    className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${!isLogin ? 'bg-white text-slate-900 shadow-lg shadow-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Email/Password Form */}
                <div className="space-y-3 sm:space-y-5 text-sm">
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-3.5 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400 ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 hover:border-slate-300'}`}
                        placeholder="Enter your full name"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <div id="name-error" className="flex items-center mt-2 text-red-600 text-sm font-semibold">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.name}
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3.5 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400 ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 hover:border-slate-300'}`}
                      placeholder="you@example.com"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <div id="email-error" className="flex items-center mt-2 text-red-600 text-sm font-semibold">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Password *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-3.5 py-3 pr-11 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400 ${errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 hover:border-slate-300'}`}
                        placeholder="Enter your password"
                        aria-invalid={errors.password ? 'true' : 'false'}
                        aria-describedby={errors.password ? 'password-error' : undefined}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <div id="password-error" className="flex items-center mt-2 text-red-600 text-sm font-semibold">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm font-semibold">Please wait...</span>
                      </div>
                    ) : (
                      isLogin ? 'Sign In to Dashboard' : 'Create Free Account'
                    )}
                  </button>

                  {formError && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-2 rounded-lg font-semibold">
                      {formError}
                    </div>
                  )}

                  {isLogin && (
                    <div className="text-center">
                      <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-semibold focus:outline-none focus:underline">
                        Forgot your password?
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-5 sm:mt-6 text-center text-sm">
                  <span className="text-slate-600 font-semibold">{isLogin ? "Don't have an account? " : "Already have an account? "}</span>
                  <button onClick={() => { setIsLogin(!isLogin); setErrors({}); setFormError(''); }} className="text-blue-600 hover:text-blue-700 font-semibold focus:outline-none focus:underline">
                    {isLogin ? 'Create free account' : 'Sign in here'}
                  </button>
                </div>

                {!isLogin && (
                  <p className="mt-5 sm:mt-6 text-sm text-slate-500 text-center leading-relaxed">
                    By creating an account, you agree to our <a href="#" className="text-blue-600 hover:text-blue-700 underline font-semibold">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-700 underline font-semibold">Privacy Policy</a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortalModal;

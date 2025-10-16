import React, { useEffect, useRef, useState } from 'react';
import { Eye, EyeOff, Star, Zap, CreditCard, BarChart3, AlertCircle, CheckCircle } from 'lucide-react';
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
    { icon: <Star className="w-6 h-6" />, title: 'Free Demo Access', description: 'Try all features instantly with no commitment' },
    { icon: <Zap className="w-6 h-6" />, title: 'Full Free Access', description: 'Complete functionality unlocked from day one' },
    { icon: <CreditCard className="w-6 h-6" />, title: 'Purchase Services', description: "Buy premium solutions when you're ready" },
    { icon: <BarChart3 className="w-6 h-6" />, title: 'Track Progress', description: 'Monitor your project dashboard in real-time' },
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
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          ref={containerRef}
          className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_0.25s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="client-portal-title"
        >
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Side - Benefits */}
            <div className="lg:w-2/5 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 p-8 lg:p-12 text-white">
              <div className="h-full flex flex-col justify-center max-w-sm mx-auto lg:mx-0">
                <div className="mb-8">
                  <h2 id="client-portal-title" className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                    Client Portal
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Sign in to manage projects, track progress, and purchase services
                  </p>
                </div>
                <div className="space-y-6 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                        <div className="text-blue-300 group-hover:text-white transition-colors">
                          {benefit.icon}
                        </div>
                      </div>
                      <div className="pt-1">
                        <h3 className="font-semibold text-lg mb-1 text-white">{benefit.title}</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto">
                  <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="font-semibold text-white text-lg">10,000+</span>
                      </div>
                      <p className="text-slate-300 text-sm">Active users growing their business daily</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:w-3/5 p-8 lg:p-12 relative">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 bg-white/70 hover:bg-white rounded-full p-1.5"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="max-w-md mx-auto h-full flex flex-col justify-center">
                <div className="text-center mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                    {isLogin ? 'Welcome Back!' : 'Create Your Account'}
                  </h1>
                  <p className="text-slate-600 text-base mb-8">
                    {isLogin ? 'Access your dashboard and continue your journey' : 'Join thousands of users in under 30 seconds'}
                  </p>
                </div>

                {/* Toggle Buttons */}
                <div className="flex bg-slate-100 rounded-xl p-1 mb-8">
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
                <div className="space-y-6">
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400 ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 hover:border-slate-300'}`}
                        placeholder="Enter your full name"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <div id="name-error" className="flex items-center mt-2 text-red-600 text-sm">
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
                      className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400 ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 hover:border-slate-300'}`}
                      placeholder="you@example.com"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <div id="email-error" className="flex items-center mt-2 text-red-600 text-sm">
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
                        className={`w-full px-4 py-3.5 pr-12 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400 ${errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 hover:border-slate-300'}`}
                        placeholder="Enter your password"
                        aria-invalid={errors.password ? 'true' : 'false'}
                        aria-describedby={errors.password ? 'password-error' : undefined}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <div id="password-error" className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Please wait...</span>
                      </div>
                    ) : (
                      isLogin ? 'Sign In to Dashboard' : 'Create Free Account'
                    )}
                  </button>

                  {formError && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-2 rounded-lg">
                      {formError}
                    </div>
                  )}

                  {isLogin && (
                    <div className="text-center">
                      <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline">
                        Forgot your password?
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-8 text-center">
                  <span className="text-slate-600">{isLogin ? "Don't have an account? " : "Already have an account? "}</span>
                  <button onClick={() => { setIsLogin(!isLogin); setErrors({}); setFormError(''); }} className="text-blue-600 hover:text-blue-700 font-semibold focus:outline-none focus:underline">
                    {isLogin ? 'Create free account' : 'Sign in here'}
                  </button>
                </div>

                {!isLogin && (
                  <p className="mt-6 text-xs text-slate-500 text-center leading-relaxed">
                    By creating an account, you agree to our <a href="#" className="text-blue-600 hover:text-blue-700 underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</a>
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

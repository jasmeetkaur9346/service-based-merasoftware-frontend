import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { logout } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import { useOnlineStatus } from '../App';
import CookieManager from '../utils/cookieManager';
import StorageService from '../utils/storageService';
import displayCurrency from "../helpers/displayCurrency"
import NotificationBell from '../components/NotificationBell';
import ClientPortalModal from '../components/ClientPortalModal';
import StaffLoginPopup from '../components/StaffLoginPopup';
import TriangleMazeLoader from '../components/TriangleMazeLoader';

import {
  Search, User, Wallet, LogOut, ChevronDown, ChevronRight,
  Menu, X, Home, Settings, ExternalLink
} from 'lucide-react';

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const { isOnline } = useOnlineStatus();
  const context = useContext(Context);
  const activeProject = context.activeProject;
  const navigate = useNavigate();

  const [menuDisplay, setMenuDisplay] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const [loading, setLoading] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showStaffLoginPopup, setShowStaffLoginPopup] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState(null); // index number or null
  const dropdownTimeoutRef = useRef(null);
  const searchInputRef = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const userDetails = useSelector((state) => state.user.user);
  const isAuthenticated = !!userDetails?._id;
  const isInitialized = useSelector((state) => state.user.initialized);
  const [isRoleSwitching] = useState(false);

  // Final slugs without dashes for internal pages (adjust to your routes if needed)
  const routes = {
    home: '/home',
    services: {
      web: '/website-development-service',
      cloud: '/cloud-software-service',
    },
    about: '/about-us',
    contact: '/contact',
    legal: {
      terms: '/terms-and-conditions',
      privacy: '/privacy-policy',
      cookies: '/cookies-policy',
      refund: '/refund-policy',
      delivery: '/delivery-policy',
      guidelines: '/disclaimers',
    },
    login: '/login',          // keep your existing customer login route
    staffLogin: '/staff-login'// staff login kept as requested
  };

  // External network links
  const networkLinks = {
    websiteDev: 'https://website-dev.example.com',
    digitalMarketing: 'https://digital-marketing.example.com',
    itSolution: 'https://it-solutions.example.com'
  };

  // Minimal menu model matching the final decision
  const menuItems = [
    { name: 'Home', href: routes.home, icon: <Home className="w-4 h-4" /> },
    {
      name: 'Services',
      dropdown: [
        {
          category: 'Build',
          items: [
           {
  name: 'Web Application Development',
  href: routes.services.web,
  desc: 'Custom-built web portals and business platforms'
},
{
  name: 'Cloud Software Solutions',
  href: routes.services.cloud,
  desc: 'Fast, secure, and scalable systems accessible anywhere'
}

          ]
        }
      ]
    },
    { name: 'About', href: routes.about },
    { name: 'Contact', href: routes.contact },
    {
      name: 'Our Network',
      dropdown: [
        {
          
          items: [
            { name: 'Website Development', href: networkLinks.websiteDev, external: true },
            { name: 'Digital Marketing', href: networkLinks.digitalMarketing, external: true },
            { name: 'IT Solutions', href: networkLinks.itSolution, external: true }
          ]
        }
      ]
    },
    {
      name: 'Terms and Policies',
      dropdown: [
        {
          
          items: [
            { name: 'Terms and Conditions', href: routes.legal.terms },
            { name: 'Privacy Policy', href: routes.legal.privacy },
            { name: 'Cookie Policy', href: routes.legal.cookies },
            { name: 'Refund and Cancellation Policy', href: routes.legal.refund },
            { name: 'Delivery Policy', href: routes.legal.delivery },
            { name: 'User Guidelines and Disclaimer', href: routes.legal.guidelines }
          ]
        }
      ]
    }
  ];

  const getProjectLink = () => {
    if (activeProject && activeProject._id) return `/project-details/${activeProject._id}`;
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/project-details/')) return currentPath;
    return '/order';
  };

  const handleProtectedNavigation = (e) => {
    e.preventDefault();
    if (isInitialized && !userDetails) setShowLoginPopup(true);
    else window.location.href = e.currentTarget.href;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target) && menuDisplay) {
        setMenuDisplay(false);
      }
      if (activeDropdown !== null && !event.target.closest('.main-nav-dropdown')) {
        setActiveDropdown(null);
      }
      if (searchOpen && searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (menuDisplay) setMenuDisplay(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (activeDropdown !== null) setActiveDropdown(null);
        if (searchOpen) setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [menuDisplay, mobileMenuOpen, activeDropdown, searchOpen]);

  const handleLogout = async () => {
    try {
      const guestSlides = StorageService.getGuestSlides();
      if (guestSlides?.length) {
        try {
          sessionStorage.setItem('sessionGuestSlides', JSON.stringify(guestSlides));
          localStorage.setItem('preservedGuestSlides', JSON.stringify(guestSlides));
          localStorage.setItem('guestSlides', JSON.stringify(guestSlides));
          localStorage.setItem('lastLogoutTimestamp', Date.now().toString());
        } catch {}
      }
      if (isOnline) {
        const response = await fetch(SummaryApi.logout_user.url, {
          method: SummaryApi.logout_user.method,
          credentials: 'include'
        });
        const data = await response.json();
        if (data.success) toast.success(data.message);
      }
      CookieManager.clearAll();
      StorageService.clearUserData();
      const preserved = localStorage.getItem('preservedGuestSlides');
      const sessionBackup = sessionStorage.getItem('sessionGuestSlides');
      if (!localStorage.getItem('guestSlides')) {
        if (preserved) localStorage.setItem('guestSlides', preserved);
        else if (sessionBackup) localStorage.setItem('guestSlides', sessionBackup);
      }
      dispatch(logout());
      setMenuDisplay(false);
      setSearch('');
      navigate("/");
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) navigate(`/search?q=${value}`);
    else navigate("/search");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) navigate(`/search?q=${search}`);
  };

  // Hover handlers for dropdowns
  const handleMouseEnter = (index) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 160);
  };

  const handleMobileMenuItemClick = (index, hasDropdown) => {
    if (hasDropdown) setActiveDropdown(activeDropdown === index ? null : index);
    else {
      setMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  };

  return (
    <>
      {isRoleSwitching && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <TriangleMazeLoader />
        </div>
      )}

      {/* Desktop Header */}
      <header className='hidden lg:block bg-white sticky top-0 z-50 border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-12">
              {/* Logo */}
                <Link to="/home" className="flex items-center">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-indigo-200">
                  M
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-700 to-indigo-900 bg-clip-text text-transparent">
                  MeraSoftware
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex space-x-8">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative group main-nav-dropdown"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="text-gray-700 hover:text-indigo-600 flex items-center py-1 transition-all duration-200 group"
                      >
                        {item.icon && <span className="mr-1.5">{item.icon}</span>}
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    ) : (
                      <button
                        className="text-gray-700 hover:text-indigo-600 flex items-center focus:outline-none py-1 transition-all duration-200 group"
                        aria-haspopup="menu"
                        aria-expanded={activeDropdown === index}
                      >
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                        <ChevronDown className="ml-1 w-4 h-4 group-hover:text-indigo-600 transition-all duration-200" />
                      </button>
                    )}

                    {item.dropdown && activeDropdown === index && (
                      <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-xl ring-1 ring-gray-100 z-50">
                        {/* Services simple two-item panel */}
                        {item.name === 'Services' && (
                          <div className="p-4 min-w-[340px]">
                          <ul className="space-y-2">
  {item.dropdown[0].items.map((svc, i) => (
    <li key={i}>
      <Link
        to={svc.href}
        className="block px-4 py-3 rounded-md hover:bg-gray-50 transition"
      >
        <div className="text-sm font-semibold text-gray-900 mb-1">
          {svc.name}
        </div>
        <div className="text-xs text-gray-600 leading-snug">
          {svc.desc}
        </div>
      </Link>
    </li>
  ))}
</ul>

                          </div>
                        )}

                        {/* Our Network and Legal generic list */}
                        {(item.name === 'Our Network' || item.name === 'Terms and Policies') && (
                          <div className="p-4 min-w-[320px]">
                            {item.dropdown.map((block, bIdx) => (
                              <div key={bIdx}>
                                <h4 className="text-xs font-semibold text-indigo-600 uppercase mb-2 tracking-wide">{block.category}</h4>
                                <ul className="space-y-1">
                                  {block.items.map((sub, sIdx) => (
                                    <li key={sIdx}>
                                      {sub.external ? (
                                        <a
                                          href={sub.href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center justify-between text-sm px-3 py-2 rounded-md hover:bg-gray-50 transition"
                                        >
                                          <span>{sub.name}</span>
                                          <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
                                        </a>
                                      ) : (
                                        <Link
                                          to={sub.href}
                                          className="block text-sm px-3 py-2 rounded-md hover:bg-gray-50 transition"
                                        >
                                          {sub.name}
                                        </Link>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
             

              <NotificationBell />

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span>Dashboard</span>
                  </Link>

                  {/* User menu */}
                  <div className='relative flex justify-center'>
                    <button
                      onClick={() => setMenuDisplay(prev => !prev)}
                      className='cursor-pointer relative flex justify-center items-center'
                    >
                      {user?.profilePic ? (
                        <div className="relative">
                          <img
                            src={user?.profilePic}
                            className='w-10 h-10 rounded-full object-cover border-2 border-indigo-100 shadow-sm'
                            alt={user?.name}
                          />
                          <span className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white w-3.5 h-3.5 rounded-full"></span>
                        </div>
                      ) : (
                        <div className="p-2 bg-indigo-100 rounded-full text-indigo-700 hover:bg-indigo-200 transition-colors">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                    </button>

                    {menuDisplay && (
                      <div
                        className='absolute bg-white top-12 right-0 w-64 rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50'
                        ref={userMenuRef}
                      >
                        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50">
                          <div className="font-medium text-gray-900">{user?.name || 'User'}</div>
                          <div className="text-sm text-gray-500 truncate">{user?.email || 'user@example.com'}</div>
                        </div>

                        <nav className="py-2">
                          {user?.role === ROLE.ADMIN && (
                            <Link to="/admin-panel/all-products" className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                                <Settings className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Admin Panel</div>
                                <div className="text-xs text-gray-500">Manage all products</div>
                              </div>
                            </Link>
                          )}

                          {user?.role === ROLE.MANAGER && (
                            <Link to="/manager-panel/dashboard" className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                <Settings className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Manager Panel</div>
                                <div className="text-xs text-gray-500">View dashboard</div>
                              </div>
                            </Link>
                          )}

                          {user?.role === ROLE.PARTNER && (
                            <Link to="/partner-panel/dashboard" className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                              <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                                <Settings className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Partner Panel</div>
                                <div className="text-xs text-gray-500">View dashboard</div>
                              </div>
                            </Link>
                          )}

                          {user?.role === ROLE.DEVELOPER && (
                            <Link to="/developer-panel" className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                                <Settings className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Developer Panel</div>
                                <div className="text-xs text-gray-500">Access development tools</div>
                              </div>
                            </Link>
                          )}

                          <Link to='/order' className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                            <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                              <Settings className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Settings</div>
                              <div className="text-xs text-gray-500">Manage your account</div>
                            </div>
                          </Link>

                          <div className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors'>
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                              <Wallet className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Wallet Balance</div>
                              <div className="text-xs font-medium text-emerald-600">{displayCurrency(context.walletBalance)}</div>
                            </div>
                          </div>

                          <button
                            onClick={handleLogout}
                            className='w-full text-left flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors border-t border-gray-100 mt-2'
                          >
                            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                              <LogOut className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Logout</div>
                              <div className="text-xs text-gray-500">Sign out of your account</div>
                            </div>
                          </button>
                        </nav>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Staff Login kept as requested */}
                  <button
                    onClick={() => setShowStaffLoginPopup(true)}
                    className="bg-white text-indigo-600 border border-indigo-200 px-4 py-2 rounded-full hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
                  >
                    Staff Login
                  </button>
                  <button
                    onClick={() => setShowLoginPopup(true)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white sticky top-0 z-50 border-b border-gray-100">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/home" className="flex items-center">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-md">
                M
              </div>
              <span className="ml-2 text-lg font-bold bg-gradient-to-r from-indigo-700 to-indigo-900 bg-clip-text text-transparent">
                MeraSoftware
              </span>
            </Link>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-full"
                aria-label="Open search"
              >
                <Search size={20} />
              </button>

              <NotificationBell />

              {isAuthenticated ? (
                <div className='relative'>
                  <button
                    onClick={() => setMenuDisplay(prev => !prev)}
                    className='cursor-pointer relative flex justify-center items-center'
                  >
                    {user?.profilePic ? (
                      <div className="relative">
                        <img
                          src={user?.profilePic}
                          className='w-8 h-8 rounded-full object-cover border-2 border-indigo-100'
                          alt={user?.name}
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 bg-green-500 border-2 border-white w-2.5 h-2.5 rounded-full"></span>
                      </div>
                    ) : (
                      <div className="p-1.5 bg-indigo-100 rounded-full text-indigo-700">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                  </button>

                  {menuDisplay && (
                    <div className='absolute bg-white top-10 right-0 w-64 rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50' ref={userMenuRef}>
                      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50">
                        <div className="font-medium text-gray-900">{user?.name || 'User'}</div>
                        <div className="text-sm text-gray-500 truncate">{user?.email || 'user@example.com'}</div>
                      </div>

                      <nav className="py-2">
                        {user?.role === ROLE.ADMIN && (
                          <Link to="/admin-panel/all-products" className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                              <Settings className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Admin Panel</div>
                              <div className="text-xs text-gray-500">Manage all products</div>
                            </div>
                          </Link>
                        )}

                        {user?.role === ROLE.MANAGER && (
                          <Link to="/manager-panel/dashboard" className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                              <Settings className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Manager Panel</div>
                            </div>
                          </Link>
                        )}

                        {user?.role === ROLE.PARTNER && (
                          <Link to="/partner-panel/dashboard" className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                            <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                              <Settings className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Partner Panel</div>
                            </div>
                          </Link>
                        )}

                        {user?.role === ROLE.DEVELOPER && (
                          <Link to="/developer-panel" className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                              <Settings className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Developer Panel</div>
                            </div>
                          </Link>
                        )}

                        <Link to='/order' className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors' onClick={() => setMenuDisplay(false)}>
                          <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                            <Settings className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Settings</div>
                          </div>
                        </Link>

                        <div className='flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors'>
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <Wallet className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Balance: {displayCurrency(context.walletBalance)}</div>
                          </div>
                        </div>

                        <button
                          onClick={handleLogout}
                          className='w-full text-left flex items-center gap-2 hover:bg-gray-50 p-3 text-gray-700 transition-colors border-t border-gray-100 mt-2'
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                            <LogOut className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Logout</div>
                          </div>
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginPopup(true)}
                  className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-indigo-700 shadow-md"
                >
                  Login
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 focus:outline-none hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <div className="mt-3">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search for services..."
                  className="w-full py-2 px-4 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  onChange={handleSearch}
                  value={search}
                  autoFocus
                />
                <button type="submit" className="absolute right-3 top-2 text-gray-400">
                  <Search size={18} />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="bg-white border-t border-gray-100 overflow-hidden">
            <nav className="max-h-[70vh] overflow-y-auto py-4 px-4">
              {menuItems.map((item, index) => (
                <div key={index} className="py-1">
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="block text-gray-700 hover:text-indigo-600 py-2 px-3 rounded-lg flex items-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon && <span className="mr-3">{item.icon}</span>}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => handleMobileMenuItemClick(index, true)}
                        className="w-full text-left text-gray-700 hover:text-indigo-600 py-2 px-3 rounded-lg flex items-center justify-between"
                      >
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown className={`w-5 h-5 transform transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                      </button>

                      {activeDropdown === index && (
                        <div className="ml-4 mt-2 space-y-3 overflow-hidden">
                          {item.dropdown.map((category, catIndex) => (
                            <div key={catIndex} className="mb-1">
                              <h4 className="text-xs font-semibold text-indigo-600 uppercase mb-2 px-2">{category.category}</h4>
                              <ul className="space-y-1">
                                {category.items.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    {subItem.external ? (
                                      <a
                                        href={subItem.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-gray-800 hover:text-indigo-600 hover:bg-gray-50 text-sm py-2 px-3 rounded-md transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {subItem.name}
                                      </a>
                                    ) : (
                                      <Link
                                        to={subItem.href}
                                        className="block text-gray-800 hover:text-indigo-600 hover:bg-gray-50 text-sm py-2 px-3 rounded-md transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {subItem.name}
                                      </Link>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              {/* Staff Login and Login on mobile when not authenticated */}
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 mt-4 px-3">
                  <button
                    onClick={() => { setShowStaffLoginPopup(true); setMobileMenuOpen(false); }}
                    className="bg-white text-indigo-600 border border-indigo-200 py-2 rounded-lg text-center font-medium hover:bg-indigo-50 transition-colors"
                  >
                    Staff Login
                  </button>
                  <button
                    onClick={() => { setShowLoginPopup(true); setMobileMenuOpen(false); }}
                    className="bg-indigo-600 text-white py-2 rounded-lg text-center font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Login
                  </button>
                </div>
              )}

              {/* Dashboard link for mobile when authenticated */}
              {isAuthenticated && (
                <div className="mt-4 px-3">
                  <Link
                    to="/dashboard"
                    className="bg-indigo-600 text-white py-2 rounded-lg text-center font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Dashboard
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      <ClientPortalModal isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
      <StaffLoginPopup isOpen={showStaffLoginPopup} onClose={() => setShowStaffLoginPopup(false)} />
    </>
  );
};

export default Header;

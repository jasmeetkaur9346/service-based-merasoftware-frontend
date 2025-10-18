import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  Menu, X, Home, ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ClientPortalModal from './ClientPortalModal';
import ThemeToggleIcon from './ThemeToggleIcon';
import StaffLoginPopup from './StaffLoginPopup';

const Header = () => {
  const { user, initializing, logout, customerPortalUrl, staffPortalUrl } = useAuth();

  const [menuDisplay, setMenuDisplay] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showStaffLoginPopup, setShowStaffLoginPopup] = useState(false);

  const userMenuRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  const isAuthenticated = Boolean(user?._id);
  const userInitial = user?.name?.[0]?.toUpperCase() || 'U';

  // Routes for internal pages
  const routes = {
    home: '/',
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
    staffLogin: '/staff-login'
  };

  // External network links
  const networkLinks = {
    websiteDev: 'https://website-dev.example.com',
    digitalMarketing: 'https://digital-marketing.example.com',
    itSolution: 'https://it-solutions.example.com'
  };

  // Menu structure
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
    // {
    //   name: 'Our Network',
    //   dropdown: [
    //     {
    //       items: [
    //         { name: 'Website Development', href: networkLinks.websiteDev, external: true },
    //         { name: 'Digital Marketing', href: networkLinks.digitalMarketing, external: true },
    //         { name: 'IT Solutions', href: networkLinks.itSolution, external: true }
    //       ]
    //     }
    //   ]
    // },
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

  const closeMenus = useCallback(() => {
    setMenuDisplay(false);
    setMobileMenuOpen(false);
  }, []);

  const openInNewTab = (url, fallbackPath) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (!fallbackPath) return;
    if (fallbackPath.startsWith('http')) {
      window.open(fallbackPath, '_blank', 'noopener,noreferrer');
    } else {
      window.open(fallbackPath, '_self');
    }
  };

  const handleStaffLogin = () => {
    setShowStaffLoginPopup(true);
    closeMenus();
  };

  const handleDashboard = () => {
    closeMenus();
    openInNewTab(customerPortalUrl, routes.home);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
    closeMenus();
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    closeMenus();
    if (customerPortalUrl) {
      openInNewTab(customerPortalUrl);
    }
  };

  const handleLogout = async () => {
    await logout();
    closeMenus();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target) && menuDisplay) {
        setMenuDisplay(false);
      }
      if (activeDropdown !== null && !event.target.closest('.main-nav-dropdown')) {
        setActiveDropdown(null);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (menuDisplay) setMenuDisplay(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (activeDropdown !== null) setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [menuDisplay, mobileMenuOpen, activeDropdown]);

  useEffect(() => {
    if (!isAuthenticated) {
      setMenuDisplay(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleOpenLogin = () => {
      closeMenus();
      setShowLoginModal(true);
    };

    window.addEventListener('client-portal:open-login', handleOpenLogin);
    return () => {
      window.removeEventListener('client-portal:open-login', handleOpenLogin);
    };
  }, [closeMenus]);

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
      {/* Desktop Header */}
      <header className='hidden lg:block bg-white dark:bg-slate-950 sticky top-0 z-50 border-b border-gray-100 dark:border-slate-800 py-4'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-12">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold">
                  M
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent">
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
                        className="text-gray-700 dark:text-slate-200 hover:text-indigo-600 flex items-center py-1 transition-all duration-200 group"
                      >
                        {item.icon && <span className="mr-1.5">{item.icon}</span>}
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    ) : (
                      <button
                        className="text-gray-700 dark:text-slate-200 hover:text-indigo-600 flex items-center focus:outline-none py-1 transition-all duration-200 group"
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
                      <div className="absolute left-0 mt-2 bg-white dark:bg-slate-900 rounded-lg shadow-xl ring-1 ring-gray-100 dark:ring-slate-700 z-50">
                        {/* Services simple two-item panel */}
                        {item.name === 'Services' && (
                          <div className="p-4 min-w-[340px]">
                            <ul className="space-y-2">
                              {item.dropdown[0].items.map((svc, i) => (
                                <li key={i}>
                                  <Link
                                    to={svc.href}
                                    className="block px-4 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                                  >
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                      {svc.name}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-slate-400 leading-snug">
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
                                {block.category && <h4 className="text-xs font-semibold text-indigo-600 uppercase mb-2 tracking-wide">{block.category}</h4>}
                                <ul className="space-y-1">
                                  {block.items.map((sub, sIdx) => (
                                    <li key={sIdx}>
                                      {sub.external ? (
                                        <a
                                          href={sub.href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center justify-between text-sm px-3 py-2 rounded-md text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                                        >
                                          <span>{sub.name}</span>
                                          <ExternalLink className="h-3.5 w-3.5 text-gray-400 dark:text-slate-400" />
                                        </a>
                                      ) : (
                                        <Link
                                          to={sub.href}
                                          className="block text-sm px-3 py-2 rounded-md text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
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
            {!initializing && (
              <div className="hidden lg:flex items-center space-x-4">
                <ThemeToggleIcon />

                {isAuthenticated ? (
                  <>
                    {/* <button
                      onClick={handleDashboard}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors shadow-md hover:shadow-lg"
                    >
                      Dashboard
                    </button> */}
                    <div className="relative" ref={userMenuRef}>
                      <button
                        onClick={() => setMenuDisplay((prev) => !prev)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-full border border-gray-200 dark:border-slate-700 hover:border-indigo-300 transition-colors bg-white dark:bg-slate-900 shadow-sm"
                      >
                        <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-200 flex items-center justify-center font-semibold">
                          {userInitial}
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-semibold text-gray-800 dark:text-white leading-tight">
                            {user?.name || 'User'}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-slate-400 leading-tight max-w-[140px] truncate">
                            {user?.email || ''}
                          </div>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                      </button>

                      {menuDisplay && (
                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-100 dark:border-slate-800 overflow-hidden z-50">
                          <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {user?.name || 'User'}
                            </p>
                            {user?.email && (
                              <p className="text-xs text-gray-500 dark:text-slate-400 truncate">
                                {user.email}
                              </p>
                            )}
                          </div>
                          <button
                      onClick={handleDashboard}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors border-b dark:border-slate-800"
                    >
                      Dashboard
                    </button>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            Logout
                          </button>

                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleStaffLogin}
                      className="bg-white dark:bg-slate-900 text-blue-600 dark:!text-white border border-indigo-200 dark:border-slate-700 px-4 py-2 rounded-full hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-slate-600 transition-all duration-200"
                    >
                      Staff Login
                    </button>
                    <button
                      onClick={handleLoginClick}
                      className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white dark:bg-slate-900 sticky top-0 z-50 border-b border-gray-100 dark:border-slate-800">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-md">
                M
              </div>
              <span className="ml-2 text-lg font-bold bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                MeraSoftware
              </span>
            </Link>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <ThemeToggleIcon />

              {/* Login Button or User Profile Icon */}
              {!initializing && (
                <>
                  {!isAuthenticated ? (
                    <button
                      onClick={handleLoginClick}
                      className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium"
                    >
                      Login
                    </button>
                  ) : (
                    <div
                      onClick={() => setMenuDisplay((prev) => !prev)}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-500/20 dark:to-cyan-500/20 flex items-center justify-center cursor-pointer border-2 border-blue-200 dark:border-blue-500/30 hover:border-blue-400 transition-colors overflow-hidden"
                    >
                      {user?.profilePic ? (
                        <img
                          src={user.profilePic}
                          alt={user?.name || 'User'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-200">
                          {userInitial}
                        </span>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 dark:text-slate-200 focus:outline-none hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile User Menu Dropdown */}
        {isAuthenticated && menuDisplay && (
          <div className="absolute right-4 top-16 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-100 dark:border-slate-800 overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user?.name || 'User'}
              </p>
              {user?.email && (
                <p className="text-xs text-gray-500 dark:text-slate-400 truncate">
                  {user.email}
                </p>
              )}
            </div>
            <button
              onClick={handleDashboard}
              className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors border-b dark:border-slate-800"
            >
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              Logout
            </button>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 overflow-hidden">
            <nav className="max-h-[70vh] overflow-y-auto py-4 px-4">
              {menuItems.map((item, index) => (
                <div key={index} className="py-1">
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="block text-gray-700 dark:text-slate-200 hover:text-indigo-600 py-2 px-3 rounded-lg flex items-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon && <span className="mr-3">{item.icon}</span>}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => handleMobileMenuItemClick(index, true)}
                        className="w-full text-left text-gray-700 dark:text-slate-200 hover:text-indigo-600 py-2 px-3 rounded-lg flex items-center justify-between"
                      >
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown className={`w-5 h-5 transform transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                      </button>

                      {activeDropdown === index && (
                        <div className="ml-4 mt-2 space-y-3 overflow-hidden">
                          {item.dropdown.map((category, catIndex) => (
                            <div key={catIndex} className="mb-1">
                              {category.category && <h4 className="text-xs font-semibold text-indigo-600 uppercase mb-2 px-2">{category.category}</h4>}
                              <ul className="space-y-1">
                                {category.items.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    {subItem.external ? (
                                      <a
                                        href={subItem.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-gray-800 dark:text-slate-200 hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-slate-800 text-sm py-2 px-3 rounded-md transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {subItem.name}
                                      </a>
                                    ) : (
                                      <Link
                                        to={subItem.href}
                                        className="block text-gray-800 dark:text-slate-200 hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-slate-800 text-sm py-2 px-3 rounded-md transition-colors"
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

              {!initializing && !isAuthenticated && (
                <div className="flex flex-col space-y-2 mt-6">
                  <button
                    onClick={handleStaffLogin}
                    className="w-full text-blue-600 dark:text-cyan-300 border border-blue-200 dark:border-slate-700 py-2.5 rounded-full font-medium hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Staff Login
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      <ClientPortalModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
      <StaffLoginPopup
        isOpen={showStaffLoginPopup}
        onClose={() => setShowStaffLoginPopup(false)}
      />
    </>
  );
};

export default Header;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Home, UserCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop Footer - Hidden on mobile */}
      <footer className="hidden md:block bg-slate-900 text-white dark:!bg-slate-950 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent">MeraSoftware</span>
              </div>
              <p className="text-sm text-slate-300">Your one-stop shop for all digital services. We help businesses build and enhance their online presence.</p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link to="/website-development-service" className="hover:text-white transition-colors">
                    Web Application
                  </Link>
                </li>
                <li>
                  <Link to="/cloud-software-service" className="hover:text-white transition-colors">
                    Cloud-Based Software
                  </Link>
                </li>
                <li>
                  <Link to="/about-us" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Terms & Policies</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms and Conditions</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookies-policy" className="hover:text-white transition-colors">Cookies Policy</Link></li>
                <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund & Cancellation Policy</Link></li>
                <li><Link to="/delivery-policy" className="hover:text-white transition-colors">Delivery Policy</Link></li>
                <li><Link to="/disclaimers" className="hover:text-white transition-colors">User Guidelines and Disclaimer</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Email: contact@merasoftware.com</li>
                <li>Phone: +91 93563 93094</li>
                <li>Address: VA Computers, Amritsar - 143601</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Footer Navigation - Hidden on desktop */}
      <div className="md:hidden mt-24">
        {/* Bottom Navigation */}
        <footer className="bg-white dark:bg-slate-900 border-t dark:border-slate-800 fixed bottom-0 left-0 right-0 z-10">
          <div className="flex justify-between items-center px-2">
            <Link to={"/"}
              className={`flex flex-col items-center py-2 px-4 ${activeTab === 'home' ? 'text-blue-600 dark:text-cyan-400' : 'text-gray-600 dark:text-slate-400'}`}
              onClick={() => setActiveTab('home')}
            >
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </Link>

            <Link to={"/contact"}
              className={`flex flex-col items-center py-2 px-4 ${activeTab === 'contact' ? 'text-blue-600 dark:text-cyan-400' : 'text-gray-600 dark:text-slate-400'}`}
              onClick={() => setActiveTab('contact')}
            >
              <MessageSquare size={20} />
              <span className="text-xs mt-1">Contact</span>
            </Link>

            <Link to={"/website-development-service"}
              className="flex flex-col items-center py-2 px-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center -mt-5 shadow-lg">
                <PlusCircle size={24} className="text-white" />
              </div>
              <span className="text-xs mt-1 text-blue-600 dark:text-cyan-400">Explore</span>
            </Link>

            <Link to={"/about-us"}
              className={`flex flex-col items-center py-2 px-4 ${activeTab === 'about' ? 'text-blue-600 dark:text-cyan-400' : 'text-gray-600 dark:text-slate-400'}`}
              onClick={() => setActiveTab('about')}
            >
              <MessageSquare size={20} />
              <span className="text-xs mt-1">About</span>
            </Link>

            {/* User Profile - Show profile if logged in */}
            <Link to={user?._id ? "/dashboard" : "/"}
              className={`flex flex-col items-center py-2 px-4 ${activeTab === 'profile' ? 'text-blue-600 dark:text-cyan-400' : 'text-gray-600 dark:text-slate-400'}`}
              onClick={() => setActiveTab('profile')}
            >
              {user?._id ? (
                <>
                  <UserCircle size={20} />
                  <span className="text-xs mt-1">You</span>
                </>
              ) : (
                <>
                  <UserCircle size={20} />
                  <span className="text-xs mt-1">Menu</span>
                </>
              )}
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;

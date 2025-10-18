import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Info, Phone, Calculator } from 'lucide-react';

const Footer = () => {
  const [activeTab, setActiveTab] = useState('home');
  const openPlanner = useCallback(() => {
    setActiveTab('calculator');
    try {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('project-planner:open'));
      }
    } catch (error) {
      console.error('Failed to open planner from footer:', error);
    }
  }, []);

  return (
    <>
      {/* Desktop Footer - Hidden on mobile */}
      <footer className="hidden md:block bg-slate-900 text-white dark:!bg-slate-950 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="max-w-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent">MeraSoftware</span>
              </div>
              <p className="text-sm text-slate-300">
                Your one-stop shop for all digital services. Discover, learn, and connect with us through the quick links alongside.
              </p>
            </div>

            <nav>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>
                  <Link to="/" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Home className="w-4 h-4" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about-us" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Info className="w-4 h-4" />
                    About
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={openPlanner}
                    className="flex items-center gap-2 hover:text-white transition-colors text-left w-full"
                  >
                    <Calculator className="w-4 h-4" />
                    Calculator
                  </button>
                </li>
                <li>
                  <Link to="/contact" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
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

            <Link to={"/about-us"}
              className={`flex flex-col items-center py-2 px-4 ${activeTab === 'about' ? 'text-blue-600 dark:text-cyan-400' : 'text-gray-600 dark:text-slate-400'}`}
              onClick={() => setActiveTab('about')}
            >
              <Info size={20} />
              <span className="text-xs mt-1">About</span>
            </Link>

            <button
              type="button"
              onClick={openPlanner}
              className={`flex flex-col items-center py-2 px-4 ${activeTab === 'calculator' ? 'text-blue-600 dark:text-cyan-400' : 'text-gray-600 dark:text-slate-400'}`}
            >
              <Calculator size={20} />
              <span className="text-xs mt-1">Calculator</span>
            </button>

            <Link to={"/contact"}
              className={`flex flex-col items-center py-2 px-4 ${activeTab === 'contact' ? 'text-blue-600 dark:text-cyan-400' : 'text-gray-600 dark:text-slate-400'}`}
              onClick={() => setActiveTab('contact')}
            >
              <Phone size={20} />
              <span className="text-xs mt-1">Contact</span>
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactPage from './pages/ContactPage';
import WebsiteDevelopmentService from './pages/WebsiteDevelopmentService';
import WebSoftwareService from './pages/WebSoftwareService';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiesPolicyPage from './pages/CookiesPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import DeliveryPolicyPage from './pages/DeliveryPolicyPage';
import DisclaimersPage from './pages/DisclaimersPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* Service Routes */}
            <Route path="/website-development-service" element={<WebsiteDevelopmentService />} />
            <Route path="/cloud-software-service" element={<WebSoftwareService />} />

            {/* Info Pages */}
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Legal Pages */}
            <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/cookies-policy" element={<CookiesPolicyPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/delivery-policy" element={<DeliveryPolicyPage />} />
            <Route path="/disclaimers" element={<DisclaimersPage />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

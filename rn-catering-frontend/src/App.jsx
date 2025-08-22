import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,Navigate 
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VenuePage from "./pages/Venues";
import ContactPage from "./pages/Contact";
import OurServicesPage from "./pages/OurService";
import MenuPage from "./components/MenuPage";
import Profile from "./components/Profile";
import PTOS from "./components/PTOS";
import NotFound from "./components/NotFound";

function AppContent() {
  const location = useLocation();
  const [showLayout, setShowLayout] = useState(true);

  useEffect(() => {
    // List of paths where header/footer should be hidden
    // Because wildcard route * matches anything, 404 is tricky to detect by pathname
    // We hide layout if Location is unmatched and renders NotFound by checking pathname or flag
    const hidePaths = ["/404"]; // if you have a legit 404 path
    if (hidePaths.includes(location.pathname)) {
      setShowLayout(false);
    } else {
      setShowLayout(true);
    }
  }, [location]);

  // Fallback: if you want to hide layout for all unmatched routes,
  // consider adding explicit route for /404 and redirect * to it, see below

  return (
    <>
      {showLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/venues" element={<VenuePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<OurServicesPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/privacyTos" element={<PTOS />} />

        {/* Define a dedicated 404 path */}
        <Route path="/404" element={<NotFound />} />
        {/* Redirect unmatched routes to /404 */}
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
      {showLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

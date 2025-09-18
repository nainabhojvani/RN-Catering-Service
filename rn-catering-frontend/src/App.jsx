import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
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
import BookingForm from "./components/BookingForm";
import VerifiedSuccess from "./pages/VerifiedSuccess";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function AppContent() {
  const location = useLocation();
  const [showLayout, setShowLayout] = useState(true);

  useEffect(() => {
    // Routes where header/footer should be hidden
    const hideLayoutRoutes = ["/verified-success", "/404"];

    if (hideLayoutRoutes.includes(location.pathname)) {
      setShowLayout(false);
    } else {
      setShowLayout(true);
    }
  }, [location]);

  return (
    <>
      <div className="overflow-x-hidden">
        {showLayout && <Header />}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/venues" element={<VenuePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<OurServicesPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/bookingform" element={<BookingForm />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/privacyTos" element={<PTOS />} />
          <Route path="/verified-success" element={<VerifiedSuccess />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={3000} />
        {showLayout && <Footer />}
      </div>
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

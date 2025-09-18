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
import withPageLoader from "./components/withPageLoader";

const HomeWithLoader = withPageLoader(Home);
const AboutWithLoader = withPageLoader(About);
const VenueWithLoader = withPageLoader(VenuePage);
const ContactWithLoader = withPageLoader(ContactPage);
const ServicesWithLoader = withPageLoader(OurServicesPage);
const MenuWithLoader = withPageLoader(MenuPage);
const BookingWithLoader = withPageLoader(BookingForm);
const ProfileWithLoader = withPageLoader(Profile);
const PTOSWithLoader = withPageLoader(PTOS);
const VerifiedSuccessWithLoader = withPageLoader(VerifiedSuccess);
const NotFoundWithLoader = withPageLoader(NotFound);

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Routes where header/footer should be hidden
    const hideLayoutRoutes = ["/verified-success", "/404"];

    if (hideLayoutRoutes.includes(location.pathname)) {
      setShowLayout(false);
    } else {
      setShowLayout(true);
    }
  }, [location]);

  // Listen to loader events from withPageLoader
  useEffect(() => {
    const handleLoadingStart = () => setIsLoading(true);
    const handleLoadingEnd = () => setIsLoading(false);

    window.addEventListener("page-loading-start", handleLoadingStart);
    window.addEventListener("page-loading-end", handleLoadingEnd);

    return () => {
      window.removeEventListener("page-loading-start", handleLoadingStart);
      window.removeEventListener("page-loading-end", handleLoadingEnd);
    };
  }, []);

  return (
    <>
      {!isLoading && showLayout && <Header />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeWithLoader />} />
        <Route path="/about" element={<AboutWithLoader />} />
        <Route path="/venues" element={<VenueWithLoader />} />
        <Route path="/contact" element={<ContactWithLoader />} />
        <Route path="/services" element={<ServicesWithLoader />} />
        <Route path="/menu" element={<MenuWithLoader />} />
        <Route path="/bookingform" element={<BookingWithLoader />} />
        <Route path="/profile/:username" element={<ProfileWithLoader />} />
        <Route path="/privacyTos" element={<PTOSWithLoader />} />
        <Route
          path="/verified-success"
          element={<VerifiedSuccessWithLoader />}
        />
        <Route path="/404" element={<NotFoundWithLoader />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
      {!isLoading && showLayout && <Footer />}
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

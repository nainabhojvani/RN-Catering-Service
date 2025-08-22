import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
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
import { AuthProvider } from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Scroll to Top Handler tostart the page from Top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <ToastContainer position="bottom-right" autoClose={3000} />
        <ToastContainer position="bottom-left" autoClose={3000} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/venues" element={<VenuePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<OurServicesPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/privacyTos" element={<PTOS />} />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;

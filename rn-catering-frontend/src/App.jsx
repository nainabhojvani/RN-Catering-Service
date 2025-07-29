import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VenuePage from "./pages/Venues";
import ContactPage from "./pages/Contact";
import OurServicesPage from "./pages/OurService";
import MenuPage from "./components/MenuPage";
import Profile from "./components/Profile";
import { AuthProvider } from "./context/AuthProvider"; // ✅ Import
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Router>
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
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;

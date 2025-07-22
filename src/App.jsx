import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VenuePage from "./pages/Venues";
import ContactPage from "./pages/Contact";
import OurServicesPage from "./pages/OurService";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/venues" element={<VenuePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<OurServicesPage />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

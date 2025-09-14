import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import logo from "../assets/RN_logo(1).png";

function Header({ sidebarOpen, toggleSidebar }) {
    return (
        <header className="min-w-screen h-16 bg-[#306344]/90 flex items-center justify-between p-2 shadow-lg md:hidden z-50">
            <div className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="h-10 w-10 object-contain p-1 rounded-full bg-white shadow" />
                <span className="text-xl font-bold text-[#e4df5a]">RN Catering</span>
            </div>
            <button
                className="text-[#fffdf3] bg-[#19522f]/80 p-2 rounded-lg"
                onClick={toggleSidebar}
                aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
                {sidebarOpen ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
            </button>
        </header>
    );
}

export default Header;

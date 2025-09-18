import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import logo from "../assets/RN_logo(1).png";

function Header({ sidebarOpen, toggleSidebar }) {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-[#306344] flex items-center justify-between shadow-lg z-50 md:hidden">
            <div className="flex items-center gap-3">
                <img
                    src={logo}
                    alt="Logo"
                    className="h-10 ml-2 w-10 object-contain p-1 rounded-full bg-white shadow"
                />
                <span className="text-xl font-bold text-[#e4df5a]">RN Catering</span>
            </div>
            <button
                className="text-[#e4df5a] bg-[#306344] p-2 border-none rounded-lg"
                onClick={toggleSidebar}
                aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
                {sidebarOpen ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
            </button>
        </header>
    );


}

export default Header;

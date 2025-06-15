
import { useNavigate } from "react-router-dom";  
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "@/Redux/Auth/Action";

import {
  HomeIcon,
  DashboardIcon,
  ActivityLogIcon,
  ExitIcon,
  MagnifyingGlassIcon,
  DragHandleHorizontalIcon,
} from "@radix-ui/react-icons";
import { CreditCardIcon, WalletIcon } from "lucide-react";

const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-4 w-4" /> },
  { name: "Portfolio", path: "/portfolio", icon: <DashboardIcon className="h-4 w-4" /> },
  { name: "Activity", path: "/activity", icon: <ActivityLogIcon className="h-4 w-4" /> },
  { name: "Wallet", path: "/wallet", icon: <WalletIcon className="h-4 w-4" /> },
  { name: "Withdrawal", path: "/withdrawal", icon: <CreditCardIcon className="h-4 w-4" /> },
  { name: "Logout", path: "/", icon: <ExitIcon className="h-4 w-4" /> },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = () => {
    if (auth.user) {
      auth.user.role === "ROLE_ADMIN" ? navigate("/admin/withdrawal") : navigate("/wallet");
    }
  };

  const handleMenuClick = (item) => {
    if (item.name === "Logout") {
      dispatch(logout());
      navigate(item.path);
    } else {
      navigate(item.path);
    }
    setIsOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-3 md:px-6 py-3">

        {/* Logo */}
        <div className="flex items-center gap-5">
          <p
            onClick={() => navigate("/")}
            className="text-lg font-semibold text-black cursor-pointer"
          >
            AbiTrade
          </p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-5">
          {menu.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMenuClick(item)}
              className="flex items-center gap-1 text-[14px] font-medium text-gray-700 cursor-pointer hover:text-black transition"
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/search")}
            className="hidden md:flex items-center gap-2 px-4 py-[6px] rounded-md border border-black text-black text-sm font-medium hover:bg-black hover:text-white transition"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            <span>Search</span>
          </button>

          <div
            onClick={handleNavigate}
            className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full border border-black text-black font-semibold hover:bg-black hover:text-white transition"
          >
            {auth.user ? (
              <span className="text-md">{auth.user.fullName[0].toUpperCase()}</span>
            ) : (
              <span className="text-md">U</span>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-black"
          >
            <DragHandleHorizontalIcon className="h-7 w-7" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex">
          <div className="w-64 bg-white h-full shadow-lg p-4 transition">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <img
                  className="h-9 w-9 rounded-full"
                  src="https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png"
                  alt="logo"
                />
                <p className="text-sm font-semibold text-black">Abi Trade</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-700 text-2xl">×</button>
            </div>

            <div className="space-y-3">
              {/* Search button added for mobile */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/search");
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md border border-black text-black text-sm font-medium hover:bg-black hover:text-white transition"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
                <span>Search</span>
              </button>

              {menu.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleMenuClick(item)}
                  className="flex items-center gap-3 py-2 px-2 rounded-md text-gray-700 hover:text-black transition cursor-pointer"
                >
                  <span className="w-5">{item.icon}</span>
                  <p className="text-sm font-medium">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div onClick={() => setIsOpen(false)} className="flex-1"></div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

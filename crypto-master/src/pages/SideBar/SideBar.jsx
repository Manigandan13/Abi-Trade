import { logout } from "@/Redux/Auth/Action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SheetClose } from "@/components/ui/sheet";

import {
  HomeIcon,
  DashboardIcon,
  BookmarkIcon,
  ActivityLogIcon,
  PersonIcon,
  ExitIcon
} from "@radix-ui/react-icons";
import {
  CreditCardIcon,
  WalletIcon
} from "lucide-react";


const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-4 w-4" /> },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: <DashboardIcon className="h-4 w-4" />,
  },

  {
    name: "Watchlist",
    path: "/watchlist",
    icon: <BookmarkIcon className="h-4 w-4" />,
  },
  {
    name: "Activity",
    path: "/activity",
    icon: <ActivityLogIcon className="h-4 w-4" />,
  },
  { name: "Wallet", path: "/wallet", icon: <WalletIcon className="h-4 w-4" /> },

  {
    name: "Withdrawal",
    path: "/withdrawal",
    icon: <CreditCardIcon className="h-4 w-4" />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <PersonIcon className="h-4 w-4" />,
  },
  
  { name: "Logout", path: "/", icon: <ExitIcon className="h-4 w-4" /> },
];

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMenuClick = (item) => {
    if (item.name === "Logout") {
      handleLogout();
      navigate(item.path);
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="mt-10 space-y-5">
      {menu.map((item, index) => (
        <div key={index} className="w-full">
          <div
            onClick={() => handleMenuClick(item)}
            className="flex items-center gap-5 py-3 px-3 rounded-md hover:bg-[#16FF00] hover:text-black text-white cursor-pointer transition"
          >
            <span className="w-5">{item.icon}</span>
            <p className="text-sm font-medium">{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBar;

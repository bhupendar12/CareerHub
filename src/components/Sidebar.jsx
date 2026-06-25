import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  User,
  BarChart3,
  LogOut,
  Calendar,
  Settings,
  GraduationCap,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/dashboard",
    },
    {
      name: "Applications",
      icon: <Briefcase size={18} />,
      path: "/applications",
    },
    {
      name: "Add Application",
      icon: <PlusCircle size={18} />,
      path: "/add-application",
    },
    {
      name: "Calendar",
      icon: <Calendar size={18} />,
      path: "/calendar",
    },
    {
      name: "Statistics",
      icon: <BarChart3 size={18} />,
      path: "/statistics",
    },
    {
      name: "Profile",
      icon: <User size={18} />,
      path: "/profile",
    },
    {
      name: "Settings",
      icon: <Settings size={18} />,
      path: "/settings",
    },
  ];

  return (
    <div className="fixed left-0 top-0 w-56 h-screen bg-slate-950 text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="px-6 py-7 border-b border-slate-800">

        <div className="flex items-center gap-3">

          <div className="bg-gradient-to-r from-purple-600 to-fuchsia-500 p-3 rounded-2xl shadow-lg">
            <GraduationCap size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Career
              <span className="text-purple-400">
                Hub
              </span>
            </h1>

            <p className="text-xs text-gray-400 mt-1">
              Internship & Placement Tracker
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">

        <ul className="space-y-2">

          {menuItems.map((item) => (

            <li key={item.path}>

              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300
                ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-lg"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.icon}

                <span className="text-sm font-medium">
                  {item.name}
                </span>

              </Link>

            </li>

          ))}

        </ul>

      </nav>

      {/* Quote Card */}
      <div className="mx-4 mb-5 p-5 rounded-3xl bg-gradient-to-r from-purple-600 to-fuchsia-500 shadow-xl">

        <p className="text-sm leading-relaxed">
          "Every application is one step closer to your dream job."
        </p>

      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-300 hover:bg-red-500/10 hover:text-red-300 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );
}
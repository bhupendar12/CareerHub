import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getApplications } from "../services/applicationService";

export default function Navbar({
  searchTerm,
  setSearchTerm,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const imageKey = `profileImage_${user.email}`;

  useEffect(() => {

    const savedImage =
      localStorage.getItem(imageKey);

    if (savedImage) {
      setProfileImage(savedImage);
    } else {
      setProfileImage("");
    }

    const fetchNotifications = async () => {

      try {

        const data =
          await getApplications();

        setNotifications(
          data.slice().reverse().slice(0, 3)
        );

      } catch (error) {

        console.log(error);

      }

    };

    fetchNotifications();

  }, [imageKey]);

  const handleLogout = () => {

    logout();

    navigate("/");

  };

  return (

    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-sm px-8 py-4 flex items-center justify-between">

      {/* Left Side */}
      <div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back,{" "}
          <span className="text-purple-600">
            {user?.name?.split(" ")[0] || "User"}
          </span>{" "}
          👋
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Track, manage and grow your career opportunities.
        </p>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm || ""}
            onChange={(e) =>
              setSearchTerm &&
              setSearchTerm(e.target.value)
            }
            className="w-80 h-12 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-500 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

        </div>

        {/* Notifications */}
        <div className="relative">

          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition"
          >

            <Bell
              size={24}
              className="text-gray-700 dark:text-gray-300"
            />

            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {notifications.length}
            </span>

          </button>

          {showNotifications && (

            <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-4 z-50">

              <h3 className="font-bold text-gray-800 dark:text-white mb-3">
                Notifications
              </h3>

              <div className="space-y-3 text-sm">

                {notifications.length > 0 ? (

                  notifications.map((item) => (

                    <div
                      key={item._id}
                      className="bg-gray-50 dark:bg-slate-700 rounded-xl p-3 text-gray-700 dark:text-gray-200"
                    >

                      {item.status === "Applied" && "💼 "}
                      {item.status === "Interview" && "📅 "}
                      {item.status === "Selected" && "🎉 "}
                      {item.status === "Rejected" && "❌ "}

                      {item.company} - {item.status}

                    </div>

                  ))

                ) : (

                  <p className="text-gray-500">
                    No notifications
                  </p>

                )}

              </div>

            </div>

          )}

        </div>

        {/* Profile */}
        <div className="relative">

          <button
            onClick={() =>
              setShowMenu(!showMenu)
            }
            className="flex items-center gap-2"
          >

            <img
              src={
                profileImage ||
                "https://i.pravatar.cc/100"
              }
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover"
            />

            <ChevronDown
              size={18}
              className="text-gray-700 dark:text-gray-300"
            />

          </button>

          {showMenu && (

            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden z-50">

              <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700">

                <p className="font-semibold text-gray-800 dark:text-white">
                  {user?.name || "User"}
                </p>

                <p className="text-sm text-gray-500 truncate">
                  {user?.email || ""}
                </p>

              </div>

              <button
                onClick={() =>
                  navigate("/profile")
                }
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200"
              >

                <User size={18} />
                Profile

              </button>

              <button
                onClick={() =>
                  navigate("/settings")
                }
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200"
              >

                <Settings size={18} />
                Settings

              </button>

              <hr className="dark:border-slate-700" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >

                <LogOut size={18} />
                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}


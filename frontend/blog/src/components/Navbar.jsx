import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const baseButtonStyle =
    "px-4 py-2 rounded-lg font-medium transition duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg";

  return (
    <nav className="bg-black bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white p-5 flex justify-between items-center shadow-2xl sticky top-0 z-50 border-b border-gray-700">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold tracking-wider text-teal-400 hover:text-teal-300 transition duration-300">
        <Link to="/">MERN Blog</Link>
      </h1>

      {/* Nav Links */}
      <div className="flex items-center space-x-4 md:space-x-6">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className={`bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 ${baseButtonStyle} shadow-green-600/50`}
            >
              🔑 Login
            </Link>
            <Link
              to="/register"
              className={`bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 ${baseButtonStyle} shadow-amber-500/50`}
            >
              ✍️ Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/"
              className={`text-gray-300 hover:text-white hover:bg-gray-800 ${baseButtonStyle.replace(
                "rounded-lg",
                "rounded-full"
              )} shadow-none`}
            >
              📚 All Blogs
            </Link>
            <Link
              to="/add-blog"
              className={`bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 ${baseButtonStyle} shadow-blue-600/50`}
            >
              ➕ Add Blog
            </Link>
            <button
              onClick={handleLogout}
              className={`bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 ${baseButtonStyle} shadow-red-600/50`}
            >
              🚪 Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

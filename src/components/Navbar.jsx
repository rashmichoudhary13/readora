import React, { useEffect, useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../context/Supabase";

const MyNavbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data?.user);
    };
    checkUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) =>
      setIsLoggedIn(!!session?.user)
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    navigate("/register");
  };

  const navLinks = [
    { name: "Home", to: "/" },
    ...(isLoggedIn
      ? [
          { name: "Add Listing", to: "/book/list" },
          { name: "Profile", to: "/profile" },
        ]
      : []),
  ];

  const GradientButton = ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full border border-purple-300 bg-white/90 px-5 text-sm font-semibold text-purple-700 shadow-md backdrop-blur transition-all duration-300 hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 hover:text-white hover:scale-105"
    >
      {children}
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-md shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-purple-700 hover:text-purple-900 transition"
        >
          <BookOpen className="h-7 w-7" />
          <span className="text-xl font-extrabold tracking-tight">Readora</span>
        </Link>

        {/* Nav pill group */}
        <div className="hidden md:flex items-center bg-white/20 backdrop-blur-md px-6 py-2 rounded-full shadow-inner space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="relative text-purple-800 hover:text-purple-500 text-sm font-medium transition group"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {isLoggedIn ? (
            <GradientButton onClick={handleLogout}>Logout</GradientButton>
          ) : (
            <GradientButton onClick={() => navigate("/user")}>
              Signin
            </GradientButton>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 py-4 bg-black/30 backdrop-blur-md space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-purple-700 hover:bg-purple-100 transition"
            >
              {link.name}
            </Link>
          ))}
          <div>
            {isLoggedIn ? (
              <GradientButton
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </GradientButton>
            ) : (
              <GradientButton
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/user");
                }}
              >
                Signin
              </GradientButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;

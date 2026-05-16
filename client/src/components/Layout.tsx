import { useAuth } from "@/auth/auth-context";
import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import Hero from "./Hero";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const showHero = location.pathname === "/";
  const [emoji, setEmoji] = useState("😎");
  const [darkMode, setDarkMode] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const emojis = ["😎", "🤪", "👾", "🚀", "💥", "😈", "🌀", "🎯", "🔥", "🐸", "🍕", "⚡"];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      setShowFooter(scrollY + windowHeight >= fullHeight - 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeEmoji = () => {
    const random = emojis[Math.floor(Math.random() * emojis.length)];
    setEmoji(random);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const isActive = (path: string) => (location.pathname === path ? "underline" : "");

  return (
    <>
      <nav
        className={`w-full border-b-4 border-black shadow-[0px_8px_0px_rgba(0,0,0,1)] ${
          darkMode ? "bg-black text-white" : "bg-cyan-400 text-black"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 p-5 sm:flex-row">
          <h1 className="text-3xl font-black uppercase tracking-tighter transition hover:rotate-0">
            <Link to="/">✏️ HabitTracker</Link>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-lg font-bold uppercase">
            <Link to="/home" className={isActive("/home")}>
              Home
            </Link>

            <Link to="/habits" className={isActive("/habits")}>
              Habits
            </Link>

            <button
              onClick={changeEmoji}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black hover:scale-125 active:scale-90"
              aria-label="Change page emoji"
            >
              {emoji}
            </button>

            <div className="flex items-center gap-3">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <button className="rounded bg-black px-4 py-2 text-white hover:opacity-80">
                      Login
                    </button>
                  </Link>

                  <Link to="/register">
                    <button className="rounded border-2 border-black px-4 py-2 hover:bg-black hover:text-white">
                      Register
                    </button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="rounded bg-red-500 px-4 py-2 text-white hover:opacity-80"
                >
                  Logout
                </button>
              )}
            </div>

            <button
              onClick={() => setDarkMode((current) => !current)}
              className="flex items-center cursor-pointer select-none"
              aria-pressed={darkMode}
            >
              <span className="mr-2 text-sm font-black">{darkMode ? "DARK" : "LIGHT"}</span>

              <span
                className={`relative h-[28px] w-[60px] border-2 border-black shadow-[3px_3px_0px_black] ${
                  darkMode ? "bg-green-400" : "bg-red-400"
                }`}
              >
                <span
                  className={`absolute top-0 h-[24px] w-[24px] border-2 border-black bg-white transition-all duration-150 ${
                    darkMode ? "left-[32px]" : "left-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-background text-foreground">
        <Outlet />
        {showHero ? <Hero /> : null}
      </div>

      <div
        className={`transform transition-all duration-500 ${
          showFooter ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"
        }`}
      >
        <Footer />
      </div>
    </>
  );
}

export default Layout;

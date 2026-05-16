import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const emojis = ["😎", "🤪", "👾", "🚀", "💥", "😈", "🌀", "🎯"];
  const [emoji, setEmoji] = useState("😎");
  const [visible, setVisible] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);

  const changeEmoji = () => {
    const random = emojis[Math.floor(Math.random() * emojis.length)];
    setEmoji(random);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`mx-auto mt-10 w-5/6 bg-black transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <div className="w-full border-4 border-black bg-yellow-300 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="px-6 py-5 sm:px-8 sm:py-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-black uppercase tracking-tighter sm:text-2xl">
                ✏️ HabitTracker
              </h3>
              <p className="mt-1 text-xs text-black/70">brutalist habits, real results</p>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold uppercase sm:text-sm">
              <Link to="/home" className="hover:underline underline-offset-4">
                Home
              </Link>
              <Link to="/habits" className="hover:underline underline-offset-4">
                Habits
              </Link>
              <Link to="/privacy" className="hover:underline underline-offset-4">
                Privacy
              </Link>
              <span className="text-black/60">Terms pending</span>
            </div>

            <div className="flex gap-2">
              <a
                href="https://github.com/pritamscodee/habit-tracker"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black transition hover:bg-black hover:text-white"
                aria-label="Open project GitHub repository"
              >
                <i className="fa-brands fa-github"></i>
              </a>

              <a
                href="https://x.com/pritam1010110"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black text-xs font-bold transition hover:bg-black hover:text-white"
                aria-label="Open author X profile"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>

              <button
                onClick={changeEmoji}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black text-lg transition duration-200 hover:-translate-y-1 hover:scale-125 hover:bg-black hover:text-white active:scale-90"
                aria-label="Change footer emoji"
              >
                {emoji}
              </button>
            </div>
          </div>

          <div className="mt-5 border-t-2 border-black/30 pt-3 text-center text-[10px] sm:text-xs">
            © 2026 HabitTracker. No smooth corners, no regrets.
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };

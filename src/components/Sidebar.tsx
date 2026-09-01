import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  items: { path: string; label: string }[];
  show: boolean;
  onClose: () => void;
  location: ReturnType<typeof useLocation>;
}

export const Sidebar = ({ items, show, onClose, location }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    if (show) {
      gsap.fromTo(
        sidebar,
        { y: -12, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.28, ease: "power3.out" }
      );
    } else {
      gsap.to(sidebar, {
        y: -12,
        opacity: 0,
        scale: 0.96,
        duration: 0.18,
        ease: "power3.in",
      });
    }
  }, [show]);

  return (
    <div
      ref={sidebarRef}
      className="w-60 glass rounded-2xl border border-white/40 shadow-2xl shadow-black/10 overflow-hidden"
      style={{ opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none" }}
    >
      <ul className="p-2 space-y-0.5">
        {items.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={onClose}
                className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#e8356d] text-white shadow-sm shadow-[#e8356d]/30"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-slate-100 p-2">
        <Link
          to="/booth"
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#e8356d] text-white font-semibold text-sm shadow-md shadow-[#e8356d]/35 hover:bg-[#d12460] transition-all duration-200 active:scale-[0.97]"
        >
          Start Session
        </Link>
      </div>
    </div>
  );
};

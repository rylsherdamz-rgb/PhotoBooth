import { useEffect, useState, useRef } from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import { FaXmark } from "react-icons/fa6"
import gsap from "gsap"
import { Link, useLocation } from "react-router-dom"
import { Sidebar } from "./Sidebar"

const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/booth", label: "Booth" },
  { path: "/photos", label: "Gallery" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
]

function Navigation() {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const [show, setShow] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setShow(false)
      }
    }
    if (show) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [show])

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.05 }
    )
  }, [])

  return (
    <div
      ref={navRef}
      id="nav"
      className={`sticky top-0 z-[200] w-full px-4 pt-3 transition-all duration-300 ${
        scrolled ? "pb-2" : "pb-3"
      }`}
    >
      <div className="max-w-[1400px] mx-auto">
        <nav
          className={`glass rounded-2xl border shadow-lg transition-all duration-300 ${
            scrolled
              ? "border-white/50 shadow-black/8 h-14"
              : "border-white/40 shadow-black/5 h-16"
          } flex items-center justify-between px-2 pr-2`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 pl-3 group"
            aria-label="SnapCharm home"
          >
            <div className="w-8 h-8 rounded-lg bg-[#e8356d] flex items-center justify-center shadow-md shadow-[#e8356d]/40 group-hover:scale-105 transition-transform duration-200">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="4.5" stroke="white" strokeWidth="1.6" />
                <circle cx="8" cy="8" r="1.8" fill="white" />
                <rect x="11.5" y="3" width="2" height="2" rx="0.5" fill="white" opacity="0.8" />
              </svg>
            </div>
            <span
              className="font-bold text-lg text-slate-900 tracking-tight group-hover:text-[#e8356d] transition-colors duration-200"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              SnapCharm
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-0.5 px-2">
            {NAV_ITEMS.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path))
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-[#e8356d]"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-xl bg-[#e8356d]/8" />
                    )}
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2 pr-1.5">
            <Link
              to="/booth"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e8356d] text-white font-semibold text-sm shadow-lg shadow-[#e8356d]/35 hover:bg-[#d12460] hover:shadow-[#e8356d]/45 hover:scale-[1.02] transition-all duration-200 active:scale-[0.98] btn-press"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="3" stroke="white" strokeWidth="1.5" />
                <circle cx="7" cy="7" r="1.2" fill="white" />
              </svg>
              Start Session
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={buttonRef}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors mr-1"
            onClick={() => setShow((p) => !p)}
            aria-label={show ? "Close menu" : "Open menu"}
            aria-expanded={show}
          >
            {show ? <FaXmark size={20} /> : <RxHamburgerMenu size={20} />}
          </button>

          {/* Mobile sidebar */}
          <div ref={sidebarRef} className="absolute top-full right-4 mt-2 lg:hidden z-50">
            <Sidebar
              items={NAV_ITEMS}
              show={show}
              onClose={() => setShow(false)}
              location={location}
            />
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navigation

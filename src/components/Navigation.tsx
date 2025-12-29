import { useEffect, useState, useRef } from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import gsap from "gsap"
import { Link } from "react-router-dom"
import { Sidebar } from "./Sidebar"

function Navigation() {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [show, setShow] = useState(false)

  const items = ["About", "Policy", "Contact", "Photos"]

  // Toggle sidebar
  const toggleSidebar = () => {
    setShow(prev => !prev)
  }

  // ✅ Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShow(false)
      }
    }

    if (show) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [show])

  // Nav animation
  useEffect(() => {
    gsap.fromTo(
      "#nav",
      { y: -10 },
      { y: 0, duration: 0.2, display: "flex" }
    )
  }, [])

  return (
    <div
      id="nav"
      className="flex w-[90%] relative z-50 h-20 bg-gray-500 mx-[5%] mt-2 rounded-3xl justify-between border border-pink-300 shadow-md shadow-purple-500"
    >
      <Link
        to="/"
        className="my-6 lg:mx-10 mx-5 text-pink-400 text-lg lg:text-xl"
        style={{ fontFamily: "pacifico" }}
      >
        SnapCharm
      </Link>

      {/* Hamburger */}
      <button
        ref={buttonRef}
        className="mx-5 my-6 lg:hidden focus:outline-none"
        onClick={toggleSidebar}
      >
        <RxHamburgerMenu
          size={25}
          className="text-pink-400 hover:text-blue-300"
        />
      </button>

      {/* Desktop nav */}
      <ul className="my-6 gap-10 text-purple-300 hidden lg:flex">
        {items.map((item, i) => (
          <Link
            to={`/${item}`}
            key={i}
            className="hover:text-pink-400 duration-500 ease-in-out cursor-pointer"
          >
            {item}
          </Link>
        ))}
      </ul>

      <a
        href=""
        className="my-5.5 hidden lg:flex hover:text-pink-400 cursor-pointer duration-500 ease-in-out mx-10 text-purple-300 border border-purple-300 px-5 py-1 rounded-2xl pb-3"
      >
        Download App
      </a>

      {/* Sidebar */}
      <div ref={sidebarRef} className="absolute top-0 right-0">
        <Sidebar item={items} show={show} />
      </div>
    </div>
  )
}

export default Navigation

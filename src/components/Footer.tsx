import { Link } from "react-router-dom";
import socials from "../constants/social"
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaCamera,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative">
      {/* Soft fade instead of divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-16" />

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* BRAND */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <FaCamera className="text-pink-500" />
              SnapCharm
            </div>
            <p className="text-slate-600 text-sm max-w-sm">
              SnapCharm is a browser-based online photobooth designed
              to capture cute, aesthetic moments — instantly and effortlessly.
            </p>
          </div>

          {/* LINKS */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900">
                Product
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/booth" className="hover:text-pink-500">Photo Booth</Link></li>
                <li><Link to="/about" className="hover:text-pink-500">About</Link></li>
                <li><Link to="/contact" className="hover:text-pink-500">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/privacy" className="hover:text-pink-500">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-pink-500">Terms of Use</Link></li>
              </ul>
            </div>
          </div>

          {/* SOCIAL */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">
              Follow Us
            </h4>
            <div className="flex gap-4 text-xl text-slate-500">
              <a href={`${socials[0].url.toString()}`} className="hover:text-pink-500 transition">
                <FaInstagram />
              </a>
              <a href={`${socials[3].url.toString()}`} className="hover:text-pink-500 transition">
                <FaFacebook />
              </a>
              <a  href={`${socials[2].url.toString()}`}  className="hover:text-pink-500 transition">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} SnapCharm. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

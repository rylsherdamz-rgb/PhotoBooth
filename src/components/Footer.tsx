import { Link } from "react-router-dom";
import { socials } from "../constants/social";
import { FaGithub, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const SOCIAL_ICONS = [
  { icon: FaGithub,   index: 0, label: "GitHub"   },
  { icon: FaFacebook, index: 3, label: "Facebook"  },
  { icon: FaTwitter,  index: 2, label: "Twitter"   },
  { icon: FaLinkedin, index: 1, label: "LinkedIn"  },
];

export default function Footer() {
  return (
    <footer className="bg-[#f8f8f9] border-t border-[#e2e2e8]">
      <div className="max-w-[1400px] mx-auto px-6 py-14">

        {/* Top row */}
        <div className="grid md:grid-cols-[1fr_auto_auto] gap-10 items-start">

          {/* Brand */}
          <div className="space-y-4 max-w-xs">
            <Link to="/" className="inline-flex items-center gap-2.5 group" aria-label="SnapCharm home">
              <img
                src="/logo.svg"
                alt=""
                aria-hidden="true"
                width="28"
                height="28"
                className="w-7 h-7 rounded-lg group-hover:scale-105 transition-transform duration-200"
              />
              <span
                className="font-bold text-lg text-[#141418] group-hover:text-[#e8356d] transition-colors duration-200"
                style={{ fontFamily: "Pacifico, cursive" }}
              >
                SnapCharm
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Browser-based photobooth for capturing cute, aesthetic moments — instantly.
            </p>
          </div>

          {/* Product links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: "/booth",   label: "Photo Booth" },
                { to: "/photos",  label: "Gallery"     },
                { to: "/about",   label: "About"       },
                { to: "/contact", label: "Contact"     },
                { to: "/policy",  label: "Privacy"     },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-slate-500 hover:text-[#e8356d] transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social icons */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Follow</h4>
            <div className="flex flex-col gap-2.5">
              {SOCIAL_ICONS.map(({ icon: Icon, index, label }) => (
                <a
                  key={label}
                  href={socials[index]?.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center gap-2.5 text-slate-500 hover:text-[#e8356d] transition-colors duration-150 text-sm"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#e2e2e8] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} SnapCharm. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            Made with care in the Philippines
          </p>
        </div>
      </div>
    </footer>
  );
}
